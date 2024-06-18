import { FormControl, FormLabel, SimpleGrid } from "@chakra-ui/react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { IBalanceFilter } from "../../../../types/balance";
import DatePicker from "../../../../components/calendar/SingleDatePicker";
interface IBalanceFormFilters {
  register: UseFormRegister<IBalanceFilter>;
  control: Control<IBalanceFilter>;
  defaultStartDate?: string;
  defaultEndDate?: string;
}
const BalanceFormFilters = ({
  control,
  defaultStartDate,
  defaultEndDate,
}: IBalanceFormFilters) => {
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
        <FormLabel display="flex" gap={1}>
          Desde
        </FormLabel>
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: {
              value: true,
              message: "La fecha es requerida",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              setDate={onChange}
              date={value || defaultStartDate}
              name="startDate"
            />
          )}
        />
        {/* {errors?.dateIn && (
          <FormErrorMessage ps={1} mb="24px">
            {errors.dateIn.message}
          </FormErrorMessage>
        )} */}
      </FormControl>
      <FormControl>
        <FormLabel display="flex" gap={1}>
          Hasta
        </FormLabel>
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: {
              value: true,
              message: "La fecha es requerida",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              setDate={onChange}
              date={value || defaultEndDate}
              name="endDate"

              // isMaxDateRequired
            />
          )}
        />
        {/* {errors?.dateIn && (
          <FormErrorMessage ps={1} mb="24px">
            {errors.dateIn.message}
          </FormErrorMessage>
        )} */}
      </FormControl>
    </SimpleGrid>
  );
};

export default BalanceFormFilters;
