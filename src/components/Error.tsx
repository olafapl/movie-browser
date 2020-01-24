import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import Head from "components/Head";

const Error = () => {
  return (
    <>
      <Head title="404" />
      <Flex alignItems="center" justifyContent="center" flex="1">
        <Text>Could not find the requested page.</Text>
      </Flex>
    </>
  );
};

export default Error;
