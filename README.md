# pahin-frontend

Frontend частина платформи Pahin — застосунок для взаємодії користувачів із системою висадки дерев, перегляду даних та роботи з API.

# Live Demo

https://pahin-frontend.vercel.app/

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios — робота з API
- ESLint + Prettier — контроль якості коду

## Prerequisites

- Node.js v18+
- npm / yarn

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/feveron/pahin-frontend
cd pahin-frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Create environment file**

```bash
cp .env.example .env
```

**4. Start development server**

```bash
npm run dev
```

App will be available at: `http://localhost:5173`

## Environment Variables

| Variable       | Description          |
| -------------- | -------------------- |
| `VITE_API_URL` | Backend API base URL |

## Project Structure

src/
├── components/ # UI components
├── pages/ # Application pages
├── services/ # API requests
├── hooks/ # Custom hooks
├── types/ # TypeScript types
├── styles/ # Global styles
├── App.tsx # Root component
└── main.tsx # Entry point

## Features (planned)

- User authentication (login/register)
- Users list
- Integration with backend API
- Form handling and validation

## Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start dev server          |
| `npm run build`   | Build project             |
| `npm run preview` | Preview build             |
| `npm run lint`    | Run ESLint                |
| `npm run format`  | Format code with Prettier |

## CI/CD

- CI: GitHub Actions (lint + build)
- CD: Vercel (automatic deploy on push to main)
