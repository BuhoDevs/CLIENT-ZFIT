// Chakra imports
import {
  Avatar,
  Flex,
  HStack,
  Icon,
  PinInput,
  PinInputField,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import Card from "../../../../components/card/Card";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../../components/form/variables";
import {
  ICurrentSubscriptionsResponse,
  IPostCheckin,
} from "../../../../types/suscription";
import { DisciplinesIconTypes } from "../constants";

export interface IIconTypes {
  [x: string]: IconType;
}

export default function CheckinCard(props: {
  gridArea: string;
  onHandleSubmit: (values: { ci: string }) => void;
  ciValue: string;
  ClientAndSubscriptionData: ICurrentSubscriptionsResponse | undefined;
  onDisciplineCheckin: (values: IPostCheckin) => void;
}) {
  const {
    onHandleSubmit,
    ciValue,
    ClientAndSubscriptionData,
    onDisciplineCheckin,
    ...rest
  } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor);

  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  const displayName = `${ClientAndSubscriptionData?.firstname || ""} ${
    ClientAndSubscriptionData?.lastname || ""
  }`;
  const nameOrQuestion = displayName.trim() || "¿Quién eres?";

  return (
    <Card mb={{ base: "0px", lg: "20px" }} alignItems="center" {...rest}>
      <Avatar
        mx="auto"
        {...(ClientAndSubscriptionData?.photo && {
          src: ClientAndSubscriptionData.photo,
        })}
        {...(ClientAndSubscriptionData?.firstname && {
          name: ClientAndSubscriptionData.firstname,
        })}
        // src={ClientAndSubscriptionData?.photo || undefined}
        h="87px"
        w="87px"
        // mt="-43px"
        border="4px solid"
        borderColor={borderColor}
        bg={bgTabIndicator}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {nameOrQuestion}
      </Text>
      <Text color={textColorSecondary} fontSize="sm" mt={2}>
        Ingresa tu CI
      </Text>
      <HStack mt={2}>
        <PinInput
          focusBorderColor={bgTabIndicator}
          onChange={(ci) => {
            onHandleSubmit({ ci });
          }}
          value={ciValue}
        >
          <PinInputField color={textColorPrimary} />
          <PinInputField color={textColorPrimary} />
          <PinInputField color={textColorPrimary} />
          <PinInputField color={textColorPrimary} />
          <PinInputField color={textColorPrimary} />
          <PinInputField color={textColorPrimary} />
          <PinInputField
            color={textColorPrimary}
            onChange={({ target: { value } }) => {
              const updatedCi = ciValue.slice(0, -1) + value;
              if (updatedCi.length === 7) {
                onHandleSubmit({ ci: updatedCi });
              }
            }}
          />
        </PinInput>
      </HStack>
      <Flex w="max-content" mx="auto" mt="26px" gap={3}>
        {ClientAndSubscriptionData?.subscriptions.map((elem) => {
          return (
            <Flex
              key={elem.id}
              mx="auto"
              alignItems="center"
              flexDirection="column"
              borderWidth={1}
              rounded={"lg"}
              px={3}
              cursor={"pointer"}
              onClick={() => {
                if (!ciValue) {
                  return;
                }
                onDisciplineCheckin({
                  ci: ciValue,
                  subscriptionId: elem.id,
                });
              }}
            >
              <Icon
                as={DisciplinesIconTypes[elem.Discipline.label]}
                width="40px"
                height="40px"
                color={textColorSecondary}
              />
              <Text color={textColorPrimary} fontSize="large" fontWeight="700">
                {elem.Discipline.label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Card>
  );
}
