import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  Text,
  Icon,
  GridItem,
  Grid,
  Center,
  Button,
} from "@chakra-ui/react";
import { MdInsertChart } from "react-icons/md";
import datas from "../mocks/diseases.json";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import { useCSVDownloader } from "react-papaparse";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts";

import { getRecords } from "../firebase/analyticsService";

const COLORS = [
  "#6495ED",
  "#FFBF00",
  "#FF8042",
  "#FF5733",
  "#DE3163",
  "#CCCCFF",
  "#40E0D0",
  "#9FE2BF",
];

const options = datas.map((data) => ({ label: data, value: data }));

const AnalyticsPage = () => {
  const { CSVDownloader, Type } = useCSVDownloader();
  const [chart, setChart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2023-06-13");
  const [diseases, setDiseases] = useState([
    { value: "Anaplasmosis", label: "Anaplasmosis" },
    { value: "Anthrax", label: "Anthrax" },
  ]);
  const [areaGraphDiseases, setAreaGraphDiseases] = useState([
    "Anaplasmosis",
    "Anthrax",
  ]);

  const fetchNewChnages = async () => {
    setIsLoading(true);
    const diseasesToFetch = diseases.map((d) => d.value);
    await getRecords(diseasesToFetch, startDate, endDate).then((data) => {
      setIsLoading(false);
      setAreaGraphDiseases(diseasesToFetch);
      setChart(data);
    });
  };

  useEffect(() => {
    const fetchRecord = async () => {
      setIsLoading(true);
      await getRecords(
        ["Anaplasmosis", "Anthrax"],
        "2022-01-01",
        "2023-06-13"
      ).then((data) => {
        setIsLoading(false);
        setChart(data);
      });
    };

    fetchRecord();
  }, []);

  return (
    <Box mt={10}>
      <Flex mt={10} justify="space-between" alignItems="center">
        <Flex alignItems="center">
          <Icon fontSize="6xl" as={MdInsertChart} color="brand.500" />
          <Box>
            <Text fontSize="xl">Analytics</Text>
            <Text
              fontSize="xs"
              color="gray.500"
            >{`Utlized the centrilized system`}</Text>
          </Box>
        </Flex>

        <Box mt={4}>
          <Flex my={2}>
            <FormControl mx={2} w={500}>
              <Select
                options={options}
                value={diseases}
                isMulti
                placeholder="Select Deasease..."
                onChange={(e) => {
                  setDiseases(e);
                }}
              />
            </FormControl>
            <CSVDownloader
              type={Type.Button}
              filename={"med-ethiopia-export"}
              bom={true}
              config={{
                delimiter: ";",
              }}
              data={chart.area_data}
            >
              <Button isDisabled={isLoading} colorScheme="brand">
                Export
              </Button>
            </CSVDownloader>
          </Flex>
          <Flex alignItems="center">
            <FormControl mr="2">
              <Input
                type="date"
                id="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                type="date"
                id="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>
            <IconButton
              ml="2"
              disabled={diseases.length === 0 || isLoading}
              isLoading={isLoading}
              onClick={fetchNewChnages}
              colorScheme="brand"
              aria-label="Call Segun"
              icon={<SearchIcon />}
            />
          </Flex>
        </Box>
      </Flex>

      <Grid templateColumns="60% 40%">
        <GridItem mt={10} h={500}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={chart.area_data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Legend />
              <Tooltip />
              {areaGraphDiseases.map((des, key) => {
                return (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={des}
                    stackId="1"
                    stroke={COLORS[key % 8]}
                    fill={COLORS[key % 8]}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </GridItem>

        <GridItem mt={10} h={500}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={chart.area_data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {areaGraphDiseases.map((des, key) => {
                return (
                  <Bar
                    key={key}
                    dataKey={des}
                    stroke={COLORS[key % 8]}
                    fill={COLORS[key % 8]}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </GridItem>
      </Grid>

      <Center mt={5}>
        <ResponsiveContainer width={700} height={500}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <Legend />
            <XAxis type="number" dataKey="height" name="height" unit="cm" />
            <YAxis type="number" dataKey="weight" name="weight" unit="kg" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            {chart.scatered_data &&
              Object.keys(chart.scatered_data).map((diseases, key) => {
                return (
                  <Scatter
                    key={key}
                    name={diseases}
                    data={chart.scatered_data[diseases]}
                    fill={COLORS[key % 8]}
                  />
                );
              })}
          </ScatterChart>
        </ResponsiveContainer>
      </Center>
    </Box>
  );
};

export default AnalyticsPage;
