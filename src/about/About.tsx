/** @jsx jsx */
import { jsx, Box, Text, Container } from "theme-ui";
import { Helmet } from "react-helmet";
import { ReactComponent as TmdbLogo } from "about/tmdb-logo.svg";

const About = () => {
  return (
    <Container>
      <Helmet>
        <title>About</title>
      </Helmet>
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
