import {
  Flex,
  Image,
  Input,
  Box,
  Button,
  Text,
  useToast,
  useColorModeValue,
  Stack,
  GridItem,
  FormControl,
  FormLabel,
  Grid,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { signUpwithEmailandPass } from "../firebase/profileServices";
// import SEOTags from "../components/SEOTags";

const Login = () => {
  const { login, user } = useAuth();
  const router = useRouter();
  const bg = useColorModeValue("white", "blackAplha.600");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const cardbg = useColorModeValue("white", "gray.700");
  //   const showToast = () => {
  //     toast({
  //       title: "Invalid Credential",
  //       description: "Please make sure you entred correct info!",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   };

  const handleOnSignup = () => {
    const profile = {
      name,
      address,
      age,
      sex,
      weight,
      height,
      email,
      password,
      phone,
    };
    setIsLoading(true);
    signUpwithEmailandPass(profile).then(() => {
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

  const isInvalid =
    !name ||
    !email ||
    !password ||
    !age ||
    !height ||
    !sex ||
    !phone ||
    !address ||
    !weight;

  if (user) {
    router.replace("/");
    return null;
  }
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {/* <SEOTags title="Create Med-Ethiopia Account" /> */}
      <Flex gap="20" justifyContent="center" alignItems="center">
        <Flex>
          <Image alt="main image" src="./landing.svg" width="300px" />
        </Flex>
        <Flex
          spacing={4}
          w={"full"}
          maxW={"md"}
          rounded={"xl"}
          boxShadow={"lg"}
          bg={cardbg}
          p={6}
          my={12}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            boxShadow="2xl"
            rounded="full"
            p={5}
            mb={2}
            width="fit-content"
            bg={bg}
          >
            <Image alt="log" src="logo-teal.png" width={75} />
          </Box>
          <Text
            fontSize="xl"
            as="b"
            color="brand.400"
            textTransform="uppercase"
            mb={5}
          >
            Meditopia
          </Text>
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
            />
          </FormControl>
          <FormControl mb={1} isRequired>
            <FormLabel fontSize="sm">Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
          </FormControl>
          <FormControl mb={1} isRequired>
            <FormLabel fontSize="sm">Phone</FormLabel>
            <Input
              value={phone}
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

          <Button
            mt={5}
            onClick={handleOnSignup}
            isLoading={isLoading}
            // isDisabled={isLoading || isInvalid}
            colorScheme="brand"
            boxShadow="2xl"
          >
            Signup
          </Button>
          <Flex mt={10} alignItems="center">
            <Text>{"Have an account? "}</Text>
            <Link href="/login">
              <Text ml="1" color="brand.600">
                Login
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
