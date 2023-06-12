import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  GridItem,
  Grid,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyProfileData, updateProfile } from "../firebase/profileServices";

export default function UserProfileEdit() {
  const { user } = useAuth();
  const toast = useToast();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnUpdate = () => {
    const profile = {
      name,
      address,
      age,
      sex,
      weight,
      height,
    };
    setIsLoading(true);
    updateProfile(profile).then(() => {
      toast({
        title: "Operation Success!",
        description: "Profile Updated Successfuly",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const fetchMyData = () => {
      setIsLoading(true);
      getMyProfileData().then((data) => {
        setName(data.name);
        setEmail(data.email);
        setAddress(data.address);
        setPhone(data.phone);
        setAge(data.age);
        setHeight(data.height);
        setSex(data.sex);
        setWeight(data.weight);
        setIsLoading(false);
      });
    };

    if (user !== null) {
      fetchMyData();
    }
  }, [user]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Center>
            <Avatar size="xl" name={name} />
          </Center>
        </FormControl>
        <FormControl mb={1} isRequired>
          <FormLabel fontSize="sm">Full Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
          />
        </FormControl>

        <FormControl mb={1} isRequired>
          <FormLabel fontSize="sm">Email</FormLabel>
          <Input
            value={email}
            isDisabled
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
          />
        </FormControl>

        <FormControl mb={1} isRequired>
          <FormLabel fontSize="sm">Phone</FormLabel>
          <Input
            value={phone}
            isDisabled
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="number"
          />
        </FormControl>

        <FormControl mb={1} isRequired>
          <FormLabel fontSize="sm">Address</FormLabel>
          <Input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
          />
        </FormControl>

        <Grid templateColumns="repeat(8, 1fr)" gap={4} mb={1}>
          <GridItem colSpan={4}>
            <FormControl mb={1} isRequired>
              <FormLabel fontSize="sm">Age</FormLabel>
              <Input
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                type="number"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl mb={1} isRequired>
              <FormLabel fontSize="sm">Sex</FormLabel>
              <Select
                value={sex}
                onChange={(e) => {
                  setSex(e.target.value);
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl mb={1} isRequired>
              <FormLabel fontSize="sm">Height(cm)</FormLabel>
              <Input
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
                type="number"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl mb={1} isRequired>
              <FormLabel fontSize="sm">Weight(kg)</FormLabel>
              <Input
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                type="number"
              />
            </FormControl>
          </GridItem>
        </Grid>

        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            isDisabled={isLoading}
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            w="full"
            isDisabled={isLoading}
            isLoading={isLoading}
            onClick={handleOnUpdate}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
