import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { RefObject, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../../components/form/variables";
import { useAllClients } from "../../../../hooks/client";
import {
  IClientDataFilters,
  IClientDataTable,
  IGetClientPromise,
} from "../../../../types/client";
import { StateDiccionaryProps } from "../../../../types/table";
import CustomHeaderColumn from "../../clients/components/Table/CustomHeaderColumn";
import { DataTable } from "../../clients/components/Table/DataTable";
import { stateDiccionary } from "../../clients/components/Table/utils";
import { useNavigate } from "react-router-dom";
interface ISubscriptionModal {
  isOpen: boolean;
  onClose: () => void;
  initialRef: RefObject<HTMLInputElement>;
}
const intialFilters: IClientDataFilters = {
  ci: "",
  firstname: "",
  lastname: "",
};

const SubscriptionModal = ({
  isOpen,
  onClose,
  initialRef,
}: ISubscriptionModal) => {
  const navigate = useNavigate();
  const bgSchemeColor = useColorModeValue(lightBrandBgColor, darkBrandBgColor);
  const bgCardModal = useColorModeValue("white", "navy.900");

  const [filters, setFilters] = useState<IClientDataFilters>(intialFilters);
  const { register, handleSubmit } = useForm<IClientDataFilters>();
  const { mutate: getClients, isPending: areClientsFetching } = useAllClients();
  const [clientsData, setClientsData] = useState<IGetClientPromise>();
  const [clientSelected, setClientSelected] = useState<IClientDataTable>();

  useEffect(() => {
    getClients(
      {
        clientData: filters,
        skip: 1,
        take: 1000,
      },
      {
        onSuccess: (clienscollection) => {
          setClientsData(clienscollection);
        },
      }
    );
  }, [filters, getClients]);

  const clientsColumns: ColumnDef<IClientDataTable>[] = [
    {
      header: "FOTO",
      accessorKey: "photo",
      cell: ({ row }) => (
        <Avatar
          size="sm"
          name={row.original.firstname}
          src={row.original.photo}
        />
      ),
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CEDULA" />
      ),
      accessorKey: "ci",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="NOMBRES" />
      ),
      accessorKey: "firstname",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="APELLIDOS" />
      ),
      accessorKey: "lastname",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="TELEFONO" />
      ),
      accessorKey: "phone",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CORREO" />
      ),
      accessorKey: "email",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="ESTADO" />
      ),
      accessorFn: (row) =>
        stateDiccionary[String(row.status) as keyof StateDiccionaryProps],
      accessorKey: "status",
    },
  ];

  const onSearchClients = (values: IClientDataFilters) => {
    setFilters(values);
  };

  const handleNavigate = () => {
    if (clientSelected) {
      navigate(`/dashboard/subscriptions/client/${clientSelected.id}`);
    }
  };
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
        <ModalHeader>Seleccionar Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {clientSelected && (
            <Flex justifyContent="flex-end" alignItems="center">
              <Tag
                size="md"
                borderRadius={8}
                variant="solid"
                colorScheme="brandScheme"
                mb={2}
                alignSelf="end"
              >
                <TagLabel>{`${clientSelected?.firstname} ${clientSelected?.lastname}`}</TagLabel>
                <TagCloseButton onClick={() => setClientSelected(undefined)} />
              </Tag>
            </Flex>
          )}
          {/* Search client */}
          <form onSubmit={handleSubmit(onSearchClients)}>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} w="16px" h="16px" color="gray.300" />
                </InputLeftElement>
                <Input
                  {...register("ci")}
                  fontSize="small"
                  placeholder="Buscar por cédula"
                  focusBorderColor={bgSchemeColor}
                />
              </InputGroup>
            </FormControl>
          </form>
          {/* Clients list */}
          <DataTable
            columns={clientsColumns}
            isFetching={false}
            isLoading={areClientsFetching}
            data={clientsData?.clients}
            tableSize="md"
            tableVariant="simple"
            setSelectedItem={setClientSelected}
            maxH="200px"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={!clientSelected}
            colorScheme="brandScheme"
            color="white"
            mr={3}
            borderRadius={8}
            onClick={handleNavigate}
          >
            Continuar
          </Button>
          <Button onClick={onClose} borderRadius={8}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionModal;
