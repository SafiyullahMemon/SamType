# SamType

A minimalist, highly customizable, and beautiful typing test application inspired by MonkeyType. Built from the ground up using **React**, **Vite**, and **Tailwind CSS v4**.

## ✨ Features

- **Fluid Typing Experience**: Seamless input handling, live caret tracking, and intelligent multi-line scrolling to keep your focus on the text.
- **Deep Statistics & Charting**: At the end of every test, view a detailed breakdown of your performance, including:
  - Net WPM, Raw WPM, and Accuracy.
  - Comprehensive character tracking (Correct, Incorrect, Extra, Missed).
  - A real-time, interactive performance chart powered by `recharts` mapping your WPM and errors over time.
- **Theming Engine**: Choose from 8 beautifully curated color palettes right out of the box:
  - Dark, Light, Cyberpunk, Matcha, Dracula, Nord, Synthwave, and Terminal.
- **Modern Tech Stack**: Blazing fast builds with Vite, component-driven UI with React, and powerful utility styling with the latest Tailwind CSS v4.
- **Keyboard-First**: Quickly restart a test without reaching for your mouse by pressing `Tab` + `Enter`.

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps to run SamType locally.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SafiyullahMemon/SamType.git
   cd SamType
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 🎮 How to Play

- **Start Typing**: Simply focus on the text and press any letter key to automatically start the timer.
- **Error Correction**: Use `Backspace` or `Ctrl + Backspace` to delete mistakes. Extra typed letters will be highlighted in red.
- **Restart**: Hit the circular restart button under the typing area, or press `Tab` followed by `Enter` for a lightning-fast restart.
- **Change Theme**: Click the Palette icon in the bottom right corner of the footer to switch between the available color themes.

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Frontend Tooling
- [Tailwind CSS (v4)](https://tailwindcss.com/) - Utility-first CSS framework
- [Recharts](https://recharts.org/) - Charting library for React
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
