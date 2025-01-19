import { Image } from '../types/Image';

export const getFavoritesFromLocalStorage = (): Image[] => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const setFavoritesToLocalStorage = (favorites: Image[]) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
