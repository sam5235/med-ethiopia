import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiArticleLine, RiSearch2Line } from "react-icons/ri";
import { MdOutlineArticle } from "react-icons/md";
import Pagination from "./Pagination";
import { getRecords, getRecordsByDate } from "../firebase/recordServices";

const pad = (num) => (num < 10 ? `0${num}` : `${num}`);

const getDateStr = (date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

const RecordTable = ({ setMetadata }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(getDateStr(new Date()));

  const handeleRecordByDate = () => {
    setIsLoading(true);
    getRecordsByDate(selectedDate).then((recs) => {
      setRecords(recs);
      setIsLoading(false);
    });
  };

  const fetchRecords = () => {
    setLoading(true);
    getRecords().then((recs) => {
      setRecords(recs);
      setLoading(false);
    });
  };

  const filteredRecords = records.filter(
    (record) =>
      query === "" ||
      record.hospital.toLowerCase().includes(query.toLowerCase()) ||
      record.doctor.toLowerCase().includes(query.toLowerCase()) ||
      record.persc.toLowerCase().includes(query.toLowerCase())
  );

  const dataSize = filteredRecords.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderBottomColor="gray.100"
        pb={2}
        mb={4}
        borderBottom="1px solid lightgray"
      >
        <Flex alignItems="center">
          <Icon
            w={50}
            h={50}
            fontSize="6xl"
            as={RiArticleLine}
            color="blue.500"
          />
          <Box>
            <Text fontSize="xl">My Medical Recrods</Text>
            <Text
              fontSize="xs"
              color="gray.500"
            >{`Meditopia medical records`}</Text>
          </Box>
        </Flex>

        <Flex alignItems="center">
          <Input
            placeholder="Search..."
            colorScheme="brand"
            bg={useColorModeValue("white", "gray.900")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rounded="3xl"
          />
          <FormControl>
            <Input
              type="date"
              id="date"
              bg={useColorModeValue("white", "gray.900")}
              rounded="3xl"
              ml={2}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </FormControl>
          <Button
            onClick={handeleRecordByDate}
            variant="solid"
            mx={4}
            isLoading={isLoading}
            colorScheme="brand"
            rounded="3xl"
            p="2"
          >
            <Icon as={RiSearch2Line} fontSize="xl" color="white" />
          </Button>
        </Flex>
      </Flex>

      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Hospital</Th>
              <Th>When</Th>
              <Th>Doctor</Th>
              <Th>Diseases</Th>
              <Th textAlign="center">More Detial</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentRecords.map((record, key) => (
              <Tr key={key}>
                <Td>
                  <Box ml={2} maxW="250px">
                    <Text isTruncated>{record.hospital}</Text>
                    <Text fontSize="x-small" color="gray.500" isTruncated>
                      {record.hospitalAddress}
                    </Text>
                  </Box>
                </Td>
                <Td isNumeric>
                  <Text fontSize="sm">
                    {record.createdAt.toDate().toDateString()}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text fontSize="sm">{record.doctor}</Text>
                </Td>
                <Td>
                  <Stack maxW="150px" direction="row">
                    {record.diseases.map((category, key) => (
                      <Badge key={key} colorScheme="blue" fontSize="0.7em">
                        {category}
                      </Badge>
                    ))}
                  </Stack>
                </Td>

                <Td>
                  <Flex justify="center">
                    <Button
                      variant="solid"
                      colorScheme="brand"
                      rounded="3xl"
                      onClick={() => setMetadata(record)}
                      p="2"
                      ml={2}
                    >
                      <MdOutlineArticle />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {!loading && (
        <Pagination
          items={filteredRecords}
          dataSize={dataSize}
          indexOfLastItem={indexOfLastItem}
          indexOfFirstItem={indexOfFirstItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}

      {loading && (
        <Flex w="100%" justifyContent="center" my={5}>
          <Spinner color="blue.400" size="lg" />
        </Flex>
      )}
    </Box>
  );
};

export default RecordTable;
