import { useState } from "react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { useDeleteSubscription } from "../../../../hooks/subscriptionsType";

const DeleteSubscriptionComponent = () => {
  const [subscriptionId, setSubscriptionId] = useState("");
  const { mutateAsync } = useDeleteSubscription();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!subscriptionId) {
      toast({
        title: "Error",
        description: "Por favor, introduce un ID de suscripción",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      await mutateAsync(parseInt(subscriptionId));
      toast({
        title: "Éxito",
        description: "La suscripción se eliminó correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSubscriptionId("");
    } catch (error) {
      console.error("Error al eliminar la suscripción:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al eliminar la suscripción",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Input
        placeholder="ID de la suscripción"
        value={subscriptionId}
        onChange={(e) => setSubscriptionId(e.target.value)}
        mb={4}
      />
      <Button colorScheme="red" onClick={handleDelete} isLoading={isLoading}>
        Eliminar Suscripción
      </Button>
    </Box>
  );
};

export default DeleteSubscriptionComponent;
