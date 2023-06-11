import { Flex, Image, Input, Box, Button, Text, useToast, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {useRouter} from "next/router";

const Login = () => {
  console.log("entered")
  const {login, user} = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const toast = useToast();
  const showToast = ()=>{
    toast({
      title: "Invalid Credential",
      description: "Please make sure you entred correct info!",
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }

  const handleLogin = () =>{
         setIsLoginLoading(true);
         login(email, password).then(() =>{
          setIsLoginLoading(false);
         }) 
         .catch(() => {
          showToast();
          setIsLoginLoading(false);
         })
    

  }

  if(user){
    router.replace("/");
    return null;
  }
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex justifyContent="center" alignItems="center">
        <Flex>
          <Image src="Health professional team-bro.svg" width="100%" />
        </Flex>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Box
            boxShadow="2xl"
            rounded="full"
            p={5}
            mb={2}
            width="fit-content"
            bg= {useColorModeValue("white", "gray.400")}  
                    >
            <Image src="logo-teal.png" width={75} />
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
          
          <Input
            type="email"
            placeholder="Enter your email"
            mb={6}
            width={300}
            bg= {useColorModeValue("white", "gray.400")}  
            boxShadow="xl"
            onChange={(e)=> setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            mb={6}
            width={300}
            bg= {useColorModeValue("white", "gray.400")}  
            boxShadow="xl"
            onChange={(e)=> setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}
          isLoading={isLoginLoading}
          disabled={isLoginLoading}
          colorScheme="brand" boxShadow="2xl">
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
