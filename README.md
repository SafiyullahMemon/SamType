<div align="center">

# ⌨️ SamType

**A sleek, customizable typing test inspired by MonkeyType.**

Built with **React** · **Vite** · **Tailwind CSS v4** · **Recharts**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://samtype-ten.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/SafiyullahMemon/SamType)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Multiple Test Modes
- **Time** — Race against the clock (15s, 30s, 60s, 120s)
- **Words** — Type a fixed set of words (10, 25, 50, 100)
- **Quote** — Type famous literary passages (short → thicc)
- **Zen** — No pressure, just type freely
- **Custom** — Set your own time limit (1–300s)

</td>
<td width="50%">

### 🔤 Text Modifiers
- **Punctuation** — Adds periods, commas, quotes, contractions & auto-capitalization
- **Numbers** — Sprinkles random 1–4 digit numbers into the word pool

</td>
</tr>
<tr>
<td width="50%">

### 📊 Deep Performance Analytics
- Real-time **WPM** & **Raw WPM** chart (powered by Recharts)
- **Accuracy** percentage with character breakdown
- **Consistency** score calculated from typing speed variance
- Character stats: `correct / incorrect / extra / missed`
- Per-second error markers on the chart

</td>
<td width="50%">

### 🎨 8 Beautiful Themes
| Theme | Vibe |
|-------|------|
| 🌑 Dark | Clean slate blues |
| ☀️ Light | Crisp & minimal |
| 💜 Cyberpunk | Neon yellow & cyan |
| 🍵 Matcha | Earthy greens |
| 🧛 Dracula | Deep purple & pink |
| ❄️ Nord | Arctic cool |
| 🌆 Synthwave | Retro sunset |
| 💻 Terminal | Hacker green |

</td>
</tr>
</table>

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SafiyullahMemon/SamType.git
cd SamType

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open **[samtype-ten.vercel.app](https://samtype-ten.vercel.app/)** in your browser and start typing!

---

## 🎮 How to Use

| Action | How |
|--------|-----|
| **Start a test** | Click the text area and start typing |
| **Switch modes** | Click `time`, `words`, `quote`, `zen`, or `custom` in the control bar |
| **Toggle punctuation** | Click `@ punctuation` (glows when active) |
| **Toggle numbers** | Click `# numbers` (glows when active) |
| **Restart test** | Press `Tab` → `Enter`, or press `Esc`, or click the ↻ button |
| **Finish zen mode** | Click the `■ finish` button or press `Esc` |
| **Change theme** | Use the 🎨 palette dropdown in the bottom-right footer |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` + `Enter` | Restart the current test |
| `Esc` | Restart test (or finish in Zen mode) |
| `Backspace` | Delete last character / go back to previous word |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React](https://reactjs.org/) | Component-driven UI |
| [Vite](https://vitejs.dev/) | Lightning-fast dev server & builds |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling with CSS variables |
| [Recharts](https://recharts.org/) | Interactive performance charts |
| [Lucide React](https://lucide.dev/) | Beautiful, consistent icon set |

---

## 📁 Project Structure

```
SamType/
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Top navigation bar
│   │   ├── Controls.jsx      # Mode selector & toggles
│   │   ├── TypingArea.jsx    # Core typing engine
│   │   ├── Results.jsx       # Post-test analytics & chart
│   │   └── Footer.jsx        # Theme switcher & shortcuts
│   ├── data/
│   │   └── quotes.js         # Curated quote collection
│   ├── App.jsx               # Main state & word generation
│   └── index.css             # Theme definitions & animations
├── package.json
└── vite.config.js
```

---

<div align="center">

### Made with ❤️ by [Safiyullah Memon](https://github.com/SafiyullahMemon)

⭐ Star this repo if you enjoyed it!

</div>
