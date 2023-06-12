import { useState } from "react";
import {
  Badge,
  Box,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";

import RecordTable from "../components/RecordTable";

const RecordsPage = () => {
  const [metadata, setMetadata] = useState();

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      height="calc(100vh - 100px)"
      p={5}
      mt={10}
      gap={3}
    >
      <GridItem colSpan={12} maxW="6xl" mx="auto">
        <RecordTable setMetadata={setMetadata} />
      </GridItem>

      <Modal
        size="xl"
        isOpen={metadata !== undefined}
        onClose={() => {
          setMetadata();
        }}
      >
        <ModalOverlay backdropFilter="blur(10px)" bg="transparent" />
        <ModalContent>
          <ModalHeader>Medical Record Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {metadata && (
              <Box>
                <Box mb={4}>
                  <label>Doctor</label>
                  <Input disabled mt={2} value={metadata.doctor || ""} />
                  <Text mt={1} fontSize="xs" color="gray.400">
                    Who treated you
                  </Text>
                </Box>

                <Box mt={2} mb={4}>
                  <label>Description</label>
                  <Textarea disabled mt={2} value={metadata.desc || ""} />
                  <Text mt={1} fontSize="xs" color="gray.400">
                    Description about the diagnosis
                  </Text>
                </Box>

                <Box mt={2} mb={4}>
                  <label>Diseases</label>
                  <Box mt={2}>
                    {metadata.diseases.map((name, key) => (
                      <Badge key={key} colorScheme="blue" fontSize="0.7em">
                        {name}
                      </Badge>
                    ))}
                  </Box>
                  <Text mt={1} fontSize="xs" color="gray.400">
                    Deaseas Diagnosed
                  </Text>
                </Box>

                <Box mt={2} mb={4}>
                  <label>Perscription</label>
                  <Textarea disabled mt={2} value={metadata.persc || ""} />
                  <Text mt={1} fontSize="xs" color="gray.400">
                    Detail explanation of Perscription
                  </Text>
                </Box>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default RecordsPage;
