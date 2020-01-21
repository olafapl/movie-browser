import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import styled from "@emotion/styled/macro";
import { AspectRatioBox, Box } from "@chakra-ui/core";
import { getImageUrls } from "api/tmdb";
import useTmdbConfig from "features/movies/useTmdbConfig";

interface TmdbImageProps {
  path: string;
  imageType: Tmdb.ImageType;
  className?: string;
  alt?: string;
  sizes?: string;
}

const TmdbImage: React.FC<TmdbImageProps> = ({
  path,
  imageType,
  className,
  alt,
  sizes
}) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [config, isFetchingConfig] = useTmdbConfig();
  const widthRegex = /w\d+/;
  if (config) {
    const imageUrls = getImageUrls(path, config, imageType);
    const imageSizes = Object.keys(imageUrls);
    return (
      <React.Fragment>
        {/* The <></> syntax is currently not compatible with Emotion's css prop (https://github.com/emotion-js/emotion/issues/1303) */}
        <Image
          src={Object.values(imageUrls)[Math.floor(imageSizes.length / 2)]}
          srcSet={imageSizes
            .filter(size => widthRegex.test(size))
            .map(size => `${imageUrls[size]} ${size.slice(1)}w`)
            .join(", ")}
          sizes={sizes}
          className={className}
          alt={alt}
          onLoad={() => setIsLoadingImage(false)}
          css={css`
            visibility: ${isLoadingImage ? "hidden" : "visible"};
            opacity: ${isLoadingImage ? 0 : 1};
            height: ${isLoadingImage ? 0 : "auto"};
            width: ${isLoadingImage ? 0 : "auto"};
            transition: visibility 0s, opacity 0.2s ease-in-out;
          `}
        />
        {isLoadingImage && (
          <Placeholder
            imageType={imageType}
            isLoading={isFetchingConfig || isLoadingImage}
          />
        )}
      </React.Fragment>
    );
  } else {
    return <Placeholder imageType={imageType} isLoading={isFetchingConfig} />;
  }
};

interface PlaceholderProps {
  imageType: Tmdb.ImageType;
  isLoading?: boolean;
}

const Placeholder: React.FC<PlaceholderProps> = ({ imageType, isLoading }) => {
  return (
    <AspectRatioBox
      maxWidth="100%"
      ratio={imageType === "poster" ? 2 / 3 : 16 / 9}
    >
      <Box
        backgroundImage={
          imageType === "poster" ? "linear-gradient(45deg, #333, #222)" : ""
        }
        backgroundSize="400%"
        animation={isLoading ? `${gradientPosition} 1.5s linear infinite` : ""}
      ></Box>
    </AspectRatioBox>
  );
};

const Image = styled.img`
  max-width: 100%;
`;

const gradientPosition = keyframes`
  0% {
    background-position: 0% 100%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
`;

export default TmdbImage;
