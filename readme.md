
# Gallery App

## Overview
The **Gallery App** is a React-based application built with TypeScript. It allows users to view a collection of curated images fetched from the Pexels API. Users can add images to their favorites, and the app provides infinite scrolling functionality to load more images as the user scrolls down.

This project demonstrates skills in React, TypeScript, API integration, state management (via context), and implementing infinite scrolling.

## Features
- **Image Gallery**: Displays curated images fetched from the Pexels API.
- **Infinite Scrolling**: Automatically loads more images as the user scrolls to the bottom of the page.
- **Favorites Management**: Allows users to add or remove images from their favorites, with favorites stored in `localStorage` for persistence.
- **Responsive Design**: Images are displayed responsively, adapting to different screen sizes.

## Technologies Used
- React (with hooks and context)
- TypeScript for type safety
- Pexels API for fetching images
- React Context for state management
- Intersection Observer API for infinite scrolling
- Jest for testing

## Setup
### Prerequisites
- Node.js (version >= 14.x)
- npm (version >= 6.x)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gallery-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd gallery-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
To use the Pexels API, you need to add an API key to your `.env` file:
1. Create a `.env` file at the root of your project.
2. Add your Pexels API key:
   ```bash
   REACT_APP_PEXEL_API_KEY=pexels-api-key
   REACT_APP_PEXEL_BASE_URL=pexels-base-url
   ```

### Running the App
To run the application locally:
   ```bash
   npm start
   ```
This will start the app on `http://localhost:3000`.

### Testing
To run tests:
   ```bash
   npm test
   ```
This will run the test suite using Jest.

## Folder Structure
```
src/
  components/            # UI components (ImageGrid, ImageItem, etc.)
  context/               # Context providers (FavoritesContext, etc.)
  hooks/                 # Custom React hooks (useIntersectionObserver)
  services/              # API calls (fetchImages)
  types/                 # TypeScript types (Image, etc.)
  utils/                 # Utility functions (localStorageUtils)
  App.tsx                # Main app component
  index.tsx              # Entry point of the application
  setupTests.ts          # Test setup (Jest configuration)
```
