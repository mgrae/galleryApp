import React, {useState, useEffect, useRef} from 'react';
import ImageGrid from '@components/ImageGrid/ImageGrid'; // Correct import
import {fetchImages} from '@services/pexelsApi';
import useIntersectionObserver from '@hooks/useInfiniteScroll';
import {Image} from './types/Image';

const App: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [page, setPage] = useState(1);
    const [lastImageRef, isIntersecting] = useIntersectionObserver(() => {
        setPage((prevPage) => prevPage + 1);
    });

    useEffect(() => {
        const loadImages = async () => {
            try {
                const data = await fetchImages(page);
                if (data && data.photos) {
                    setImages((prev) => {
                        const newImages = data.photos.filter(photo =>
                            !prev.some(existingPhoto => existingPhoto.id === photo.id)
                        );
                        return [...prev, ...newImages];
                    });
                } else {
                    console.error("Invalid data format from fetchImages:", data);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        loadImages();
    }, [page]);

    return (
        <div className="App">
            <ImageGrid images={images} setLastImageRef={lastImageRef} />
            {isIntersecting && <div>Loading...</div>}
        </div>
    )
};

export default App;
