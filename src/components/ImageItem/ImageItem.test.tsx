import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFavorites } from '../../context/FavoritesContext';
import ImageItem from './ImageItem';
import { ImageItemProps } from '../../types/Image';

jest.mock('../../context/FavoritesContext', () => ({
    useFavorites: jest.fn(),
}));

const mockImage: ImageItemProps['image'] = {
    id: 1,
    src: {
        medium: 'test-medium.jpg',
        original: 'test-original.jpg',
        large2x: 'test-large2x.jpg',
        large: 'test-large.jpg',
        small: 'test-small.jpg',
        portrait: 'test-portrait.jpg',
        landscape: 'test-landscape.jpg',
        tiny: 'test-tiny.jpg',
    },
    width: 400,
    height: 300,
    alt: 'test image',
    photographer: 'Test Photographer',
    photographer_url: 'https://test.com',
    photographer_id: 1,
};

const mockUseFavorites = useFavorites as jest.Mock;

describe('ImageItem', () => {
    beforeEach(() => {
        mockUseFavorites.mockReturnValue({
            favorites: [],
            addFavorite: jest.fn(),
            removeFavorite: jest.fn(),
        });
    });

    it('renders image with alt text', () => {
        render(<ImageItem image={mockImage} />);
        const imgElement = screen.getByAltText(/test image/i);
        expect(imgElement).toBeInTheDocument();
    });

    it('calls addFavorite when "Add to Favourites" is clicked', () => {
        const addFavorite = jest.fn();
        mockUseFavorites.mockReturnValue({
            favorites: [],
            addFavorite,
            removeFavorite: jest.fn(),
        });

        render(<ImageItem image={mockImage} />);
        const button = screen.getByText(/Add to Favourites/i);
        fireEvent.click(button);
        expect(addFavorite).toHaveBeenCalledWith(mockImage);
    });

    it('calls removeFavorite when "Favourite" is clicked', () => {
        const removeFavorite = jest.fn();
        mockUseFavorites.mockReturnValue({
            favorites: [mockImage],
            addFavorite: jest.fn(),
            removeFavorite,
        });

        render(<ImageItem image={mockImage} />);
        const button = screen.getByText(/Favourite/i);
        fireEvent.click(button);
        expect(removeFavorite).toHaveBeenCalledWith(mockImage);
    });
});
