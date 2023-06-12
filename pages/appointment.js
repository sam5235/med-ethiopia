import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  InputLeftElement,
  Input,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SimpleCalendar from "../components/common/Calendar";
import { SearchIcon } from "@chakra-ui/icons";
import { filterHospital } from "../firebase/hospitalService";

function AppointmentBooking() {
  const [searchInput, setSearchInput] = useState("");
 const [hospitals, setHospitals] = useState([]);

  const handeleAppoitmentByName = async ()=>{
        filterHospital(searchInput).then(hospitals=> setHospitals(hospitals));
  }
console.log(hospitals);
  return (
    <Grid pt={10} templateColumns="repeat(10, 1fr)">
      <GridItem colSpan={4}>
        {" "}
        <SimpleCalendar />
      </GridItem>
      <GridItem colSpan={6} direction="column">
        <Flex mb="5">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search"
              bg="chakra-body-bg"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </InputGroup>
          <IconButton
            mx="2"
            onClick={handeleAppoitmentByName}
            colorScheme="brand"
            aria-label="Call Segun"
            icon={<SearchIcon />}
          />
        </Flex>
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
        <Flex justifyContent="center">
          <Image width="350px" src="Calendar-bro.svg" />
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default AppointmentBooking;
