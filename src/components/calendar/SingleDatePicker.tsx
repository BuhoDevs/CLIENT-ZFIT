import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { format, parse } from "date-fns";
import * as idioma from "date-fns/locale";
import { useRef } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { IoClose } from "react-icons/io5";
import { darkBrandBgColor, lightBrandBgColor } from "../form/variables";

interface Props {
  setDate: (date: string) => void;
  date?: string;
  name?: string;
  isMaxDateRequired?: boolean;
  isDisabled?: boolean;
}
const DatePicker = ({
  setDate,
  date,
  name,
  isMaxDateRequired = false,
  isDisabled = false,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColorDefault = useColorModeValue("blackAlpha", "white");
  const placeHolderTextColor = useColorModeValue("gray.400", "gray.500");
  const inputFocusBorderColor = useColorModeValue(
    lightBrandBgColor,
    darkBrandBgColor
  );

  const initialRef = useRef(null);
  const calendarRef = useRef(null);

  const handleSetDate = (d: Date) => {
    setDate(format(d, "yyyy-MM-dd"));
    onClose();
  };

  useOutsideClick({
    ref: calendarRef,
    handler: onClose,
    enabled: isOpen,
  });

  const maxDate = isMaxDateRequired ? new Date() : undefined;
  const textColor = date ? textColorDefault : placeHolderTextColor;
  return (
    <Box>
      <Popover
        placement="bottom"
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        isLazy
      >
        <PopoverTrigger>
          <Box onClick={onOpen} ref={initialRef}>
            <InputGroup>
              <Input
                isDisabled={isDisabled}
                name={name}
                color={textColor}
                focusBorderColor={inputFocusBorderColor}
                shadow="0.875rem"
                borderRadius={8}
                fontSize="0.875rem"
                maxH="2.625rem"
                w="full"
                value={
                  date
                    ? format(
                        parse(date, "yyyy-MM-dd", new Date()),
                        "dd/MM/yyyy"
                      )
                    : "Seleccionar fecha"
                }
                onChange={() => {}}
              />
              {date && (
                <InputRightElement
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDate("");
                  }}
                >
                  <Icon as={IoClose} />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            p={0}
            w="min-content"
            border="none"
            outline="none"
            _focus={{ boxShadow: "none" }}
            ref={calendarRef}
          >
            <Calendar
              locale={idioma.es}
              onChange={handleSetDate}
              direction="vertical"
              maxDate={maxDate}
            />
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};

export default DatePicker;
