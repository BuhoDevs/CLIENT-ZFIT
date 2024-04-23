import { Box, useColorModeValue } from "@chakra-ui/react";
import {
  darkBgForm,
  lightBgForm,
} from "../../../../../../components/form/variables";
import SupscriptionFilters from "../../filters/SupscriptionFilters";

const Supscriptions = () => {
  const bgFilters = useColorModeValue(lightBgForm, darkBgForm);
  return (
    <Box p={1} bg={bgFilters} borderRadius={8}>
      {/* filtros */}
      <SupscriptionFilters />
      {/* table */}
    </Box>
  );
};

export default Supscriptions;
