# Agmo Mini Store Frontend

A small e-commerce frontend built with React, Vite, and TypeScript, showcasing products with filtering, search, and cart functionality.

---

## Tech Choices & Architecture

This project uses **React with TypeScript** for robust type safety and maintainable UI components. The app is bootstrapped with **Vite**, providing fast development and hot module replacement. **React Router DOM** is used for client-side routing, **React Context** manages global state for the shopping cart. Stylng using **Tailwind** and deployed using **Vercel**.

The architecture is component-driven, with reusable UI elements such as `ProductCard` components. The store page fetches products asynchronously from a mock API layer and applies client-side filtering by search, category, and price. Testing is handled with **Vitest**.

---

## Setup & Run Commands

### Install dependencies

npm install

### Start development server

npm run dev

### Build for production

npm run build

### Preview production build

npm run preview

### Run tests

npm test

```

## Assumptions & trade-offs

Assumptions

- Filtering is client-side only.

Trade-offs

- No backend integration; products are fetched from a mock API.
- Performance optimizations (like virtualized lists) are skipped due to small dataset.

```

## Future Improvements

With more time, the project could include:

- Pagination or infinite scroll for large product lists.
- Server-side search & filtering for scalability.
- Styling improvement & accesibility enhancement.
- Code refactor especially Tailwind styling.
