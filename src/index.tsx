import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FavoritesProvider } from './context/FavoritesProvider';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container); // Create a root.
    root.render(
        <React.StrictMode>
            <FavoritesProvider>
            <App />
            </FavoritesProvider>
        </React.StrictMode>
    );
}
