import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getBlogs } from "../firebase/blogService";
import Link from "next/link";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const popular = posts;
  const fetchBlogs = async () => {
    const blogs = await getBlogs();
    setPosts(blogs);
    console.log(blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      height="calc(100vh - 50px)"
      p={5}
      mt={7}
      gap={3}
    >
      <GridItem colSpan={8}>
        {posts.map((blog, index) => {
          return (
            <Link
            key={index}
              href={{
                pathname: "/blog-detail",
                query: blog,
              }}
            >
              <Box mb={10} pt={3} >
                <Grid templateColumns="repeat(10, 1fr)">
                  <GridItem width="160px" height="130px" colSpan={2}>
                    <Image
                      alt=""
                      borderRadius="2xl"
                      boxSize="100%"
                      objectFit="cover"
                      src={blog.coverImage}
                    />
                  </GridItem>
                  <GridItem ml={4} colSpan={8}>
                    <Box mb={2}>
                      <Heading fontSize="xl" as="b">
                        {blog.title}
                      </Heading>
                    </Box>
                    <Box>
                      <Text fontSize="md" as="i" noOfLines="2">
                        {blog.description}
                      </Text>
                    </Box>
                    <Flex mt={2}>
                      <Avatar name={blog.name} />
                      <Box ml={2}>
                        <Text as="b">{blog.name}</Text>
                        <Flex mt={2}>
                          <Text as="sub" mr={2}>
                            {new Date(blog.datePublished)
                              .toString()
                              .slice(4, 15)}
                          </Text>
                          <Text as="sub">{blog.length.text}</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>
              </Box>
            </Link>
          );
        })}
        <Center p={4}>
          <Button colorScheme="brand" boxShadow="dark-lg">
            More
          </Button>
        </Center>
      </GridItem>
      <GridItem colSpan={4}>
        <Box position="sticky" top="80px" p={3} maxH="300px">
          <Text mb={5} fontSize="xl" as="b">
            POPULAR THIS WEEK
          </Text>
          <div style={{ borderBottom: "1px solid black" }}></div>
          {popular.map((pop, index) => {
            if (index < 5)
              return (
                <Flex mt={7}>
                  <Text mr={2} as="bold" fontSize="xl" color="gray.500">
                    0{index + 1}
                  </Text>
                  <Box>
                    <Flex>
                      <Image
                        borderRadius="md"
                        objectFit="cover"
                        width="40px"
                        height="40px"
                        alt=""
                        src={pop.coverImage}
                      />
                      <Box>
                        <Text ml={2} fontSize="xl" as="b" noOfLines={1}>
                          {pop.title}
                        </Text>
                      </Box>
                    </Flex>
                    <Text fontSize="sm" noOfLines={2}>
                      {pop.description}
                    </Text>
                    <Text as="sub">{pop.length.text}</Text>
                  </Box>
                </Flex>
              );
          })}
        </Box>
      </GridItem>
    </Grid>
  );
}
