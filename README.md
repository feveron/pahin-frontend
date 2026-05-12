# Pahin Frontend

Frontend частина платформи **Pahin** — веб-застосунок для волонтерської ініціативи з організації та відстеження посадки дерев в Україні.

Користувач може зареєструватися, переглянути каталог дерев, обрати дерево для посадки, перейти до форми посадки, переглядати карту з деревами та працювати з особистим профілем.

## Live Demo

https://pahin.vercel.app/

## Repository

https://github.com/feveron/pahin-frontend

## Tech Stack

- **React** — побудова UI
- **TypeScript** — типізація даних, props, API-відповідей
- **Vite** — швидке середовище розробки та build
- **React Router** — клієнтський роутинг SPA
- **Tailwind CSS** — стилізація, адаптивність, темна/світла тема
- **Axios** — HTTP-запити до backend API
- **ESLint + Prettier** — контроль якості та форматування коду
- **Vitest / React Testing Library** — unit-тестування frontend-логіки
- **Vercel** — деплой frontend-частини

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

## Main Features

- Реєстрація користувача
- Авторизація користувача через JWT
- Збереження токена та передача його в захищені API-запити
- Публічна головна сторінка
- Публічна карта посаджених дерев
- Каталог дерев
- Фільтрація та пагінація дерев
- Сторінка профілю користувача
- Захищені маршрути для авторизованих користувачів
- Повторно використовувані UI-компоненти: Button, Input, Card, Icon
- Підтримка світлої та темної теми
- Адаптивна верстка
- Інтеграція з backend REST API

## Project Structure

```txt
src/
├── assets/          # Images, icons, static assets
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Application pages
├── services/        # API client and domain services
├── styles/          # Global styles
├── types/           # TypeScript types
├── utils/           # Utility functions
├── App.tsx          # Application routes
└── main.tsx         # Entry point
```

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
