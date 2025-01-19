import { getFavoritesFromLocalStorage, setFavoritesToLocalStorage } from './localStorageUtils';
import { Image } from '../types/Image';

describe('Local Storage Utilities', () => {
    const mockFavorites: Image[] = [
        { id: 1, src: { original: '', large2x: '', large: '', medium: '', small: '', portrait: '',
                landscape: '', tiny: '' }, width: 500, height: 400,
            alt: 'Sample Image', photographer: 'John Doe', photographer_url: '', photographer_id: 1 }
    ];

    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(Storage.prototype, 'getItem');
        jest.spyOn(Storage.prototype, 'setItem');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should retrieve favorites from localStorage', () => {
        localStorage.setItem('favorites', JSON.stringify(mockFavorites));

        const favorites = getFavoritesFromLocalStorage();

        expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
        expect(favorites).toEqual(mockFavorites);
    });

    it('should return an empty array when no favorites are stored', () => {
        const favorites = getFavoritesFromLocalStorage();

        expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
        expect(favorites).toEqual([]);
    });

    it('should store favorites in localStorage', () => {
        setFavoritesToLocalStorage(mockFavorites);

        expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(mockFavorites));
    });

    it('should overwrite existing favorites in localStorage', () => {
        const newFavorites: Image[] = [
            { id: 2, src: { original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '', tiny: '' }, width: 600, height: 500, alt: 'New Image', photographer: 'Jane Doe', photographer_url: '', photographer_id: 2 }
        ];

        setFavoritesToLocalStorage(newFavorites);

        expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(newFavorites));
        expect(localStorage.getItem('favorites')).toBe(JSON.stringify(newFavorites));
    });
});
