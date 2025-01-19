import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageGrid from './ImageGrid';
import { FavoritesProvider } from '../../context/FavoritesProvider';
import { ImageGridProps } from '../../types/Image';

const mockImages: ImageGridProps['images'] = [
    {
        id: 1,
        src: {
            original: 'image1-original.jpg',
            large2x: 'image1-large2x.jpg',
            large: 'image1-large.jpg',
            medium: 'image1-medium.jpg',
            small: 'image1-small.jpg',
            portrait: 'image1-portrait.jpg',
            landscape: 'image1-landscape.jpg',
            tiny: 'image1-tiny.jpg',
        },
        width: 400,
        height: 300,
        alt: 'Image 1',
        photographer: 'Photographer 1',
        photographer_url: 'https://example.com/1',
        photographer_id: 1,
    },
];

describe('ImageGrid', () => {
    it('renders the correct number of ImageCard components', () => {
        render(
            <FavoritesProvider>
                <ImageGrid images={mockImages} setLastImageRef={jest.fn()} />
            </FavoritesProvider>
        );

        const imageCards = screen.getAllByAltText('Image 1');
        expect(imageCards).toHaveLength(mockImages.length);
    });

    it('applies setLastImageRef to the last ImageCard', () => {
        const mockSetLastImageRef = jest.fn();
        render(
            <FavoritesProvider>
                <ImageGrid images={mockImages} setLastImageRef={mockSetLastImageRef} />
            </FavoritesProvider>
        );

        expect(mockSetLastImageRef).toHaveBeenCalled();
    });
});
