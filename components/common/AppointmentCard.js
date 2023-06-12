import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { SearchIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/AuthContext";
import { getAppointments } from "../../firebase/hospitalService";

const pad = (num) => (num < 10 ? `0${num}` : `${num}`);

const getDateStr = (date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

function AppointmentCard({ appointments, setAppointments }) {
  const { user } = useAuth();
  const [selectedAppnt, setSelectedAppnt] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(getDateStr(new Date()));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnDelete = (appnt) => {
    setSelectedAppnt();
    onOpen();
  };

  const fetchAppointments = () => {
    setIsLoading(true);

    getAppointments().then((appts) => {
      setAppointments(appts);
      setIsLoading(false);
    });
  };

  const handeleAppoitmentByDate = () => {
    setIsLoading(true);
    getAppointmentByDate(selectedDate).then((appts) => {
      setAppointments(appts);
      setIsLoading(false);
    });
  };

  const handleUpdate = (appt) => {
    setAppointments((appts) =>
      appts.map((_appt) => {
        return appt.id == _appt.id ? appt : _appt;
      })
    );
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Grid templateColumns="70% 30%">
      <GridItem mb={20}>
        <Flex mt={20} justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <Icon fontSize="6xl" as={CiCalendarDate} color="blue.500" />
            <Box>
              <Text fontSize="xl">Schedules</Text>
              <Text
                fontSize="xs"
                color="gray.500"
              >{`${user.displayName} patients accepting schedules`}</Text>
            </Box>
          </Flex>

          <Box mt={4}>
            <Flex alignItems="center">
              <FormControl>
                <Input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </FormControl>
              <IconButton
                mx="2"
                disabled={!selectedDate || isLoading}
                isLoading={isLoading}
                onClick={handeleAppoitmentByDate}
                colorScheme="brand"
                aria-label="Call Segun"
                icon={<SearchIcon />}
              />
            </Flex>
            <Text mt={1} fontSize="xs" color="gray.400">
              Search your schedule by date
            </Text>
          </Box>
        </Flex>

        {appointments.map((appointment, index) => {
          const percentage =
            appointment.patientsId.length / appointment.max_patients;
          return (
            <Card boxShadow="lg" key={index} width="100%" height="100px" my={5}>
              <CardBody>
                <Flex justifyContent="space-evenly" alignItems="center">
                  <Flex mx={2}>
                    <Image
                      src="./calendar.png"
                      w="12"
                      objectFit="contain"
                      mr="2"
                    />
                    <Box display="block">
                      <Text as="b">
                        {new Date(appointment.date).toDateString()}
                      </Text>
                      <Text color="gray.500">Acceptance Date</Text>
                    </Box>
                  </Flex>

                  <Flex mx={2}>
                    <Image
                      src="./clock.png"
                      w="12"
                      mr="2"
                      objectFit="contain"
                    />
                    <Box display="block">
                      <Text as="b">
                        {appointment.start_time} - {appointment.end_time}
                      </Text>
                      <Text color="gray.500">Acceptance Time</Text>
                    </Box>
                  </Flex>

                  <Flex mx={2} alignItems="center">
                    <Image w="10" mr="2" src="./sick.png" objectFit="contain" />
                    <Box ml={2} display="block">
                      <Text
                        fontSize="lg"
                        as="b"
                      >{`${appointment.patientsId.length}`}</Text>
                      <Text color="gray.500"> Patients Booked</Text>
                    </Box>
                  </Flex>
                  <Flex mx={2} alignItems="center">
                    <Image
                      w="10"
                      mr="2"
                      src="./checkup.png"
                      objectFit="contain"
                    />
                    <Box ml={2} display="block">
                      <Text
                        fontSize="lg"
                        as="b"
                      >{`${appointment.max_patients}`}</Text>
                      <Text color="gray.500"> Patients Expected</Text>
                    </Box>
                  </Flex>

                  <Button
                    disabled={appointment.patientsId.length > 0}
                    onClick={() => handleOnEdit(appointment)}
                  >
                    Edit
                  </Button>
                </Flex>
              </CardBody>
              <Progress colorScheme="green" size="sm" value={percentage + 30} />
            </Card>
          );
        })}
      </GridItem>
    </Grid>
  );
}

export default AppointmentCard;
