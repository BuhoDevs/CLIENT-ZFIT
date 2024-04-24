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
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../../components/form/variables";
import {
  marginTopDefault,
  marginTopMobile,
} from "../../../../layouts/contants";
import NewsubscriptionContainer from "./NewsubscriptionContainer";
import { useClientById } from "../../../../hooks/client";

const NewSubscription = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor);
  const { data: clientData } = useClientById({
    clientId: Number(clientId),
    isReadyTofetch: !!clientId,
  });

  return (
    <Box pt={{ base: marginTopMobile, md: "80px", xl: marginTopDefault }}>
      <Box px="1rem">
        <Flex alignItems="center" justifyContent="space-between">
          <Button
            borderRadius="none"
            borderBottom="1px solid transparent"
            fontSize="sm"
            fontWeight={400}
            variant="unstyled"
            onClick={() => navigate(-1)}
            _hover={{
              borderBottom: "1px solid gray",
            }}
          >
            👈🏻 Volver
          </Button>
        </Flex>
        <Box borderRadius={8} mt={1}>
          <Tabs variant="unstyled" isLazy>
            <TabList>
              <Tab>Nueva subscripción</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="teal.300"
              borderRadius="1px"
              pl="1rem"
              bgColor={bgTabIndicator}
            />
            <TabPanels>
              <TabPanel p={0}>
                <NewsubscriptionContainer clientsData={clientData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default NewSubscription;
