import { fetchImages } from './pexelsApi';
import { PexelsResponse } from '../types/Image';

describe('fetchImages', () => {
    const mockFetch = jest.fn();

    // Mock the environment variables for the test suite
    beforeAll(() => {
        process.env.REACT_APP_PEXEL_API_KEY = 'mock_api_key';
        process.env.REACT_APP_PEXEL_BASE_URL = 'https://api.pexels.com/v1/';
    });

    beforeEach(() => {
        global.fetch = mockFetch;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch and return images on success', async () => {
        const mockResponse: PexelsResponse = {
            page: 1,
            per_page: 15,
            photos: [
                {
                    id: 1,
                    src: {
                        original: '', large2x: '', large: '', medium: '', small: '', portrait: '', landscape: '',
                        tiny: ''
                    },
                    alt: '', photographer: '', photographer_url: '', photographer_id: 1, height: 0, width: 0
                },
            ],
            total_results: 100,
        };

        // Mock the resolved fetch response
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await fetchImages(1);
        expect(result).toEqual(mockResponse);  // Expect the result to match the mock response
        expect(mockFetch).toHaveBeenCalledWith('https://api.pexels.com/v1/curated?page=1', {
            headers: { Authorization: 'mock_api_key' },
        });
    });

    it('should throw an error when the response is not ok', async () => {
        // Mock a failed fetch response (non-OK status)
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
        });

        // Expect the function to throw an error with the correct message
        await expect(fetchImages(1)).rejects.toThrow('Failed to fetch images: 500 Internal Server Error');
        expect(mockFetch).toHaveBeenCalledWith('https://api.pexels.com/v1/curated?page=1', {
            headers: { Authorization: 'mock_api_key' },
        });
    });

    it('should throw an error for an invalid response format', async () => {
        const invalidResponse = { invalidKey: 'invalidValue' };  // Incorrect format for data
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(invalidResponse),
        });

        // Expect the function to throw an error indicating an invalid format
        await expect(fetchImages(1)).rejects.toThrow('Invalid Pexels API response format');
    });

    it('should log and throw errors for unexpected errors', async () => {
        const errorMessage = 'Network Error';
        mockFetch.mockRejectedValueOnce(new Error(errorMessage));  // Simulate network failure

        // Expect the function to throw the network error
        await expect(fetchImages(1)).rejects.toThrow(errorMessage);
    });
});
