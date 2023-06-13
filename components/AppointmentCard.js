import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
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
import { useAuth } from "../context/AuthContext";
import {
  addOrRemoveAppointment,
  getBookedAppointment,
} from "../firebase/appointmentService";

const pad = (num) => (num < 10 ? `0${num}` : `${num}`);

const getDateStr = (date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

function AppointmentCard({ appointments, setAppointments }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(getDateStr(new Date()));

  const handeleAppoitmentByDate = () => {
    setIsLoading(true);
    getAppointmentByDate(selectedDate).then((appts) => {
      setAppointments(appts);
      setIsLoading(false);
    });
  };

  const handleCancel = (appt) => {
    setIsLoading(true);
    if (appt.patientsId.includes(user.uid)) {
      appt.patientsId = appt.patientsId.filter((id) => id !== user.uid);
    } else {
      appt.patientsId.push(user.uid);
    }
    addOrRemoveAppointment(appt).then(() => {
      setAppointments((appts) =>
        appts.filter((_appt) => {
          return appt.id !== _appt.id;
        })
      );
      setIsLoading(false);
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const fetchBookedAppointments = () => {
      setIsLoading(true);

      if (user) {
        getBookedAppointment().then((appts) => {
          setAppointments(appts);
          setIsLoading(false);
        });
      }
    };
    fetchBookedAppointments();
  }, [setAppointments, user]);

  return (
    <Grid templateColumns="70% 30%">
      <GridItem mb={20}>
        <Flex mt={20} justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <Icon fontSize="6xl" as={CiCalendarDate} color="blue.500" />
            <Box>
              <Text fontSize="xl">Schedules</Text>
              <Text fontSize="xs" color="gray.500">{`My Appointments`}</Text>
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
          return (
            <Card boxShadow="lg" key={index} width="100%" my={5}>
              <CardBody>
                <Flex justifyContent="space-between" alignItems="center">
                  <>
                    <Flex>
                      <Image
                        src="/calendar.png"
                        w="10"
                        objectFit="contain"
                        alt=""
                        mr="2"
                      />
                      <Box display="block">
                        <Text as="b">
                          {new Date(appointment.date).toDateString()}
                        </Text>
                        <Text color="gray.500">Appointment Date</Text>
                      </Box>
                    </Flex>

                    <Flex>
                      <Image
                        src="/clock.png"
                        w="10"
                        mr="2"
                        alt=""
                        objectFit="contain"
                      />
                      <Box display="block">
                        <Text as="b">
                          {appointment.start_time} - {appointment.end_time}
                        </Text>
                        <Text color="gray.500">Appointment Time</Text>
                      </Box>
                    </Flex>

                    <Flex>
                      <Image
                        src="/hospital.png"
                        w="10"
                        mr="2"
                        alt=""
                        objectFit="contain"
                      />
                      <Box display="block">
                        <Text as="b">{appointment.hospital}</Text>
                        <Text color="gray.500">Appointment Place</Text>
                      </Box>
                    </Flex>
                  </>

                  <Button
                    disabled={appointment.patientsId.length > 0}
                    onClick={() => handleCancel(appointment)}
                  >
                    Cancel
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          );
        })}
      </GridItem>
    </Grid>
  );
}

export default AppointmentCard;
