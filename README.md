# 💰 Pro Expense Tracker (Progressive Web App)

A modern **Expense Tracker Progressive Web App (PWA)** built using **Vanilla HTML, CSS, and JavaScript**.  
The application is fully installable, works offline, and focuses on clean architecture and real-world frontend practices.

**Author:** **Kunal Kumar**

---

## 🚀 Features

- ➕ Add, edit, and delete expenses
- 💾 Persistent data storage using `localStorage`
- 📊 Category-wise expense visualization using Chart.js
- 📅 Filter expenses by category and month
- 💸 Monthly budget tracking with progress indicators
- ⚠️ Budget alerts (Safe / Warning / Over Budget)
- 🌓 Dark & Light theme toggle
- 🔔 Toast notifications for actions
- 📂 Import & Export data in JSON format
- 📱 **Progressive Web App (PWA)**
  - Installable on desktop & mobile
  - Offline support using Service Workers
  - App icon & standalone experience

---

## 🛠 Tech Stack

- **HTML5** – Semantic markup
- **CSS3** – Responsive design, CSS variables, dark mode
- **JavaScript (Vanilla)**
  - State-driven architecture
  - DOM manipulation & event handling
  - LocalStorage persistence
- **Chart.js** – Data visualization
- **Progressive Web App (PWA)**
  - Web App Manifest
  - Service Worker for offline caching

---

## 🧠 Architecture Overview

The project follows a clean **separation of concerns**:

- **State (`state.js`)**
  - Manages expenses and budget
  - Handles persistence via localStorage
  - Provides filtering & aggregation logic

- **UI (`ui.js`)**
  - Renders expense list, dashboard & charts
  - Manages theme, toasts, and form states

- **App (`app.js`)**
  - Acts as the controller
  - Connects UI actions with state updates
  - Coordinates rendering and data flow

This structure keeps the codebase readable, scalable, and interview-friendly.

---

## 📁 Project Structure

```
expense-tracker/
│
├── index.html
├── manifest.json
├── service-worker.js
├── css/
│   └── style.css
├── js/
│   ├── state.js
│   ├── ui.js
│   └── app.js
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## ▶️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Kunal-Kumar-Rajak/expense-tracker.git
   ```
2. Open the project using **Live Server**
3. Install the app from the browser address bar or menu

> No backend or database setup required.

---

## 📌 Why This Project Matters

- Demonstrates strong **JavaScript fundamentals**
- Shows understanding of **state-driven UI**
- Implements a real-world **PWA with offline support**
- Clean modular architecture (no framework dependency)
- Resume-ready & interview-friendly project

---

## 🚫 Limitations

- No authentication
- No cloud sync (client-side only)
- Not intended for production financial usage

---

## 👤 About the Developer

**Kunal Kumar**  
Computer Science & Engineering Student  
Frontend & Web Development Enthusiast

- 🔗 GitHub: https://github.com/Kunal-Kumar-Rajak  
- 🔗 LinkedIn: https://linkedin.com/in/kunal-kumar-rajak  
- 🌐 Portfolio: https://kunal-kumar-rajak-portfolio.netlify.app/

---

## 📜 License

Open-source for learning and personal use.
Feel free to fork, modify, and improve.
