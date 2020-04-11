/** @jsx jsx */
import { jsx, Box, Text, Container } from "theme-ui";
import { ReactComponent as TmdbLogo } from "features/about/tmdb-logo.svg";

const About = () => {
  return (
    <Container>
      <Box sx={{ width: "7rem", alignSelf: "center", mb: 3 }}>
        <TmdbLogo />
      </Box>
      <Text as="p">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </Text>
    </Container>
  );
};

export default About;
