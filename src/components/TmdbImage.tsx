import React, { useState } from "react";
import { keyframes } from "@emotion/core";
import { Box, Image } from "theme-ui";
import { darken } from "@theme-ui/color";
import AspectRatio from "components/AspectRatio";
import { getImageUrls } from "api/tmdb";
import useTmdbConfig from "features/movies/useTmdbConfig";

interface TmdbImageProps {
  imageType: Tmdb.ImageType;
  path?: string;
  className?: string;
  alt?: string;
  sizes?: string;
}

const TmdbImage = ({
  path,
  imageType,
  className,
  alt,
  sizes,
}: TmdbImageProps) => {
  const [isLoadingImage, setIsLoadingImage] = useState(!!path);
  const [config, isFetchingConfig] = useTmdbConfig();
  const widthRegex = /w\d+/;
  if (config && path) {
    const imageUrls = getImageUrls(path, config, imageType);
    const imageSizes = Object.keys(imageUrls);
    return (
      <>
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
            transition: "visibility 0s, opacity 0.2s ease-in-out",
          }}
        />
        {isLoadingImage && (
          <Placeholder
            imageType={imageType}
            isLoading={isFetchingConfig || isLoadingImage}
          />
        )}
      </>
    );
  } else {
    return <Placeholder imageType={imageType} isLoading={isFetchingConfig} />;
  }
};

interface PlaceholderProps {
  imageType: Tmdb.ImageType;
  isLoading?: boolean;
}

const Placeholder = ({ imageType, isLoading }: PlaceholderProps) => {
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

export default TmdbImage;
