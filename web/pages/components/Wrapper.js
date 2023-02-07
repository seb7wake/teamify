import { Box } from "@chakra-ui/react";
import React from "react";

const Wrapper = ({ children, variant = "regular" }) => {
  return (
    <Box
      // margin-top 8
      mt={8}
      // margin-left and margin-right auto
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
