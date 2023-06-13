import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { filterBlog, getAdBlogs, getBlogs } from "../firebase/blogService";
import Link from "next/link";
import { SearchIcon } from "@chakra-ui/icons";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [timeoutId, setTimeoutId] = useState("");
  const [advertBlogs, setadvertBlogs] = useState([]);
  const popular = posts;

  const searchBlog = () => {
    filterBlog(searchInput).then((blogs) => {
      setSearchedBlogs(blogs);
      setIsLoading(false);
    });
  };

  const handeleBlogByTitle = async ({ target: { value } }) => {
    clearTimeout(timeoutId);
    setSearchInput(value);

    if (value) {
      const id = setTimeout(() => {
        setIsLoading(true);
        searchBlog();
      }, [750]);
      setTimeoutId(id);
    }
    {
      setSearchedBlogs([]);
    }
  };

  useEffect(() => {
    const fetchBlogs = () => {
      setIsLoading(true);
      getBlogs().then((blogs) => {
        setPosts(blogs);
        setIsLoading(false);
      });
    };

    const fetchAdBlogs = () => {
      setIsLoading(true);
      getAdBlogs().then((blogs) => {
        setadvertBlogs(blogs);
        setIsLoading(false);
      });
    };

    fetchBlogs();
    fetchAdBlogs();
  }, []);

  console.log({ advertBlogs });

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      height="calc(100vh - 50px)"
      p={5}
      mt={7}
      gap={3}
    >
      <GridItem colSpan={8}>
        <Flex mb="5">
          <InputGroup zIndex={100}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <AutoComplete openOnFocus emptyState={""}>
              <AutoCompleteInput
                placeholder="Search Blogs..."
                border="1px solid"
                borderColor="brand.500"
                pl={9}
                value={searchInput}
                onChange={handeleBlogByTitle}
                variant="filled"
              />
              <AutoCompleteList>
                {searchedBlogs.map((blog, cid) => (
                  <AutoCompleteItem
                    key={`option-${cid}`}
                    value={blog.title}
                    textTransform="capitalize"
                  >
                    <Link
                      href={{
                        pathname: "/blog-detail",
                        query: blog,
                      }}
                    >
                      <Flex>
                        <Image
                          alt=""
                          borderRadius="sm"
                          width={55}
                          src={blog.coverImage}
                        />

                        <Box ml={2}>
                          <Text fontSize="sm" as="b">
                            {blog.title}
                          </Text>
                          <Text fontSize="xs" as="i" noOfLines="1">
                            {blog.description}
                          </Text>
                        </Box>
                      </Flex>
                    </Link>
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

        {posts.map((blog, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: "/blog-detail",
                query: blog,
              }}
            >
              <Box mb={10} pt={3}>
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
          {/* <Button colorScheme="brand" boxShadow="dark-lg">
            More
          </Button> */}
        </Center>
      </GridItem>
      <GridItem colSpan={4}>
        <Box position="sticky" top="80px" p={3} maxH="300px">
          <Text mb={5} fontSize="xl" as="b">
            Advert Blogs
          </Text>
          <div style={{ borderBottom: "1px solid black" }}></div>
          {advertBlogs.map((pop, index) => {
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
