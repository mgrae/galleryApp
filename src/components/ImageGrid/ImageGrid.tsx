import React from 'react';
import styles from './ImageGrid.module.css';
import ImageCard from '@components/ImageItem/ImageItem';
import { ImageGridProps } from '../../types/Image';

const ImageGrid: React.FC<ImageGridProps> = ({ images, setLastImageRef }) => {
    return (
        <div className={styles.imageGrid}>
            {images.map((image, index) => (
                <ImageCard
                    key={index}
                    image={image}
                    isLast={index === images.length - 1}
                    setLastImageRef={index === images.length - 1 ? setLastImageRef : undefined}
                />
            ))}
        </div>
    );
};

export default ImageGrid;
