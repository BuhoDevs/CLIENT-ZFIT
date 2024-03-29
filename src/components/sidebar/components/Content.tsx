// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import SidebarBrand from "./Brand";
// import SidebarDocs from "./SidebarCard";
import SidebarLinks from "./Links";

// FUNCTIONS

function SidebarContent(props: { routes: RoutesType[] }) {
  const { routes } = props;
  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <SidebarBrand />
      <Stack direction="column" mt="8px" mb="auto">
        <Box ps="20px" pe={{ lg: "16px", "2xl": "16px" }}>
          <SidebarLinks routes={routes} />
        </Box>
      </Stack>

      <Box
        ps="20px"
        pe={{ lg: "16px", "2xl": "20px" }}
        mt="60px"
        mb="40px"
        borderRadius="30px"
      >
        {/* <SidebarDocs /> */}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
