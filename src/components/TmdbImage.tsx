import React from "react";
import styled from "@emotion/styled/macro";
import { getImageUrls } from "api/tmdb";

interface TmdbImageProps {
  path: string;
  tmdbConfig: Tmdb.Config;
  imageType: Tmdb.ImageType;
  className?: string;
  alt?: string;
  sizes?: string;
}

const TmdbImage: React.FC<TmdbImageProps> = ({
  path,
  tmdbConfig,
  imageType,
  className,
  alt,
  sizes
}) => {
  const imageUrls = getImageUrls(path, tmdbConfig, imageType);
  const widthRegex = /w\d+/;
  return (
    <Image
      src={Object.values(imageUrls)[0]}
      srcSet={Object.keys(imageUrls)
        .filter(size => widthRegex.test(size))
        .map(size => `${imageUrls[size]} ${size.slice(1)}w`)
        .join(", ")}
      sizes={sizes}
      className={className}
      alt={alt}
    />
  );
};

const Image = styled.img`
  max-width: 100%;
`;

export default TmdbImage;
