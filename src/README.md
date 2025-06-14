# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



#  Job Portal

A job board aggregator built with **React**, **Tailwind CSS**, and **DaisyUI** that scrapes and combines visa-sponsorship and remote-friendly job postings from multiple public APIs. The app allows filtering by job title, company, remote availability, and visa sponsorship.

---

##  Features

- 🔍 Search jobs by title or company
- 🛂 Filter for visa-sponsored roles
- 🌐 Filter for remote-only positions
- 📑 Paginated listings
- 🎨 TailwindCSS & DaisyUI for fast styling

---

##  Tech Stack

- **Frontend**: React, TailwindCSS, DaisyUI
- **Icons**: Lucide React
- **API Sources**:
  - RemoteOK
  - Jobicy
  - USAJobs
  - Jooble

---

##  Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/someshsb1/jobs-portal.git
cd jobs-portal
```
### 2. Install dependencies

```npm install```

### 3. Run the development server

```npm run dev```

Visit http://localhost:5173 in your browser.

## Backend Proxy Setup

```cd visa-jobs-api```

```npm install```

```node server.js```

API runs at http://localhost:3001/api/remoteok

#  API Credentials
USAJobs: Add your Authorization-Key and User-Agent in Home.jsx

Jooble: Update your API key in the fetch request in Home.jsx
