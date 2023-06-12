import {
  Flex,
  Box,
  Image,
  Button,
  Container,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useColorMode,
  Avatar,
  Text,
  useColorModeValue,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { getMyProfileData } from "../firebase/profileServices";

const Links = [
  { name: "Analytics", href: "/analytics" },
  { name: "Appointment", href: "/appointment" },
  { name: "Blog", href: "/blogs" },
  { name: "Records", href: "/records", authorized: true },
];

const Navbar = () => {
  const router = useRouter();
  const bg = useColorModeValue("gray.200", "gray.700");
  const { pathname } = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchMyData = () => {
      getMyProfileData().then((data) => {
        setUserData(data);
        console.log(data);
      });
    };

    fetchMyData();
  }, [user]);

  return (
    <Box
      boxShadow="sm"
      bg={useColorModeValue("whiteAlpha.50", "blackAplha.800")}
      backdropFilter="saturate(180%) blur(4px)"
      position="fixed"
      width="100%"
      zIndex={2}
      py={1}
    >
      <Container maxW="7xl">
        <Flex h={12} justifyContent="space-between" alignItems="center" px={3}>
          <Link href="/">
            <Flex>
              <Image alt="logo" src="./logo-teal.png" width="40px" />
              <Box ml={2}>
                <Text fontSize="1xl" as="b" textTransform="uppercase">
                  Meditopia
                </Text>
                <Text fontSize="xs">Navigating Healthcare Together</Text>
              </Box>
            </Flex>
          </Link>
          <Flex alignItems="center" gap={4}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => {
                if (link.authorized && !user) {
                  return null;
                }

                return (
                  <Link key={link.name} href={link.href}>
                    <Button
                      px={2}
                      py={1}
                      mx={0}
                      variant="ghost"
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        bg,
                      }}
                    >
                      {link.name}
                    </Button>
                  </Link>
                );
              })}
            </HStack>
            <IconButton
              color="brand.600"
              onClick={toggleColorMode}
              cursor="pointer"
              mx="2"
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
            {user ? (
              <Menu>
                <MenuButton>
                  <Avatar size={"sm"} name={userData.name} />
                </MenuButton>

                <MenuList
                  display="flex"
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <MenuItem
                    onClick={() => router.push("/settings")}
                    icon={<IoMdSettings />}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem icon={<IoMdLogOut />} onClick={logout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              pathname.toLowerCase() !== "/login" &&
              pathname.toLowerCase() !== "/signup" && (
                <Button
                  onClick={() => router.replace("/login")}
                  borderRadius="3xl"
                  variant="outline"
                  colorScheme="brand"
                >
                  Sign Up
                </Button>
              )
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
