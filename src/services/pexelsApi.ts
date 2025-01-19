import * as process from "process";
import {PexelsResponse} from '../types/Image';

export const fetchImages = async (page: number): Promise<PexelsResponse> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_PEXEL_BASE_URL}curated?page=${page}`, {
            headers: {
                Authorization: `${process.env.REACT_APP_PEXEL_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
        }
        const data: any = await response.json();

        // Type guard/validation
        if (
            typeof data === 'object' &&
            data !== null &&
            typeof data.page === 'number' &&
            typeof data.per_page === 'number' &&
            Array.isArray(data.photos) &&
            typeof data.total_results === 'number'
        ) {
            return data as PexelsResponse;
        } else {
            console.error('Invalid Pexels API response:', data);
            throw new Error('Invalid Pexels API response format');
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};