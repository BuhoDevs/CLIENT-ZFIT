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
import { useGetSubscriptionsById } from "../../../../hooks/subscriptions";
import SubscriptionsEditionContainer from "./SubscriptionsEditionContainer";
import { useEffect, useState } from "react";
import { IFormSuscriptionData } from "../../../../types/suscription";
import moment from "moment";

const SubscriptionEdition = () => {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor);
  const [subscriptionInfo, setSubscriptionInfo] =
    useState<IFormSuscriptionData>();
  const { data: subscriptionData } = useGetSubscriptionsById({
    id: Number(subscriptionId),
    isReadyToFetch: Boolean(subscriptionId),
  });

  useEffect(() => {
    if (subscriptionData) {
      setSubscriptionInfo({
        dateIn: moment
          .utc(subscriptionData.dateIn)
          .locale("es")
          .format("yyyy-MM-DD"),
        dateOut: moment
          .utc(subscriptionData.dateOut)
          .locale("es")
          .format("yyyy-MM-DD"),
        outstanding: subscriptionData.Payment[0].outstanding,
        totalAmmount: subscriptionData.Payment[0].totalAmmount,
        transactionAmmount: subscriptionData.Payment[0].transactionAmmount,
        subscriptionType: subscriptionData.SubsType,
        discipline: subscriptionData.Discipline,
      });
    }
  }, [subscriptionData]);

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
              <Tab>Editar suscripción</Tab>
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
                <SubscriptionsEditionContainer
                  clientData={
                    {
                      ...subscriptionData?.Client.Person,
                      email: subscriptionData?.Client.email,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                  subscriptionInfo={subscriptionInfo}
                  subscriptionId={subscriptionId}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionEdition;
