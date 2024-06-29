import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { RefObject, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../../components/form/variables";
import { usePostExpense } from "../../../../hooks/expense";
import { IEditionExpenseForm } from "../../../../types/expense";
import { expenseCreateParser } from "../utils";
import { Select as CkakraSelect } from "chakra-react-select";
import { useAllExpenseCategories } from "../../../../hooks/expenseCategories";

interface IEditionExpenseModal {
  isOpen: boolean;
  onClose: () => void;
  initialRef: RefObject<HTMLInputElement>;
  expenseDataForm: IEditionExpenseForm | undefined;
}

const EditionExpenseModal = ({
  isOpen,
  onClose,
  initialRef,
  expenseDataForm,
}: IEditionExpenseModal) => {
  const toast = useToast();
  // const navigate = useNavigate();
  const bgSchemeColor = useColorModeValue(lightBrandBgColor, darkBrandBgColor);
  const bgCardModal = useColorModeValue("white", "navy.900");
  const inputTextColor = useColorModeValue("black", "white");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    resetField: setValue,
  } = useForm<IEditionExpenseForm>();
  const { data: expenseCategoriesData } = useAllExpenseCategories();
  const { mutate: insertExpenseMutation, isPending: areExpenseCreating } =
    usePostExpense();

  const onSearchClients = (values: IEditionExpenseForm) => {
    insertExpenseMutation(expenseCreateParser(values), {
      onSuccess: ({ message }) => {
        toast({
          title: `Subscripción exitosa`,
          description: message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setValue("Category", undefined);
        reset();
        onClose();
      },
      onError: (error) => {
        toast({
          title: `Error en subscripción`,
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setValue("Category", undefined);

        reset();
      },
    });
  };

  useEffect(() => {
    if (expenseDataForm) {
      reset(expenseDataForm);
    }
  }, [expenseDataForm, reset]);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={() => {
        console.log("valor");
        setValue("Category", undefined);
        onClose();
      }}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent bg={bgCardModal}>
        <ModalHeader>Editar gasto</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* Search client */}
          <form onSubmit={handleSubmit(onSearchClients)}>
            <SimpleGrid columns={{ base: 1 }} spacing={2}>
              <FormControl isInvalid={!!errors.Category}>
                <FormLabel>Tipo de gasto</FormLabel>
                <Controller
                  name="Category"
                  rules={{
                    required: {
                      value: true,
                      message: "El tipo de gasto es requerida",
                    },
                  }}
                  control={control}
                  render={({
                    field: { value, onChange, onBlur, name, ref },
                  }) => (
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
                {errors.Category && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.Category.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.amount}>
                <FormLabel>Monto Bs.</FormLabel>
                <Input
                  type="number"
                  focusBorderColor={bgSchemeColor}
                  {...register("amount", {
                    required: {
                      value: true,
                      message: "El monto es requerido",
                    },
                    valueAsNumber: true,
                  })}
                  // max={subsTypePrice?.price || 0}
                  color={inputTextColor}
                />
                {errors.amount && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.amount.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  focusBorderColor={bgSchemeColor}
                  // value={subsTypePrice?.price || 0}
                  {...register("description", {
                    required: {
                      value: true,
                      message: "La descripción es requerida",
                    },
                  })}
                  color={inputTextColor}
                  resize="none"
                />
                {errors.description && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Flex mt={2} justifyContent="flex-end" gap={2}>
                <Button
                  colorScheme="brandScheme"
                  color="white"
                  mr={3}
                  borderRadius={8}
                  isLoading={areExpenseCreating}
                  type="submit"
                >
                  Confirmar edición
                </Button>
                <Button onClick={onClose} borderRadius={8}>
                  Cancelar
                </Button>
              </Flex>
            </SimpleGrid>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditionExpenseModal;
