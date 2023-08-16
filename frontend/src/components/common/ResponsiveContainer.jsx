import { Box, useBreakpointValue } from "@chakra-ui/react";

const ResponsiveContainer = ({ children }) => {
  const padding = useBreakpointValue({
    base: "4",
    sm: "4",
    md: "6",
    lg: "8",
    xl: "10",
    "2xl": "12",
  });
  const maxWidth = useBreakpointValue({
    base: "100%",
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1140px",
    "2xl": "1320px",
  });

  return (
    <Box
      paddingLeft={padding}
      paddingRight={padding}
      marginX="auto"
    //   maxWidth={maxWidth}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer;
