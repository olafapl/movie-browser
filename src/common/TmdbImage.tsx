import React, { useState, useContext } from "react";
/** @jsx jsx */
import { jsx, Box, Image } from "theme-ui";
import { keyframes } from "@emotion/core";
import { darken } from "@theme-ui/color";
import AspectRatio from "common/AspectRatio";
import { getImageUrls } from "common/tmdbApi";
import TmdbConfigContext from "tmdbConfig/TmdbConfigContext";

interface TmdbImageProps {
  imageType: Tmdb.ImageType;
  path: string;
  className?: string;
  alt?: string;
  sizes?: string;
}

export const TmdbImage = ({
  path,
  imageType,
  className,
  alt,
  sizes,
}: TmdbImageProps) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const { config, status } = useContext(TmdbConfigContext);
  const widthRegex = /w\d+/;
  if (config) {
    const imageUrls = getImageUrls(path, config, imageType);
    const imageSizes = Object.keys(imageUrls);
    return (
      <React.Fragment>
        <Image
          src={Object.values(imageUrls)[Math.floor(imageSizes.length / 2)]}
          srcSet={imageSizes
            .filter((size) => widthRegex.test(size))
            .map((size) => `${imageUrls[size]} ${size.slice(1)}w`)
            .join(", ")}
          sizes={sizes}
          className={className}
          alt={alt}
          onLoad={() => setIsLoadingImage(false)}
          sx={{
            visibility: isLoadingImage ? "hidden" : "visible",
            opacity: isLoadingImage ? 0 : 1,
            height: isLoadingImage ? 0 : "auto",
            width: isLoadingImage ? 0 : "auto",
          }}
        />
        {isLoadingImage && <Placeholder imageType={imageType} isLoading />}
      </React.Fragment>
    );
  }
  return <Placeholder imageType={imageType} isLoading={status === "loading"} />;
};

interface PlaceholderProps {
  imageType: Tmdb.ImageType;
  isLoading?: boolean;
}

export const Placeholder = ({ imageType, isLoading }: PlaceholderProps) => {
  return (
    <AspectRatio
      ratio={imageType === "poster" ? 2 / 3 : 16 / 9}
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: darken("muted", 0.05),
          backgroundImage: (theme) =>
            imageType === "poster"
              ? `linear-gradient(45deg, ${theme.colors.muted}, transparent)`
              : "",
          backgroundSize: "400%",
          animation: isLoading
            ? `${gradientPosition} 1.5s linear infinite`
            : "",
        }}
      ></Box>
    </AspectRatio>
  );
};

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
