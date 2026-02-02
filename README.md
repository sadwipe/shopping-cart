# Shopping Cart 🛒

A simple shopping cart application built with **React** as part of **The Odin Project** curriculum.  
The goal of this project was to practice component-based architecture, client-side routing, state management, testing, and deployment of a single-page application (SPA).

🔗 **Live Demo:**  
https://minecraft-shopping-cart.netlify.app/

---

## 📚 About the Project

This project is an **exercise from The Odin Project** designed to reinforce key React concepts, including:

- Component and folder structure planning
- React Router for navigation
- Shared state across multiple pages
- Controlled inputs
- Testing with React Testing Library
- Deploying SPAs correctly

---

## ✨ Features

- **Three Pages**
  - **Home** – Simple landing page with images and information
  - **Shop** – Displays products fetched from an external API
  - **Cart** – Shows selected items and allows quantity updates

- **Navigation Bar**
  - Visible on all pages
  - Cart link updates in real time to reflect total items in the cart

- **Shop Page**
  - Products fetched from the **FakeStore API**
  - Each product has:
    - Title
    - Quantity input field
    - Increment / decrement buttons
    - “Add to Cart” button

- **Cart Page**
  - Displays selected items and quantities
  - Allows:
    - Increasing/decreasing quantity
    - Removing items entirely
  - No checkout or payment system (by design)

- **Testing**
  - Thoroughly tested using **React Testing Library**
  - External libraries like `react-router-dom` are not tested directly

- **Styling**
  - Styled to be clean and presentable for showcasing
