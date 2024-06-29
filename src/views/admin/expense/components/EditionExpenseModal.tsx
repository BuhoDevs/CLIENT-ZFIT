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
import { Select as CkakraSelect } from "chakra-react-select";
import { RefObject, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../../components/form/variables";
import { useEditionExpense } from "../../../../hooks/expense";
import { useAllExpenseCategories } from "../../../../hooks/expenseCategories";
import { IEditionExpenseForm } from "../../../../types/expense";
import { expenseEditionParser } from "../utils";

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
  } = useForm<IEditionExpenseForm>();
  const { data: expenseCategoriesData } = useAllExpenseCategories();
  const { mutate: editExpenseMutate, isPending: isExpensePatching } =
    useEditionExpense();

  const onPatchExpense = (values: IEditionExpenseForm) => {
    const expenseEditionRequestBody = expenseEditionParser(values);
    editExpenseMutate(expenseEditionRequestBody, {
      onSuccess: ({ message }) => {
        toast({
          title: `Edición exitosa`,
          description: message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        reset();
        onClose();
      },
      onError: (error) => {
        toast({
          title: `Error en edición`,
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
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
      onClose={onClose}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent bg={bgCardModal}>
        <ModalHeader>Editar gasto</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* Search client */}
          <form onSubmit={handleSubmit(onPatchExpense)}>
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
                  isLoading={isExpensePatching}
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
