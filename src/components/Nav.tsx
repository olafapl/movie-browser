import React, { useState } from "react";
import {
  Flex,
  Link,
  Stack,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  useDisclosure
} from "@chakra-ui/core";
import { Link as BrowserLink, useHistory } from "react-router-dom";
import useSearchQuery from "features/search/useSearchQuery";

const routes = [
  { title: "Popular", path: "/movies/popular" },
  { title: "Top rated", path: "/movies/top-rated" },
  { title: "Trending", path: "/movies/trending" }
];

const Nav = () => {
  const [query, setQuery] = useSearchQuery();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onInputChange = (event: React.FormEvent) => {
    if (history.location.pathname !== "/search") {
      history.push({ pathname: "/search" });
    }
    setQuery((event.target as HTMLInputElement).value);
  };
  const onInputKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      history.push({ pathname: "/search" });
    }
  };
  return (
    <>
      <Flex
        p="4"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="lg"
        bg="gray.900"
      >
        <InputGroup flex="1" mr="4">
          <Input
            variant="outline"
            borderRadius="full"
            pl="10"
            placeholder="Search ..."
            value={query}
            onChange={onInputChange}
            onKeyUp={onInputKeyUp}
          />
          <InputLeftElement p="">
            <Icon name="search" color="gray.500" />
          </InputLeftElement>
        </InputGroup>
        <Button variant="ghost" size="sm" onClick={onOpen}>
          Menu
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing="4">
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
          </DrawerBody>
          <DrawerFooter justifyContent="flex-start">
            <Link
              // @ts-ignore
              as={BrowserLink}
              to="/about"
            >
              About
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Nav;
