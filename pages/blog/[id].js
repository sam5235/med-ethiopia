import React, { useState } from "react";

const SingleBlog = ({ blog, setBlog }) => {
  const [blog, setBlog] = useState({
    content: "heloooooooooooooooooooooooooooooooooooooooooooooooo",
  });
  return (
    <div>
      <TinyEditor blog={blog} setBlog={setBlog} />
    </div>
  );
};

export default SingleBlog;
