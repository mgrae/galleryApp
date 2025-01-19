import {Image} from '../types/Image';

export type Action =
    | { type: 'ADD_FAVORITE'; image: Image }
    | { type: 'REMOVE_FAVORITE'; image: Image }
    | { type: 'SET_FAVORITES'; images: Image[] };

export const FavoritesReducer = (state: Image[], action: Action): Image[] => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return [...state, action.image];
        case 'REMOVE_FAVORITE':
            return state.filter((fav) => fav.id !== action.image.id);
        case 'SET_FAVORITES':
            return action.images;
        default:
            return state;
    }
};
