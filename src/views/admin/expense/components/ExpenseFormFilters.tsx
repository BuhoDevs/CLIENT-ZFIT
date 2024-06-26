import { FormControl, FormLabel, Input, SimpleGrid } from "@chakra-ui/react";
import { Select as CkakraSelect } from "chakra-react-select";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { IExpenseFormFilter } from "../../../../types/expense";
import { IExpenseCategories } from "../../../../types/expenseCategories";
import DatePicker from "../../../../components/calendar/SingleDatePicker";

interface IExpenseCategoriesFormFilters {
  register: UseFormRegister<IExpenseFormFilter>;
  control: Control<IExpenseFormFilter>;
  expenseCategoriesData: IExpenseCategories[] | undefined;
  defaultStartDate?: string;
  defaultEndDate?: string;
}
const ExpenseFormFilters = ({
  register,
  control,
  expenseCategoriesData,
  defaultStartDate,
  defaultEndDate,
}: IExpenseCategoriesFormFilters) => {
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
        <FormLabel>Descripción</FormLabel>
        <Input
          fontSize="small"
          placeholder="Descripción..."
          {...register("description")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Categorías</FormLabel>
        <Controller
          name="Category"
          rules={{
            required: {
              value: true,
              message: "La disciplina es requerida",
            },
          }}
          control={control}
          render={({ field: { value, onChange, onBlur, name, ref } }) => (
            <CkakraSelect
              name={name}
              ref={ref}
              colorScheme="brandScheme"
              options={expenseCategoriesData || []}
              selectedOptionColorScheme="brandScheme"
              placeholder="Seleccionar"
              // isDisabled={!isEditing}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              focusBorderColor="brand.400"
              isClearable
              chakraStyles={{
                menu: (prev) => ({ ...prev, zIndex: 10 }),
              }}
            />
          )}
        />
      </FormControl>
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

export default ExpenseFormFilters;
