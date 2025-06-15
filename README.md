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
## ✨ Functionality

This project is a client-side Goal-Based Savings Planner built with React and Tailwind CSS. Below are the key features and custom functionalities I implemented:

### 🧩 1. Add & Manage Goals
- Users can create multiple financial goals with:
  - A name (e.g., "Trip to Japan")
  - Target amount
  - Currency (INR or USD)
- Each goal is displayed as a card showing:
  - Goal name
  - Original currency target
  - Converted amount in the other currency
  - Progress bar showing how much has been saved
  - A button to add contributions

### 📊 2. Dashboard Summary
- A top dashboard displays:
  - Total target (converted to USD)
  - Total saved amount
  - Overall progress (%) calculated as:  
    ```
    For each goal, progress is calculated as:

    progress = min((saved / target) × 100, 100)
    
    Then, overall progress is calculated as the average of all goal progress values:

    averageProgress = (sum of individual progress values) / number of goals

    If there are no goals, the overall progress is 0.
    
    ```
- This gives the user a clear overview of all their savings progress in one place.

### 💰 3. Add Contribution
- Users can click "Add Contribution" to input:
  - Amount to add
  - Date of contribution
- This updates the progress in real time.

### ✅ 4. Prevent Over-Contribution
- If the user tries to add more money than the goal's target:
  - The “Add Contribution” button gets disabled
  - This shows that the goal is fully achieved, and no extra money is needed

### 🔁 5. Real-Time Exchange Rate
- The app fetches live USD ↔ INR exchange rates from the ExchangeRate API
- Users can:
  - Manually update the rate using the “Refresh Rate” button
  - View the last updated time to check data freshness
- Both:
  - Dollar to INR
  - INR to Dollar conversions are supported and displayed clearly

### 🗑️ 6. Delete Goal Feature
- Users can delete any goal if no longer needed
- When deleted:
  - The goal and its data are removed from local storage
  - This ensures clean storage management (like clearing cookies)

### 🕓 7. View Contribution History
- Users can view the full history of contributions made to a goal
  - Each entry shows the date and amount
- This helps track saving habits over time

### 🧠 User Experience Enhancements
- Fully responsive layout — works on mobile and desktop
- Form validations to prevent:
  - Negative values
  - Empty fields
  - Invalid numbers
- Loading and error states handled gracefully
- Smooth, clean UI to make saving goals feel intuitive


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
