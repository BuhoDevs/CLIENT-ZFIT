import { Box, Tab, TabList, Flex, Tabs, TabPanels, TabPanel, TabIndicator, useColorModeValue } from '@chakra-ui/react';
import { marginTopDefault, marginTopMobile } from "../../../layouts/contants";
import { darkBrandBgColor, lightBrandBgColor } from '../../../components/form/variables';
import TabsGenero from './components/TabsGenero';
// import RolesComponent from './components/TabsGenero';
import SubscriptionFormComponent from './components/TabsTypeSubs';

export default function Config() {

  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor)

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
            <Tab>Generos</Tab>
            <Tab>Tipos de Suscripciones</Tab>
            <Tab>Roles</Tab>

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
            <TabsGenero />
          </TabPanel>
          <TabPanel>
            <SubscriptionFormComponent />
          </TabPanel>
        </TabPanels>
        <h1>Roles</h1>

      </Tabs>
    </Box>
  )
}
