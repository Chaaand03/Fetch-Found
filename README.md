# Fetch-Found 🐾

A React‑powered pet finder app that helps users discover, save, and match with adoptable dogs near them.


## 🎬 Video Walkthrough

<div>
    <a href="https://www.loom.com/share/bea60cbd414249ee898f16b852cc3e58">
    </a>
    <a href="https://www.loom.com/share/bea60cbd414249ee898f16b852cc3e58">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/bea60cbd414249ee898f16b852cc3e58-5571ba8315f88e73-full-play.gif">
    </a>
  </div>

## 🌐 Live Demo

Try it out in your browser:  [Fetch-Found-webapp](https://fetch-found.vercel.app)


## 🚀 Project Overview

Fetch is a single‑page application that makes it fun and easy for users to:

- **Search** through hundreds of adoptable dogs by breed, with pagination and sorting  
- **Filter** results with a multi‑select dropdown (A → Z or Z → A)  
- **Favorite** dogs to revisit later, with counts reflected across the app  
- **Match** a favorite with a simple “Make a Match” feature  
- **Manage** sessions via a lightweight login flow, complete with a “Log Out” button
  

## ✨ Key Features

- **Interactive Search & Pagination**  
  Fetches IDs via `searchDogs`, then loads details with `getDogsByIds`  
- **Breed Filter Dropdown**  
  Multi‑select checkboxes, Apply/Clear actions, and click‑outside to cancel  
- **Sorting**  
  Alphabetical toggle between ascending (“A → Z”) and descending (“Z → A”)  
- **Favorites Management**  
  ♥ Favorite/unfavorite any dog; count badge in navbar and footer prompt  
- **Make a Match**  
  Sends your favorites list to `matchDogs` and displays your perfect pup  
- **Protected Routes**  
  Login gate using React Router’s `<Navigate>` logic  
- **Responsive “Hamburger” Menu**  
  Mobile‑friendly nav, overlay backdrop, and close on link click  


## 🛠️ Tech Stack

- **Frontend:** React, React Router v6, CSS Modules  
- **State:** React Hooks (`useState`, `useEffect`, `useRef`)  
- **Storage:** `localStorage` + custom window events  
- **API Layer:** `searchDogs`, `getDogsByIds`, `getBreeds`, `matchDogs`, `login`, `logout`  
- **Build Tools:** Vite 
- **Assets:** SVG/PNG images


## 📦 Installation & Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Chaaand03/Fetch-Found.git
   cd Fetch-Found

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn start

The app will open at `http://localhost:3000`.


## 🔍 How It Works

### Login
- User enters name & email → stores a simple token in `localStorage`
- Redirects to `/search`

### Search
- Calls `getBreeds()` on mount to populate the filter
- On each search, sends `{ size, sort, breeds, from }` to `searchDogs()`
- Receives `resultIds`, `next`, `prev` → fetches full dog objects

### Filter & Sort
- Toggling checkboxes updates a temp array
- “Apply” commits to the real filter, resets pagination
- Sort button toggles between ascending/descending

### Favorites
- Clicking “♡ Favorite” adds/removes the dog’s ID in `localStorage`
- A custom `favoritesChanged` event updates any listener (navbar badge, footer)

### Make a Match
- Gathers all favorite IDs → sends to `matchDogs()`
- Displays your matched pup with a celebratory UI


## 📈 Roadmap & Future Improvements
- User Profiles & Persisted Sessions  
- Location‑based search & map integration  
- Shareable favorites list / social features
  

## 📝 License & Attribution
This project is open‑source under the [MIT License](LICENSE).  
Built with ❤️ by **Chandana Mallu**.

## 📬 Get in Touch
- **Email:** [chandanamallu03@gmail.com](mailto:chandanamallu03@gmail.com)  
- **LinkedIn:** [www.linkedin.com/in/chandana-mallu](www.linkedin.com/in/chandana-mallu)  
- **GitHub:** [github.com/yourusername](https://github.com/Chaaand03)
- **Portfolio:** [https://portfolio-seven-liart-91.vercel.app/](https://portfolio-seven-liart-91.vercel.app/)


Thanks for checking out Fetch-Found ❤️!
