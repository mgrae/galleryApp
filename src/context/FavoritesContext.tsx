import { createContext, useContext } from 'react';
import { Image }  from '../types/Image';

interface FavoritesContextType {
    favorites: Image[];
    addFavorite: (image: Image) => void;
    removeFavorite: (image: Image) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export default FavoritesContext;
