// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  PinInput,
  PinInputField,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../../components/form/variables";
import { IoFitness } from "react-icons/io5";
import { IoIosFitness, IoMdMusicalNote } from "react-icons/io";

export default function CheckinCard(props: {
  banner: string;
  avatar: string;
  name: string;
  job: string;
  posts: number | string;
  followers: number | string;
  following: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}) {
  const { banner, avatar, name, job, posts, followers, following, ...rest } =
    props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor);

  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} alignItems="center" {...rest}>
      {/* <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      > */}
      {/* <HStack>
        <PinInput focusBorderColor={bgTabIndicator}>
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
        </PinInput>
      </HStack> */}
      {/* </Box> */}

      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        // mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        ¿Quién eres?
        {/* {name} */}
      </Text>
      <Text color={textColorSecondary} fontSize="sm" mt={2}>
        Ingresa tu CI
        {/* {job} */}
      </Text>
      <HStack mt={2}>
        <PinInput focusBorderColor={bgTabIndicator}>
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
          <PinInputField color="white" />
        </PinInput>
      </HStack>
      <Flex w="max-content" mx="auto" mt="26px">
        <Flex mx="auto" me="60px" alignItems="center" flexDirection="column">
          <Icon
            as={IoIosFitness}
            width="40px"
            height="40px"
            color={textColorSecondary}
          />
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {posts}
          </Text>
          {/* <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Posts
          </Text> */}
        </Flex>
        <Flex mx="auto" me="60px" alignItems="center" flexDirection="column">
          <Icon
            as={IoFitness}
            width="40px"
            height="40px"
            color={textColorSecondary}
          />
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {followers}
          </Text>
          {/* <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Followers
          </Text> */}
        </Flex>
        <Flex mx="auto" alignItems="center" flexDirection="column">
          <Icon
            as={IoMdMusicalNote}
            width="40px"
            height="40px"
            color={textColorSecondary}
          />
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {following}
          </Text>
          {/* <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Following
          </Text> */}
        </Flex>
      </Flex>
    </Card>
  );
}
