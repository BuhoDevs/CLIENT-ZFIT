import {
  Box,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { marginTopDefault, marginTopMobile } from "../../../layouts/contants";

// import { useNavigate } from "react-router-dom";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../components/form/variables";
import BalanceContainer from "./components/BalanceContainer";

export default function SubscriptionView() {
  // Chakra Color Mode
  //   const navigate = useNavigate();
  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor);

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
            {/* <SimpleGrid
                mb="20px"
                columns={{ sm: 1, md: 1 }}
                spacing={{ base: "20px", xl: "20px" }}
              >
                <CheckTable tableData={tableDataCheck} />
              </SimpleGrid> */}
            <BalanceContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
