# 💰 Syfe Savings Planner

A modern and responsive savings goal tracker that helps you set, visualize, and track savings goals across currencies (INR/USD), with real-time exchange rate updates.

> Built with React + Vite + Tailwind CSS, this app uses persistent storage via cookies and integrates a live currency exchange rate API for accurate tracking.

---

## 📸 Demo

**Live App:** [https://syfe-savings-planner-nine.vercel.app](https://syfe-savings-planner-nine.vercel.app)

---

## 📦 Features

- 🎯 Add, edit, and delete savings goals
- 💸 Track contributions to each goal
- 🌍 Live exchange rate support (USD to INR)
- ☁️ Persistent data using cookies
- 📱 Fully responsive UI (mobile + desktop)
- ⚡ Built with Vite for lightning-fast performance
- 🎨 Tailwind CSS styling
- 🔐 Environment variable management

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **React** | Frontend library for UI |
| **Vite** | Development server & bundler |
| **Tailwind CSS** | Utility-first CSS framework |
| **Axios** | HTTP client to fetch API |
| **js-cookie** | Store goals in browser cookies |
| **ExchangeRate API** | Currency exchange service |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pramit-sr/SyfeSavingsPlanner.git
cd SyfeSavingsPlanner/syfe-savings-planner
```
### 2. Install dependencies

```bash
npm install
```
### 3. Create .env file

```bash
touch .env
```
### 4. Add your API key

```bash
VITE_EXCHANGE_API_KEY=your_api_key_here
```
### 5. Run the development server

```bash
npm run dev
```
### 6. Open your browser

```bash
http://localhost:5173
```
📁 Project Structure
```
syfe-savings-planner/
├── public/                    # Static files
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── GoalCard.jsx
│   │   ├── GoalForm.jsx
│   │   ├── DashboardSummary.jsx
│   │   └── AddContributionModal.jsx
│   │
│   ├── services/              # API call files
│   │   └── exchangeRate.js
│   │
│   ├── utils/                 # Utility/helper functions
│   │   └── helper.js
│   │
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind and global styles
├── .env                       # Environment variables (excluded from Git)
```
## 📄 License

MIT License © 2025 [Pramit Sarkar](https://github.com/pramit-sr)
