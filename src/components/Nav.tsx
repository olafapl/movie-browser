import React, { useState, useRef } from "react";
/** @jsx jsx */
import { jsx, Flex, MenuButton, Container, Box, NavLink, Link } from "theme-ui";
import { Link as RouterLink } from "react-router-dom";
import SearchBar from "features/search/SearchBar";
import useOnClickOutside from "hooks/useOnClickOutside";
import Drawer from "components/Drawer";

const routes = [
  { title: "Popular", path: "/movies/popular" },
  { title: "Top rated", path: "/movies/top-rated" },
  { title: "Trending", path: "/movies/trending" },
];

const Nav = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(() => setDrawerIsOpen(false), [drawerRef]);
  return (
    <React.Fragment>
      <Box as="nav">
        <Container>
          <Flex
            sx={{
              alignItems: "center",
            }}
          >
            <Link
              as={RouterLink}
              // @ts-ignore
              to="/"
              variant="logo"
              sx={{
                mr: 3,
              }}
            >
              MB
            </Link>
            <SearchBar
              sx={{
                mr: 3,
                flex: "1",
              }}
            />
            <MenuButton onClick={() => setDrawerIsOpen(true)}>Menu</MenuButton>
          </Flex>
        </Container>
      </Box>
      <Drawer
        title="Menu"
        drawerRef={drawerRef}
        isOpen={drawerIsOpen}
        setIsOpen={setDrawerIsOpen}
      >
        <Flex sx={{ flexDirection: "column", flex: "1", py: 3 }}>
          {routes.map(({ title, path }) => (
            <NavLink
              as={RouterLink}
              // @ts-ignore
              to={path}
              key={`${title}${path}`}
              onClick={() => setDrawerIsOpen(false)}
            >
              {title}
            </NavLink>
          ))}
          <NavLink
            as={RouterLink}
            // @ts-ignore
            to="/about"
            sx={{ mt: "auto" }}
            onClick={() => setDrawerIsOpen(false)}
          >
            About
          </NavLink>
        </Flex>
      </Drawer>
    </React.Fragment>
  );
};

export default Nav;
