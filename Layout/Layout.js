import { useRouter } from "next/router";
import LargeWithLogoLeft from "../components/Footer";
import { Box, Container } from "@chakra-ui/react";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <Box>
      <Navbar />
      <Container pt={9} maxW={"7xl"}>
        {children}
      </Container>
      {pathname === "/" && <LargeWithLogoLeft />}
    </Box>
  );
};
export default Layout;
