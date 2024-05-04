
import { useState } from 'react';
import { TabPanel, TabPanels, Tabs, Button, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Switch } from '@chakra-ui/react';
import { useGenre } from '../../../../hooks/genre'; // Asegúrate de tener este hook creado
import { IGenrePromise, IGenreData } from '../../../../types/genre';
// import SubscriptionsTypeComponent from './TabsTypeSubs';

const GenresComponent = () => {
    const { data: genres, isLoading, isError } = useGenre();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedGenre, setSelectedGenre] = useState({});
    const [editedGenre, setEditedGenre] = useState({});

    const handleRowClick = (genre: IGenrePromise) => {
        setSelectedGenre(genre);
        setEditedGenre({ ...genre }); // Clona el género para editar
        onOpen();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedGenre(prevGenre => ({
            ...prevGenre,
            [name]: value
        }));
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEditedGenre(prevGenre => ({
            ...prevGenre,
            [name]: checked
        }));
    };


    const handleSaveChanges = async () => {
        try
        {
            setEditedGenre({ genreId: editedGenre.id, editedGenreData: editedGenre });
            console.log('Datos editados:', editedGenre);
            onClose();
        } catch (error)
        {
            console.error('Error al editar el género:', error);
        }
    };


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading genres</div>;

    return (
        <Tabs position="relative" variant="unstyled">

            <TabPanels>
                <TabPanel>
                    <Table variant="simple" mt={4} onClick={() => handleRowClick(genres)}>
                        <Thead>
                            <Tr>
                                <Th>Nombre</Th>
                                <Th>Label</Th>
                                <Th>Estado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {genres?.map(genre => (
                                <Tr key={genre.id}>
                                    <Td>{genre.name}</Td>
                                    <Td>{genre.label}</Td>
                                    <Td>{genre.status ? 'Activo' : 'Inactivo'}</Td>
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
                        <Input name="name" value={editedGenre?.name} onChange={handleInputChange} />
                        <p>Label:</p>
                        <Input name="label" value={editedGenre?.label} onChange={handleInputChange} />
                        <p>Status:</p>
                        <Switch name="status" isChecked={editedGenre?.status} onChange={handleSwitchChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button variant="ghost" onClick={handleSaveChanges}>Guardar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Tabs >
    );
};

export default GenresComponent;


