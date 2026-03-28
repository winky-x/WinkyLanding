import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey =
      process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return new Response("API Key not found", { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey as string });

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.1-flash-lite-preview",
      contents: message,
      config: {
        systemInstruction:
          "You are Winky, a sentient, highly advanced spatial computing Web Agent. Respond concisely, mathematically, and with a slightly robotic but highly intelligent persona. Format responses as terminal output where appropriate. Do not use markdown formatting like ** or *, just plain text.",
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
