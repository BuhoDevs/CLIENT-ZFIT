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

import {
  darkBgForm,
  darkBrandBgColor,
  lightBgForm,
  lightBrandBgColor,
} from "../../../components/form/variables";
import banner from "../../../assets/img/auth/banner.png";
import avatar from "../../../assets/img/avatars/avatar4.png";
import CheckinCard from "./manual/Checkincard";

export default function SubscriptionView() {
  // Chakra Color Mode
  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor);
  const bgContainer = useColorModeValue(lightBgForm, darkBgForm);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const initialRef = useRef<HTMLInputElement>(null);

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
            <Tab>Asistencia manual</Tab>
          </TabList>

          {/* <Button
            colorScheme="brandScheme"
            width={{ base: "full", md: "160px" }}
            leftIcon={<FaAddressCard />}
            borderRadius="10px"
            variant="outline"
            onClick={onOpen}
            fontSize="sm"
          >
            Nueva Suscripción
          </Button> */}
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
            <Box p={1} bg={bgContainer} borderRadius={8}>
              <CheckinCard
                gridArea="1 / 1 / 2 / 2"
                banner={banner}
                avatar={avatar}
                name="Adela Parkson"
                job="Product Designer"
                posts="Maquina"
                followers="Funcional"
                following="Zumba"
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <SubscriptionModal
        initialRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
    </Box>
  );
}
