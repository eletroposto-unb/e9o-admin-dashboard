import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Flex, useTheme, useDisclosure, Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { BiHistory, BiCoinStack, BiEdit } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/user";

const Usuarios = () => {
  const theme = useTheme();

  const [userModal, setUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]); 
  const [userModalData, setUserModalData] = useState({});

  const handleUserModal = (index: number) => {
    setUserModalData(mockUSuarios[index]);
    onOpen();
  };

  const handleUserModalClose = () => {
    setUserModal(false);
    setUserModalData({});
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = async () => {
    const data = await getAllUsers()
      .then((res) => {
        console.log(res);
        setUsers(res?.value);
      })
      .catch((err) => {
        console.log(err);
      });

    // setStations(data?.value);
  };

  return (
    <>
      <div>
        <TableContainer border="1px" borderColor="gray.200" borderRadius={"4"} padding={3} backgroundColor={`${theme.colors.white.main}`}>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th textAlign="end">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users && users.map((usuario: User, index) => {
                return (
                  <Tr key={`${usuario.cpf}-${usuario.email}`}>
                    <Td>{usuario.name}</Td>
                    <Td>{usuario.email}</Td>
                    <Td>
                      <Flex justify={"flex-end"} gap={3}>
                        <Tooltip label="Histórico" aria-label="Histórico">
                          <button>
                            <BiHistory size={24} />
                          </button>
                        </Tooltip>
                        <Tooltip label="Créditos" aria-label="Créditos">
                          <button>
                            <BiCoinStack size={24} />
                          </button>
                        </Tooltip>
                        <Tooltip label="Administrador" aria-label="Administrador">
                          <button>
                            <MdOutlineAdminPanelSettings size={24} />
                          </button>
                        </Tooltip>
                        <Tooltip label="Visualizar" aria-label="Visualizar">
                          <button onClick={() => handleUserModal(index)}>
                            <AiFillEye size={24} />
                          </button>
                        </Tooltip>
                        <Tooltip label="Editar" aria-label="Editar">
                          <button>
                            <BiEdit size={24} />
                          </button>
                        </Tooltip>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Usuarios;

const mockUSuarios = [
  {
    id: 1,
    nome: "João Pedro",
    email: "joao@eletroposto.unb",
  },
  {
    id: 2,
    nome: "Victor Lucas",
    email: "victor@eletroposto.unb",
  },
  {
    id: 3,
    nome: "Gabriela Pivetta",
    email: "gabriela@eletroposto.unb",
  },
  {
    id: 4,
    nome: "André Lucas",
    email: "andre@eletroposto.unb",
  },
  {
    id: 5,
    nome: "Vinícius Vieira",
    email: "vini@eletroposto.unb",
  },
  {
    id: 6,
    nome: "Kevin Batista",
    email: "kevin@eletroposto.unb",
  },
];
