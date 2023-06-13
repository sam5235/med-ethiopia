import React from "react";
import { useRouter } from "next/router";

import TinyEditor from "../components/Tinycma";
import { Box } from "@chakra-ui/react";

const BlogDetail = () => {
  const router = useRouter();
  const blog = router.query;

  return (
    <Box pt={10}>
      <TinyEditor blog={blog} />
    </Box>
  );
};

export default BlogDetail;
