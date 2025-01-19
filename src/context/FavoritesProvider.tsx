import React, { useReducer, useEffect, ReactNode, useState } from 'react';
import {Image} from '../types/Image';
import FavoritesContext from './FavoritesContext';
import { FavoritesReducer }  from './FavoritesReducer';
import { getFavoritesFromLocalStorage, setFavoritesToLocalStorage } from '../utils/localStorageUtils';

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, dispatch] = useReducer(FavoritesReducer, []);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedFavorites = getFavoritesFromLocalStorage();
        dispatch({ type: 'SET_FAVORITES', images: storedFavorites });
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            setFavoritesToLocalStorage(favorites);
        }
    }, [favorites, isInitialized]);

    const addFavorite = (image: Image) => dispatch({ type: 'ADD_FAVORITE', image });
    const removeFavorite = (image: Image) => dispatch({ type: 'REMOVE_FAVORITE', image });

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
