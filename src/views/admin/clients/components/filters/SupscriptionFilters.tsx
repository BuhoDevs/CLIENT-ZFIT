import { FormControl, FormLabel, Input, SimpleGrid } from "@chakra-ui/react";

const SupscriptionFilters = () => {
  return (
    <SimpleGrid
      columns={{
        base: 1,
        sm: 1,
        md: 2,
        lg: 4,
      }}
      spacing={2}
      p={4}
    >
      <FormControl>
        <FormLabel>Cédula</FormLabel>
        <Input fontSize="small" placeholder="Cedula..." />
      </FormControl>
      <FormControl>
        <FormLabel>Nombre(s)</FormLabel>
        <Input fontSize="small" type="text" placeholder="Nombre(s)" />
      </FormControl>
      <FormControl>
        <FormLabel>Apellido(s)</FormLabel>
        <Input fontSize="small" type="text" placeholder="Apellidos" />
      </FormControl>
    </SimpleGrid>
  );
};

export default SupscriptionFilters;
