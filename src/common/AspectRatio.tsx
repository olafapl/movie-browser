/** @jsx jsx */
import { jsx, Box } from "theme-ui";

interface AspectRatioProps extends React.ComponentProps<typeof Box> {
  ratio: number;
  children: React.ReactNode;
}

const AspectRatio = ({ ratio, children, ...props }: AspectRatioProps) => {
  const { sx, ...otherProps } = props;
  return (
    <Box
      sx={{
        ...(sx ?? {}),
        position: "relative",
        "::after": {
          height: 0,
          content: "''",
          display: "block",
          paddingBottom: `${(1 / ratio) * 100}%`,
        },
      }}
      {...otherProps}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AspectRatio;
