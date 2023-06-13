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
  Progress,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SimpleCalendar from "../components/common/Calendar";
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { filterHospital } from "../firebase/hospitalService";
import {
  addOrRemoveAppointment,
  getApptsByHospitalAndDate,
} from "../firebase/appointmentService";
import { useAuth } from "../context/AuthContext";
import AppointmentCard from "../components/AppointmentCard";

const pad = (num) => (num < 10 ? `0${num}` : `${num}`);

const getDateStr = (date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

const getTimeStr = (appt) => {
  return `${appt.start_time} - ${appt.end_time}`;
};

const times = {
  "08:00 AM - 10:00 AM": 0,
  "10:00 AM - 12:00 PM": 1,
  "12:00 PM - 02:00 PM": 2,
  "02:00 PM - 04:00 PM": 3,
  "04:00 PM - 06:00 PM": 4,
};

const getTimeSortValue = (str) => times[str];

function AppointmentBooking() {
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [appointments, setAppointments] = useState([]);

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

  const onAppointmentSave = (appt) => {
    setIsScheduleLoading(true);
    let isAdd = true;
    if (appt.patientsId.includes(user.uid)) {
      appt.patientsId = appt.patientsId.filter((id) => id !== user.uid);
      isAdd = false;
    } else {
      appt.patientsId.push(user.uid);
    }

    addOrRemoveAppointment(appt).then(() => {
      setSchedules((sch) => (sch.id === appt.id ? appt : sch));
      setAppointments((sch) =>
        isAdd
          ? [...sch, { ...appt, hospital: selectedHospital.name }]
          : sch.filter((s) => s.id !== appt.id)
      );
      setIsScheduleLoading(false);
      setSelectedTimeSlot();
    });
  };

  const sortedSchedules = schedules.sort(
    (a, b) => getTimeSortValue(getTimeStr(a)) - getTimeSortValue(getTimeStr(b))
  );

  const isTheDayBooked =
    schedules.filter((sch) => sch.patientsId.includes(user.uid)).length > 0;

  useEffect(() => {
    if (selectedHospital) {
      const fetchByHospitalAndDate = () => {
        setIsScheduleLoading(true);
        getApptsByHospitalAndDate(
          selectedHospital.id,
          getDateStr(selectedDate)
        ).then((results) => {
          setSchedules(results);
          setIsScheduleLoading(false);
        });
      };
      fetchByHospitalAndDate();
    }
  }, [selectedHospital, selectedDate]);

  return (
    <Box>
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
                  <Text color="gray.500">Appointment Place</Text>
                </Box>
              </Flex>
            )}
          </Flex>

          <Box w="full" position="relative" pb={5}>
            {isScheduleLoading && (
              <Progress
                position="absolute"
                top={0}
                left={0}
                w="full"
                size="xs"
                colorScheme="brand"
                isIndeterminate
              />
            )}
          </Box>

          <Grid mt={10} templateColumns="repeat(3, 1fr)" gap={4}>
            {sortedSchedules.map((schedule, key) => {
              const alreadyBooked = schedule.patientsId.includes(user.uid);
              const maxReached =
                schedule.patientsId.length === parseInt(schedule.max_patients);
              const isSelected = selectedTimeSlot?.id === schedule.id;

              return (
                <Button
                  key={key}
                  onClick={() => setSelectedTimeSlot(schedule)}
                  colorScheme={alreadyBooked || isSelected ? "brand" : "gray"}
                  rightIcon={isSelected && <CheckIcon />}
                  boxShadow={isSelected && "2xl"}
                  isDisabled={
                    isScheduleLoading ||
                    maxReached ||
                    (isTheDayBooked && !alreadyBooked)
                  }
                  border="2px"
                  variant={alreadyBooked ? "solid" : "outline"}
                >
                  {getTimeStr(schedule)}
                </Button>
              );
            })}
          </Grid>

          <Flex direction="column" alignItems="center">
            <Image width="350px" src="Calendar-bro.svg" alt="appt-img" />
            {selectedTimeSlot && (
              <Button
                onClick={() => onAppointmentSave(selectedTimeSlot)}
                colorScheme="brand"
                isDisabled={isScheduleLoading}
              >
                Save
              </Button>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <AppointmentCard
        appointments={appointments}
        setAppointments={setAppointments}
      />
    </Box>
  );
}

export default AppointmentBooking;
