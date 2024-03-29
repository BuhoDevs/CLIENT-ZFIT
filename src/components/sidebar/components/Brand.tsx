// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { MdFitnessCenter } from "react-icons/md";
// import { HorizonLogo } from "../../icons/Icons";
import { HSeparator } from "../../separator/Separator";
// import ligthBrandImg from "../../../assets/img/brand/mdashlogo.png";
// import darkBrandImg from "../../../assets/img/brand/darkbrand.png";

// Custom components

export function SidebarBrand() {
  //   Chakra color mode
  // const { colorMode } = useColorMode();
  // const isDarkMode = colorMode === "dark";
  const brandColor = useColorModeValue("brand.500", "brand.400");

  return (
    <Flex alignItems="center" flexDirection="column">
      {/* <Image
        src={isDarkMode ? darkBrandImg : ligthBrandImg}
        alt="medical dasboard image"
        title="imagen de la marca"
      /> */}
      <Flex alignItems="center" gap={1}>
        <Text as="h1" color={brandColor} fontSize="24px" fontWeight={600}>
          Z-
        </Text>
        <Text as="h1" fontSize="24px">
          FITNESS
        </Text>
        <Icon
          as={MdFitnessCenter}
          width="20px"
          height="20px"
          color={brandColor}
          fontWeight="bold"
        />
      </Flex>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
