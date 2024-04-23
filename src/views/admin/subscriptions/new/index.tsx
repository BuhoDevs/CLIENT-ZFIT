import { Box, Button, Flex } from "@chakra-ui/react";
import {
  marginTopDefault,
  marginTopMobile,
} from "../../../../layouts/contants";
import { useNavigate } from "react-router-dom";

const NewSubscription = () => {
  const navigate = useNavigate();
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
        ACA la vista de nueva suscripcion
      </Box>
    </Box>
  );
};

export default NewSubscription;
