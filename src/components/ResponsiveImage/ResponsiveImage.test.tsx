// src/components/ResponsiveImage/ResponsiveImage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ResponsiveImage from './ResponsiveImage';

describe('ResponsiveImage', () => {
    const mockImageSrc = {
        small: 'small.jpg',
        medium: 'medium.jpg',
        large: 'large.jpg',
        large2x: 'large2x.jpg',
    };

    const mockAltText = 'A sample image';

    it('renders the picture element with correct source tags', () => {
        render(<ResponsiveImage imageSrc={mockImageSrc} alt={mockAltText} className="test-class" />);

        const sourceElements = screen.getAllByRole('img', { hidden: true })[0].parentElement?.children;

        expect(sourceElements).toHaveLength(4); // three <source> elements + one <img> element
        expect(sourceElements?.[0]).toHaveAttribute('srcSet', mockImageSrc.large2x);
        expect(sourceElements?.[0]).toHaveAttribute('media', '(min-width: 1024px)');
        expect(sourceElements?.[1]).toHaveAttribute('srcSet', mockImageSrc.large);
        expect(sourceElements?.[1]).toHaveAttribute('media', '(min-width: 768px)');
        expect(sourceElements?.[2]).toHaveAttribute('srcSet', mockImageSrc.medium);
        expect(sourceElements?.[2]).toHaveAttribute('media', '(min-width: 480px)');
    });

    it('renders the img element with correct attributes', () => {
        render(<ResponsiveImage imageSrc={mockImageSrc} alt={mockAltText} className="test-class" />);

        const imgElement = screen.getByAltText(mockAltText);

        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', mockImageSrc.large);
        expect(imgElement).toHaveAttribute('class', 'test-class');
        expect(imgElement).toHaveAttribute('loading', 'lazy');
    });
});
