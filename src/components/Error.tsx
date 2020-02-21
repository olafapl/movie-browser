import React from "react";
import { Flex, Text } from "theme-ui";
import Head from "components/Head";

const Error = () => {
  return (
    <>
      <Head title="404" />
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flex: "1"
        }}
      >
        <Text>Could not find the requested page.</Text>
      </Flex>
    </>
  );
};

export default Error;
