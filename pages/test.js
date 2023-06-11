import React, { useState } from "react";
import AppointmentBooking from "../components/modal/AppointmentBooking";
import { Box } from "@chakra-ui/react";
import TinyEditor from "../components/modal/Tinycma";
import SimpleCalendar from "../components/common/Calendar";
function test() {
 

  return (
    <Box p={5} mt={7}>
      <SimpleCalendar />
      <AppointmentBooking />
      <Box minH="50vh">
        <TinyEditor blog={blog} setBlog={setBlog} />
      </Box>
    </Box>
  );
}

export default test;
