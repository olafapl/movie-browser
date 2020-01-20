import React from "react";
import { Flex, Text, Link, Stack } from "@chakra-ui/core";
import { Link as BrowserLink } from "react-router-dom";

const routes = [
  { title: "Popular", path: "/movies/popular" },
  { title: "Top rated", path: "/movies/top-rated" },
  { title: "Trending", path: "/movies/trending" }
];

const Nav = () => {
  return (
    <Flex
      p="4"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="lg"
      bg="gray.900"
    >
      <Link
        // @ts-ignore
        as={BrowserLink}
        to="/"
      >
        <Text fontWeight="bold">Movie Poller</Text>
      </Link>
      <Stack isInline spacing="4">
        {routes.map(({ title, path }) => (
          <Link
            // @ts-ignore
            as={BrowserLink}
            to={path}
            key={`${title}${path}`}
          >
            {title}
          </Link>
        ))}
      </Stack>
    </Flex>
  );
};

export default Nav;
