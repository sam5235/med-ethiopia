import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";



const PackageTier = ({ title, options, typePlan, checked = false }) => {
  const colorTextLight = checked ? "white" : "brand.600";
  const bgColorLight = checked ? "brand.400" : "gray.300";

  const colorTextDark = checked ? "white" : "brand.500";
  const bgColorDark = checked ? "brand.400" : "gray.300";

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "flex-start",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
    >
      <Box w={140}>
        <Heading size={"md"}>{title}</Heading>
      </Box>
      <List spacing={3} textAlign="start">
        {options.map((desc, id) => (
          <ListItem key={desc.id}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            {desc.desc}
          </ListItem>
        ))}
      </List>
      <Heading size={"xl"}>{typePlan}</Heading>
      <Stack>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
        >
          Get Started
        </Button>
      </Stack>
    </Stack>
  );
};
const ThreeTierPricingHorizontal = ({stat}) => {
  const options = [
    { id: 1, desc: `${stat.patients} we record` },
    { id: 2, desc: `${stat.health_centers} we serve` },
  ];
  return (
    <Box py={6} px={5} marginTop={100}>
      <Stack spacing={4} width={"100%"} direction={"column"}>
        <Stack
          p={5}
          alignItems={"center"}
          justifyContent={{
            base: "flex-start",
            md: "space-around",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Stack
            width={{
              base: "100%",
              md: "40%",
            }}
            textAlign={"center"}
          >
            <Heading size={"lg"}>
              The Right Plan for <Text color="brand.500">You</Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: "100%",
              md: "60%",
            }}
          >
            <Text textAlign={"center"} as='b'>
              centralized and comprehensive electronic health record system that
              improves the efficiency, accessibility, and quality of healthcare
              services in Ethiopia.
            </Text>
          </Stack>
        </Stack>
        <Divider />
        <PackageTier title={"User"} typePlan="Free" options={options} />
        <Divider />
        <PackageTier
          title={"Healthcare"}
          checked={true}
          typePlan="Free"
          options={options}
        />
      </Stack>
    </Box>
  );
};

export default ThreeTierPricingHorizontal;
