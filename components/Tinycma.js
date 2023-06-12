import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from 'next/router'


const BlogEditor = ({ theme, editorRef, content }) => {
  return (
    <Editor
      tinymceScriptSrc={"/tinymce/js/tinymce/tinymce.min.js"}
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={content}
      disabled
      init={{
        selector: "div",
        menubar: false,
        toolbar: false,
        skin: theme === "dark" ? "oxide-dark" : "oxide",
        content_css: theme === "dark" ? "dark" : "default",
        height: "100vh",
      }}
    />
  );
};

const TinyEditor = ({ blog }) => {

  const { colorMode } = useColorMode();
  const editorRef = useRef(null);

  const content = blog.content;

  

  if (colorMode === "light") {
    return (
      <BlogEditor
        key={"light-editor"}
        theme="light"
        content={content}
        editorRef={editorRef}
      />
    );
  }

  return (
    <BlogEditor
      key={"dark-editor"}
      theme="dark"
      content={content}
      editorRef={editorRef}
    />
  );
};

export default TinyEditor;
