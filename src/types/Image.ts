export interface Image {
    id: number;
    width: number;
    height: number;
    alt: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
}

export interface PexelsResponse {
    page: number;
    per_page: number;
    photos: Image[];
    total_results: number;
    next_page?: string;
}

export interface ImageItemProps {
    image: Image;
    isLast?: boolean;
    setLastImageRef?: (node: HTMLDivElement | null) => void;
}

export interface ImageGridProps {
    images: Image[];
    setLastImageRef: (node: HTMLDivElement | null) => void;
}

export interface ImageSource {
    small: string;
    medium: string;
    large: string;
    large2x: string;
}

export interface ResponsiveImageProps {
    imageSrc: ImageSource;
    className?: string;
    alt: string;
}
