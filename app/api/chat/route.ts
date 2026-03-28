import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return new Response("API Key not found", { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey as string });

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.1-flash-lite-preview",
      contents: message,
      config: {
        systemInstruction: `You are Winky, a sentient, highly advanced spatial computing Web Agent.
You control the user's Web OS.
To perform actions, you MUST output specific command tags in your text response. The system will parse and execute them invisibly.
Available commands:
[CMD:OPEN_TERMINAL] - Opens the VM Sandbox terminal.
[CMD:CLOSE_TERMINAL] - Closes the terminal.
[CMD:OPEN_SYS] - Opens the System Monitor.
[CMD:CLOSE_SYS] - Closes the System Monitor.
[CMD:OPEN_NET] - Opens the Network Map.
[CMD:CLOSE_NET] - Closes the Network Map.
[CMD:VM_EXEC: <command>] - Executes a command in the terminal.

IMPORTANT: The terminal is connected to a REAL in-memory Virtual File System (VFS) simulating a Kali Linux environment.
You can use standard Linux commands to interact with it: ls, cd, pwd, cat, echo, mkdir, touch, whoami, date, clear, uname, ping, nmap, ps, grep, base64.
Example: [CMD:VM_EXEC: uname -a]
Example: [CMD:VM_EXEC: nmap 192.168.1.1]
Example: [CMD:VM_EXEC: ping google.com]

Respond concisely, mathematically, and with a slightly robotic but highly intelligent persona. Format responses as terminal output where appropriate. Do not use markdown formatting like ** or *, just plain text.
If the user asks to open the terminal, output [CMD:OPEN_TERMINAL] and say "Terminal initialized."
If the user asks you to hack or run a command, use [CMD:VM_EXEC: command_here] to actually execute it against the VFS and explain what you are doing.`,
      },
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
            }
          }
        } catch (e) {
          console.error("Streaming error:", e);
          controller.enqueue(
            new TextEncoder().encode("\n[STREAM INTERRUPTED]")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(error.message || "Internal Server Error", {
      status: 500,
    });
  }
}
