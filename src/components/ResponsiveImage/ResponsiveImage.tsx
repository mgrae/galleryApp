import React from 'react';
import { ResponsiveImageProps} from "../../types/Image";

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ imageSrc, alt, className }) => {
    return (
        <picture>
            <source srcSet={imageSrc.large2x} media="(min-width: 1024px)" />
            <source srcSet={imageSrc.large} media="(min-width: 768px)" />
            <source srcSet={imageSrc.medium} media="(min-width: 480px)" />
            <img src={imageSrc.large} alt={alt} className={className} loading="lazy" />
        </picture>
    );
};

export default ResponsiveImage;
