import React from "react";
import { Box, Text, Flex } from "@chakra-ui/core";
import { ReactComponent as TmdbLogo } from "features/about/tmdb-logo.svg";

const About = () => {
  return (
    <Flex direction="column" alignItems="center" py="8" px="4">
      <Box width="7rem" mb="4">
        <TmdbLogo />
      </Box>
      <Text>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </Text>
    </Flex>
  );
};

export default About;
