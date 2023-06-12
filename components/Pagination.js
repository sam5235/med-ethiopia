import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const Pagination = ({
  indexOfLastItem,
  indexOfFirstItem,
  dataSize,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const canPreviousPage = indexOfFirstItem > 1;
  const canNextPage = indexOfLastItem < dataSize;
  const maxPage = Math.ceil(dataSize / itemsPerPage);

  const previousPage = () => setCurrentPage((p) => p - 1);

  const nextPage = () => setCurrentPage((p) => p + 1);

  return (
    <Flex justifyContent="space-between" m={4} alignItems="center">
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            onClick={() => setCurrentPage(1)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={8} w={8} />}
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text flexShrink="0" mr={8}>
          Page{" "}
          <Text fontWeight="bold" as="span">
            {currentPage}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {maxPage}
          </Text>
        </Text>
        <Text flexShrink="0">Go to page:</Text>{" "}
        <NumberInput
          ml={2}
          mr={8}
          w={28}
          min={1}
          max={maxPage}
          onChange={(value) => {
            setCurrentPage(value);
          }}
          defaultValue={currentPage}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Select
          w={32}
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={8} w={8} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => setCurrentPage(maxPage)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Pagination;
