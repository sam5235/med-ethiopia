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
import React, { useEffect, useState } from "react";
import SimpleCalendar from "../components/common/Calendar";
import { SearchIcon } from "@chakra-ui/icons";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { filterHospital } from "../firebase/hospitalService";
import { getApptsByHospitalAndDate } from "../firebase/appointmentService";

const pad = (num) => (num < 10 ? `0${num}` : `${num}`);

const getDateStr = (date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

function AppointmentBooking() {
  const [searchInput, setSearchInput] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState("");

  const handeleAppoitmentByName = async ({ target: { value } }) => {
    clearTimeout(timeoutId);
    setSearchInput(value);

    if (value) {
      const id = setTimeout(() => {
        setIsLoading(true);
        filterHospital(searchInput).then((hospitals) => {
          setHospitals(hospitals);
          setIsLoading(false);
        });
      }, [750]);
      setTimeoutId(id);
    }
    {
      setHospitals([]);
    }
  };

  useEffect(() => {
    if (selectedHospital) {
      console.log("called", selectedHospital.id, getDateStr(selectedDate));
      const fetchByHospitalAndDate = () => {
        getApptsByHospitalAndDate(
          selectedHospital.id,
          getDateStr(selectedDate)
        ).then((results) => {
          console.log(results);
        });
      };
      fetchByHospitalAndDate();
    }
  }, [selectedHospital, selectedDate]);

  return (
    <Grid pt={10} templateColumns="repeat(10, 1fr)">
      <GridItem colSpan={4}>
        <SimpleCalendar date={selectedDate} setDate={setSelectedDate} />
      </GridItem>
      <GridItem colSpan={6} direction="column">
        <Flex mb="5">
          <InputGroup zIndex={100}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <AutoComplete openOnFocus>
              <AutoCompleteInput
                pl={9}
                value={searchInput}
                onChange={handeleAppoitmentByName}
                variant="filled"
              />
              <AutoCompleteList>
                {hospitals.map((hospital, cid) => (
                  <AutoCompleteItem
                    key={`option-${cid}`}
                    value={hospital.name}
                    onClick={() => setSelectedHospital(hospital)}
                    textTransform="capitalize"
                  >
                    {hospital.name}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>
          </InputGroup>
          <IconButton
            mx="2"
            isLoading={isLoading}
            colorScheme="brand"
            aria-label="Call Segun"
            icon={<SearchIcon />}
          />
        </Flex>

        <Flex justifyContent="flex-start" alignItems="center" my={4} mb={10}>
          <Flex mx={2}>
            <Image
              alt="healthpic"
              src="./calendar.png"
              w="12"
              objectFit="contain"
              mr="2"
            />
            <Box display="block">
              <Text as="b">{new Date(selectedDate).toDateString()}</Text>
              <Text color="gray.500">Appointment Date</Text>
            </Box>
          </Flex>

          {selectedHospital && (
            <Flex mx={2}>
              <Image
                alt="healthpic"
                src="./hospital.png"
                w="12"
                objectFit="contain"
                mr="2"
              />
              <Box display="block">
                <Text as="b">{selectedHospital.name}</Text>
                <Text color="gray.500">Appointment Date Date</Text>
              </Box>
            </Flex>
          )}
        </Flex>

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
