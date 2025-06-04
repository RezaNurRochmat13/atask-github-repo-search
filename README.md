# 🔍 GitHub User Explorer

A simple React app to search GitHub users and view their profile details & public repositories. Built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

![screenshot](https://github.com/RezaNurRochmat13/atask-github-repo-search/assets/your-screenshot.png)

## 🚀 Features

- 🔎 Search GitHub users by username
- 📄 View user details: avatar, name, bio, followers, etc.
- 📁 Display list of public repositories
- 🌐 GitHub profile links
- ✅ Input validation using `react-hook-form`
- 🎨 Styled with Tailwind CSS
- 💡 Custom hook for data fetching (`useFetchGitHub`)
- ⚡ Fast build with Vite

## 🧰 Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React Hook Form](https://react-hook-form.com/)

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/RezaNurRochmat13/atask-github-repo-search.git

# Go to the project directory
cd atask-github-repo-search

# Install dependencies
pnpm install
```

🧪 Run the App Locally
```
# Start development server
pnpm dev
Then open http://localhost:5173 in your browser.
```

📂 Project Structure
```
├── src
│   ├── components      # Reusable UI components
│   ├── hooks           # Custom hooks (e.g. useFetchGitHub)
│   ├── types           # TypeScript type definitions
│   ├── App.tsx         # Main application
│   └── main.tsx        # Entry point
├── public              # Static assets
├── index.html
├── tailwind.config.cjs
├── postcss.config.cjs
└── README.md
```

```

📝 License
This project is licensed under the MIT License.