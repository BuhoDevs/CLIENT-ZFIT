import { useState } from "react";
import {
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Switch,
} from "@chakra-ui/react";
import { useGenre } from "../../../../hooks/genre";
import { IGenrePromise } from "../../../../types/genre";
// import SubscriptionsTypeComponent from './TabsTypeSubs';

const GenresComponent = () => {
  const { data: genres, isLoading, isError } = useGenre();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, setSelectedGenre] = useState({});
  const [editedGenre, setEditedGenre] = useState({});

  const handleRowClick = (genre: IGenrePromise) => {
    setSelectedGenre(genre);
    setEditedGenre({ ...genre });
    onOpen();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedGenre((prevGenre) => ({
      ...prevGenre,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedGenre((prevGenre) => ({
      ...prevGenre,
      [name]: checked,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      if ("id" in editedGenre) {
        setEditedGenre({
          genreId: editedGenre.id,
          editedGenreData: editedGenre,
        });
        console.log("Datos editados:", editedGenre);
        onClose();
      } else {
        console.error('Error: editedGenre no tiene la propiedad "id"');
      }
    } catch (error) {
      console.error("Error al editar el género:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading genres</div>;

  return (
    <Tabs position="relative" variant="unstyled">
      <TabPanels>
        <TabPanel>
          <Table
            variant="simple"
            mt={4}
            onClick={() =>
              genres && genres.length > 0 && handleRowClick(genres[0])
            }>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Label</Th>
                <Th>Estado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {genres?.map((genre) => (
                <Tr key={genre.id} onClick={() => handleRowClick(genre)}>
                  <Td>{genre.name}</Td>
                  <Td>{genre.label}</Td>
                  <Td>{genre.status ? "Activo" : "Inactivo"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TabPanel>
      </TabPanels>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Género</ModalHeader>
          <ModalBody>
            <p>Nombre:</p>
            <Input
              name="name"
              value={(editedGenre as IGenrePromise)?.name || ""}
              onChange={handleInputChange}
            />
            <p>Label:</p>
            <Input
              name="label"
              value={(editedGenre as IGenrePromise)?.label || ""}
              onChange={handleInputChange}
            />
            <p>Status:</p>
            <Switch
              name="status"
              isChecked={(editedGenre as IGenrePromise)?.status || false}
              onChange={handleSwitchChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="ghost" onClick={handleSaveChanges}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Tabs>
  );
};

export default GenresComponent;
