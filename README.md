# pahin-frontend

Frontend частина платформи Pahin — застосунок для взаємодії користувачів із системою висадки дерев, перегляду даних та роботи з API.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios — робота з API
- ESLint + Prettier — контроль якості коду

---

## Prerequisites

- Node.js v18+
- npm / yarn

---

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/your-username/pahin-frontend.git
cd pahin-frontend
Install dependencies
npm install
Create environment file
cp .env.example .env
Start development server
npm run dev

The app will be running at:

http://localhost:5173
Environment Variables
Variable	Description
VITE_API_URL	Backend API base URL
Project Structure
src/
├── components/    # UI components
├── pages/         # Application pages
├── services/      # API requests
├── hooks/         # Custom hooks
├── types/         # TypeScript types
├── styles/        # Global styles
├── App.tsx        # Root component
└── main.tsx       # Entry point
Features (planned)
User authentication (login/register)
Users list
Integration with backend API
Form handling and validation
Scripts
npm run dev — start dev server
npm run build — build project
npm run preview — preview build
```
