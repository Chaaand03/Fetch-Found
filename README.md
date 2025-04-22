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

- **Login & Logout**  
  Users sign in with their name & email → a simple token is stored in `localStorage`; logging out clears the token & saved favorites and redirects back to the login screen

  <img width="1706" alt="image" src="https://github.com/user-attachments/assets/d3ffa720-3b95-4d4c-8d1b-6bfb4137156f" />

 
- **Interactive Search & Pagination**  
  Fetches IDs via `searchDogs`, then loads details with `getDogsByIds`

  <img width="1707" alt="image" src="https://github.com/user-attachments/assets/45274b30-910b-4998-84be-88e4d3f76946" />

  <img width="1709" alt="image" src="https://github.com/user-attachments/assets/e176f4b8-273e-4c5d-8f4e-d939737308b6" />


- **Breed Filter Dropdown**  
  Multi‑select checkboxes, Apply/Clear actions, and click‑outside to cancel
   
- **Sorting**  
  Alphabetical toggle between ascending (“A → Z”) and descending (“Z → A”)

  <img width="1709" alt="image" src="https://github.com/user-attachments/assets/a490d5e4-ff8c-46ca-8e02-42152ea4abc6" />


- **Favorites Management**  
  ♥ Favorite/unfavorite any dog; count badge in navbar and floating footer prompt

  <img width="1709" alt="image" src="https://github.com/user-attachments/assets/67dc0036-65eb-46b6-be4d-82deab9c5323" />


- **View All Favorites Page**  
  Dedicated page that displays all favorited dogs in a grid, with options to remove or proceed to match

   <img width="1707" alt="image" src="https://github.com/user-attachments/assets/bf1992e8-e6a4-4706-b1a5-2985d0828fa2" />


- **Make a Match**  
  Sends your favorites list to `matchDogs` and displays your perfect pup

  <img width="1709" alt="image" src="https://github.com/user-attachments/assets/5afab9f8-f343-4e77-9eb2-6f1f5535b028" />


- **Protected Routes**  
  Login gate using React Router’s `<Navigate>` logic
  
- **Responsive Design**  
  Ensured the entire app is fully responsive across mobile, tablet, and desktop layouts  


  <img width="401" alt="image" src="https://github.com/user-attachments/assets/c38dd8bc-6db8-4305-8663-89d76bcee867" />

  <img width="398" alt="image" src="https://github.com/user-attachments/assets/05cbf41d-db15-4040-afe1-f76042bc2228" />

  <img width="397" alt="image" src="https://github.com/user-attachments/assets/1d256730-658e-4add-b031-58d4b37240b0" />

  <img width="402" alt="image" src="https://github.com/user-attachments/assets/7201e686-2b92-472d-9ab2-189de07a8dd0" />

  <img width="402" alt="image" src="https://github.com/user-attachments/assets/286a7712-2354-45a3-bfc5-aa7f17d53158" />

  <img width="401" alt="image" src="https://github.com/user-attachments/assets/796ff455-fcc2-4807-9119-2894dd34e44d" />



## 🛠️ Tech Stack

- **Frontend:** React, React Router v6, CSS Modules  
- **State:** React Hooks (`useState`, `useEffect`, `useRef`)  
- **Storage:** `localStorage` + custom window events  
- **API Layer:** `searchDogs`, `getDogsByIds`, `getBreeds`, `matchDogs`, `login`, `logout`  
- **Build Tools:** Vite
- **Hosting & Deployment:** Vercel 
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
