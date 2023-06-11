import Navbar from "./Navbar";
import { Box, useColorModeValue, Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Container pt={9} maxW={"7xl"}>{children}</Container>
    </Box>
  );
};
export default Layout;
