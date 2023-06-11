import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from "@chakra-ui/react";
import { Illustration } from "../components/illustrations/landing-page";
import BasicStatistics from "../components/StatsCard";
import ThreeTierPricingHorizontal from "../components/PackageTier";
import LargeWithLogoLeft from "../components/Footer";

export default function LandingPage() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          lineHeight={"110%"}
        >
          Efficient Care by{" "}
          <Text as={"span"} color={"brand.600"}>
            Centralized Excellence!
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Seamlessly Connects, Coordinates, and Transforms Care. Streamline
          Operations, Enhance Collaboration, and Improve Patient Outcomes.
          Experience Efficiency and Excellence in Healthcare Management Today!
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"brand"}
            _hover={{ bg: "brand.400" }}
          >
            Get started
          </Button>
          <Button variant="outline" rounded={"full"} px={6}>
            Learn more
          </Button>
        </Stack>
        <Flex w={"full"}>
          <Illustration height={{ sm: "35rem", lg: "40rem" }} ƒ mx="auto" />
        </Flex>
      </Stack>

      <BasicStatistics />

      <ThreeTierPricingHorizontal />

      <LargeWithLogoLeft />
    </Container>
  );
}
