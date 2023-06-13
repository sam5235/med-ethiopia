import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Illustration } from "../components/illustrations/landing-page";
import BasicStatistics from "../components/StatsCard";
import ThreeTierPricingHorizontal from "../components/PackageTier";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMeditopiaStats } from "../firebase/statServices";

export default function LandingPage() {
  const router = useRouter();
  const [stat, setStat] = useState({});

  useEffect(() => {
    const fetchStat = () => {
      getMeditopiaStats().then((stat) => setStat(stat));
    };

    fetchStat();
  }, []);

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
            onClick={() => router.push("/signup")}
            _hover={{ bg: "brand.400" }}
          >
            Get started
          </Button>
          <Button
            variant="outline"
            rounded={"full"}
            onClick={() => router.push("/blogs")}
            px={6}
          >
            Learn more
          </Button>
        </Stack>
        <Flex w={"full"}>
          <Illustration height={{ sm: "35rem", lg: "40rem" }} mx="auto" />
        </Flex>
      </Stack>

      <BasicStatistics stat={stat} />

      <ThreeTierPricingHorizontal />
    </Container>
  );
}
