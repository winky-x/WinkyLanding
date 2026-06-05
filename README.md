# 🌌 WinkyTalk

> **An AI Companion with Vision, Voice, and Physical Agency.**

WinkyTalk is an ultra-premium, dark-themed scrolltelling experience that bridges the gap between software intelligence and physical or browser environments. Speak naturally, show it your workspace, and watch it automate.

---

## ✨ Features

*   **🎙️ Natural Voice Agency**
    Equipped with an advanced STT & TTS pipeline, WinkyTalk listens to your natural voice commands, processes the semantic context, and replies instantly.
*   **👁️ Vision & Spatial Awareness**
    Through direct web camera streams, WinkyTalk sees, object-classifies, and interprets the visual context of its immediate workspace.
*   **⚙️ Hardware & Tool Actioning**
    Beyond browser limits, WinkyTalk interacts with locally connected development nodes, executing script-defined operations with browser-based automation.
*   **🛠️ Open Source Automation Node**
    A fully inspectable architecture. Check out our open-source browser interface node built for transparent execution and extensibility.

---

## 🎨 Design System & Aesthetics

WinkyTalk is designed with a premium, Awwwards-level "Dark Luxury" aesthetic:
*   **Video Backdrop**: A high-definition, looping background video constrained strictly inside the Hero section with a dark overlay to maintain crystal-clear text readability.
*   **Solid Black Scrolling**: Natural dark scrolling transitions where sections scroll over a static solid black (`#000000`) background.
*   **Ambient Spotlights**: Soft, low-intensity indigo spotlights (`bg-indigo-500/5 filter blur-[120px]`) locally embedded inside each section to prevent flat backgrounds.
*   **Liquid Glass Details**: Glassmorphic, frosted glass panels featuring railroad-style corner borders that reflect refractions.
*   **Border Glow Effects**: Responsive card borders equipped with reactive `<BorderGlow />` hover tracking:
    *   *Natural Voice Agency*: Blue/Cyan hover glow
    *   *Vision & Spatial Awareness*: Pink/Purple hover glow
    *   *Hardware & Tool Actioning*: Emerald/Green hover glow

---

## 💻 Tech Stack

*   **Frontend Library**: [React 19](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Build Tool**: [Vite](https://vite.dev/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Notifications**: [Sonner](https://github.com/emilkowalski/sonner)

---

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/winky-x/WinkyLanding.git
    cd WinkyLanding
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure your local environment:
    *   Duplicate the `.env.example` file (if available) or create a `.env.local`
    *   Set the `GEMINI_API_KEY` to your Gemini API Key:
        ```env
        GEMINI_API_KEY=your_api_key_here
        ```

### Development Commands

*   **Start Local Dev Server**:
    ```bash
    npm run dev
    ```
    Visits the application at `http://localhost:3000/`.

*   **Production Build**:
    ```bash
    npm run build
    ```

*   **Code Linting & Types Check**:
    ```bash
    npm run lint
    ```

---

## 📂 Project Structure

```text
├── public/                    # Static assets & logo resources
├── src/
│   ├── components/
│   │   └── ui/                # Liquid-glass elements, Chat Input, and BorderGlow
│   ├── lib/
│   │   └── utils.ts           # Classnames merging utilities
│   ├── App.tsx                # Main Landing Page Layout & Section Components
│   ├── index.css              # Custom global styles & liquid glass overlays
│   └── main.tsx               # Application entry point
├── package.json
└── vite.config.ts
```

---

## 📄 License

This project is licensed under the Apache-2.0 License. See the header in `App.tsx` for copyright details.
