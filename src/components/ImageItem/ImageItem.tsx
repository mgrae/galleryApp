import React from 'react';
import ResponsiveImage from '@components/ResponsiveImage/ResponsiveImage';

import styles from './ImageItem.module.css';
import { useFavorites } from '../../context/FavoritesContext';
import {ImageItemProps} from '../../types/Image';

const ImageItem: React.FC<ImageItemProps> = ({ image, isLast, setLastImageRef }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some((fav) => fav.id === image.id);
    return (
        <div className={styles.imageContainer} key={image.id} ref={isLast ? setLastImageRef : null}>
            <ResponsiveImage imageSrc={image.src} alt={image.alt} className={styles.image} />
            <div className={styles.overlay}>
                <span className={styles.imageAlt}>{image.alt}</span>

                    <hr className={styles.line} />
                    <em className={styles.text}>{image.photographer}</em>

                <span className={styles.textButton} onClick={() => (isFavorite ? removeFavorite(image) : addFavorite(image))}>
          {isFavorite ? 'Favourite' : 'Add to Favourites'}
        </span>
            </div>
        </div>
    );
};

export default ImageItem;