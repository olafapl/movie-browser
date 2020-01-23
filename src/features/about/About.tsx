import React from "react";
import { Box, Text, Flex } from "@chakra-ui/core";
import { ReactComponent as TmdbLogo } from "features/about/tmdb-logo.svg";

const About = () => {
  return (
    <Box p="4">
      <Flex direction="column" alignItems="center">
        <Box width="7rem" mb="4">
          <TmdbLogo />
        </Box>
        <Text>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </Text>
      </Flex>
    </Box>
  );
};

export default About;
