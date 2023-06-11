import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import SearchBar from "../common/SearchBar";

function AppointmentBooking() {
  return (
    <Grid templateColumns='repeat(10, 1fr)'>
      <GridItem colSpan={4}>calendar</GridItem>
      <GridItem colSpan={6} direction="column">
        <SearchBar />
        <Text m={3}> 24th,May,2023</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <Button colorScheme="brand" border="2px" variant="outline">
            08:00 AM - 10:00 AM
          </Button>{" "}
          <Button border="2px" variant="outline">
            10:00 AM - 12:00 PM
          </Button>{" "}
          <Button border="2px" color="gray.400" variant="outline">
            12:00 PM - 02:00 PM
          </Button>{" "}
          <Button colorScheme="gray" border="2px" variant="outline">
            02:00 PM - 04:00 PM
          </Button>{" "}
          <Button colorScheme="brand" border="2px" variant="outline">
            04:00 PM - 06:00 PM
          </Button>
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default AppointmentBooking;
