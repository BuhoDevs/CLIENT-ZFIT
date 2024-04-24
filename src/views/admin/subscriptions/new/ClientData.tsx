import {
  Avatar,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IClientById } from "../../../../types/client";
interface IClientData {
  bgContainer: string;
  clientsData: IClientById | undefined;
}

const ClientData = ({ bgContainer, clientsData }: IClientData) => {
  return (
    <Box borderRadius={8} bg={bgContainer} mt={2} p={4}>
      <Card
        direction={{ base: "column", sm: "column", md: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Avatar
          size="2xl"
          name={clientsData?.Person.firstname}
          src={clientsData?.Person?.photo}
          alignSelf={{
            base: "center",
          }}
        />

        <Stack alignSelf="center">
          <CardBody>
            <SimpleGrid
              columns={{
                base: 1,
                sm: 2,
                md: 2,
                lg: 4,
              }}
              spacing={2}
              mb={3}
            >
              <FormControl>
                <FormLabel fontSize="medium" fontWeight="bold">
                  Cédula:
                </FormLabel>
                <Text py="2">{clientsData?.Person.ci}</Text>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="medium" fontWeight="bold">
                  Nombre(s):
                </FormLabel>
                <Text py="2">{clientsData?.Person.firstname}</Text>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="medium" fontWeight="bold">
                  Apellido(s):
                </FormLabel>
                <Text py="2">{clientsData?.Person.lastname}</Text>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid
              columns={{
                base: 1,
                sm: 2,
                md: 2,
                lg: 4,
              }}
              spacing={2}
            >
              <FormControl>
                <FormLabel fontSize="medium" fontWeight="bold">
                  Celular:
                </FormLabel>
                <Text py="2">{clientsData?.Person?.phone || "-"}</Text>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="medium" fontWeight="bold">
                  Correo:
                </FormLabel>
                <Text py="2">{clientsData?.email || "-"}</Text>
              </FormControl>
            </SimpleGrid>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default ClientData;
