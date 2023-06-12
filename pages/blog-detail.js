import React from "react";
import { useRouter } from "next/router";

import TinyEditor from "../components/Tinycma";
import { Box } from "@chakra-ui/react";
const blogDetail = () => {
  const router = useRouter();
  const blog = router.query;
  console.log(blog);
  return (
    <Box pt={10}>
      <TinyEditor blog={blog} />
    </Box>
  );
};

export default blogDetail;
