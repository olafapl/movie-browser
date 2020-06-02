/** @jsx jsx */
import { jsx, Flex, Text } from "theme-ui";
import Head from "common/Head";

interface ErrorProps {
  title?: string;
  message?: string;
}

const Error = ({
  title = "404",
  message = "Could not find the requested page.",
}: ErrorProps) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
      }}
    >
      <Head title={title} />
      <Text as="h1" variant="heading" mb="4">
        {title}
      </Text>
      <Text as="p">{message}</Text>
    </Flex>
  );
};

export default Error;
