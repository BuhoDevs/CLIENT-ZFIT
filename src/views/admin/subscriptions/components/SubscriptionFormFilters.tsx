import { FormControl, FormLabel, Input, SimpleGrid } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { ISubscriptionDataFilters } from "../../../../types/suscription";
interface ISubscriptionFormFilters {
  register: UseFormRegister<ISubscriptionDataFilters>;
}
const SubscriptionFormFilters = ({ register }: ISubscriptionFormFilters) => {
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
        <Input fontSize="small" placeholder="Cedula..." {...register("ci")} />
      </FormControl>
      <FormControl>
        <FormLabel>Nombre(s)</FormLabel>
        <Input
          fontSize="small"
          type="text"
          placeholder="Nombre(s)"
          {...register("firstname")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Apellido(s)</FormLabel>
        <Input
          fontSize="small"
          type="text"
          placeholder="Apellidos"
          {...register("lastname")}
        />
      </FormControl>
    </SimpleGrid>
  );
};

export default SubscriptionFormFilters;
