import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
interface IButtonsStack {
  mt?: number;
  handleCancel?: () => void;
}
const ButtonsStack = ({ mt = 2, handleCancel }: IButtonsStack) => {
  const cancelBgScheme = useColorModeValue("gray.400", "gray.600");
  const hoverBgScheme = useColorModeValue("gray.500", "gray.500");
  return (
    <Flex
      mt={mt}
      justifyContent={{
        base: "flex-start",
        md: "flex-end",
      }}
      wrap={{
        base: "wrap",
        md: "nowrap",
      }}
      gap={2}
    >
      <Button
        width={{ base: "full", md: "150px" }}
        borderRadius="8px"
        colorScheme="brandScheme"
        fontSize="sm"
        fontWeight="normal"
        color="white"
        type="submit"
      >
        Guardar
      </Button>

      <Button
        width={{ base: "full", md: "150px" }}
        borderRadius="8px"
        fontSize="sm"
        fontWeight="normal"
        color="white"
        bg={cancelBgScheme}
        _hover={{
          bg: hoverBgScheme,
        }}
        onClick={() => {
          if (handleCancel) {
            handleCancel();
          }
        }}
      >
        Cancelar
      </Button>
    </Flex>
  );
};

export default ButtonsStack;
