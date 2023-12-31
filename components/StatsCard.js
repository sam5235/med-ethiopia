import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

function StatsCard({ title, stat }) {
  console.log(stat);
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      boxShadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      rounded={"lg"}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>

        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function BasicStatistics({ stat }) {
  return (
    <Box maxW="7xl" pb={10} mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        pb={10}
        fontWeight={"bold"}
      >
        What is our company doing?
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"We serve"} stat={`${stat.patients} patients`} />
        <StatsCard
          title={"Working with"}
          stat={`${stat.health_centers} healthcares`}
        />
        <StatsCard
          title={"Provide over"}
          stat={`${stat.blogs} different blogs`}
        />
      </SimpleGrid>
    </Box>
  );
}
