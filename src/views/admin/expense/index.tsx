import {
  Box,
  Button,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { marginTopDefault, marginTopMobile } from "../../../layouts/contants";

import { useRef } from "react";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../components/form/variables";
import ExpenseContainer from "./components/ExpenseContainer";
import { BiMoneyWithdraw } from "react-icons/bi";
import NewExpenseModal from "./components/NewExpenseModal";

export default function SubscriptionView() {
  // Chakra Color Mode
  //   const navigate = useNavigate();
  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  return (
    <Box pt={{ base: marginTopMobile, md: "80px", xl: marginTopDefault }}>
      <Tabs position="relative" variant="unstyled">
        <Flex
          flexWrap="wrap-reverse"
          justifyContent={{ sm: "start", md: "space-between" }}
          pr={{ base: "0", md: "1rem" }}
          gap={3}
        >
          <TabList display="flex" flexWrap="nowrap" overflowX="auto" pl="1rem">
            <Tab>Búsqueda</Tab>
          </TabList>

          <Button
            colorScheme="brandScheme"
            width={{ base: "full", md: "160px" }}
            leftIcon={<BiMoneyWithdraw />}
            borderRadius="10px"
            variant="outline"
            onClick={onOpen}
            fontSize="sm"
          >
            Nuevo gasto
          </Button>
        </Flex>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="teal.300"
          borderRadius="1px"
          pl="1rem"
          bgColor={bgTabIndicator}
        />

        <TabPanels>
          <TabPanel>
            <ExpenseContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <NewExpenseModal
        initialRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}
