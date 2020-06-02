/** @jsx jsx */
import { jsx, Flex, Spinner } from "theme-ui";

const Loading = () => {
  return (
    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
      }}
    >
      <Spinner />
    </Flex>
  );
};

export default Loading;
