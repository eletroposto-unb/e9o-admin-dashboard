import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  useTheme,
  useDisclosure,
  Button,
  Input,
  Select,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BiHistory, BiCoinStack, BiEdit } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllUsers, updateUser, updateUserStatus } from "@/services/user";

const Usuarios = () => {
  const theme = useTheme();

  const [users, setUsers] = useState<User[]>([]);
  const [userModalData, setUserModalData] = useState<User>({} as User);

  const handleUserModal = (index: number) => {
    setUserModalData(users[index]);
    onOpen();
  };

  const handleUserModalClose = () => {
    setUserModalData({} as User);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = async () => {
    await getAllUsers()
      .then((res) => {
        setUsers(res?.value);
      })
      .catch(() => {});
  };

  const handleModalSaveButton = async () => {
    await updateUser(userModalData)
      .then(() => {
        handleGetAllUsers().then(() => {
          onClose();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modalSaveButtonCondition = userModalData.status === "inactive";

  return (
    <>
      <div>
        <TableContainer
          border="1px"
          borderColor="gray.200"
          borderRadius={"10"}
          paddingY={5}
          paddingX={3}
          backgroundColor={`${theme.colors.white.main}`}
        >
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Status</Th>
                <Th textAlign="end">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map((usuario: User, index) => {
                  return (
                    <Tr key={`${usuario.cpf}-${usuario.email}`}>
                      <Td>{usuario.name}</Td>
                      <Td>{usuario.email}</Td>
                      <Td
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        {usuario.status}
                      </Td>
                      <Td>
                        <Flex justify={"flex-end"} gap={3}>
                          <Tooltip label="Histórico" aria-label="Histórico">
                            <button>
                              <BiHistory size={20} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Créditos" aria-label="Créditos">
                            <button>
                              <BiCoinStack size={20} />
                            </button>
                          </Tooltip>
                          <Tooltip
                            label="Administrador"
                            aria-label="Administrador"
                          >
                            <button>
                              <MdOutlineAdminPanelSettings size={20} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Visualizar" aria-label="Visualizar">
                            <button onClick={() => handleUserModal(index)}>
                              <AiFillEye size={20} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Editar" aria-label="Editar">
                            <button>
                              <BiEdit size={20} />
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
      <Modal isOpen={isOpen} onClose={handleUserModalClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={`${theme.colors.white.main}`}>
          <ModalHeader>Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={3}>
              <Flex direction={"column"} gap={0.5}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Nome
                </Text>
                <Input
                  placeholder="Nome"
                  color={`${theme.colors.lightBlack.main}`}
                  fontSize={14}
                  disabled
                  defaultValue={userModalData.name}
                />
              </Flex>

              <Flex direction={"column"} gap={0.5}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Status
                </Text>
                <Select
                  placeholder="Status"
                  borderRadius={"5"}
                  borderWidth={1}
                  backgroundColor={`${theme.colors.white.main}`}
                  color={`${theme.colors.lightBlack.main}`}
                  fontSize={14}
                  defaultValue={userModalData.status}
                  onChange={() => {
                    updateUserStatus(userModalData)
                      .then((res) => {
                        setUserModalData({
                          ...userModalData,
                          status: res?.value?.status,
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                  value={userModalData.status}
                >
                  <option value="inactive">Inactive</option>
                  <option value="active">Active</option>
                </Select>
              </Flex>
              <Flex gap={3}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Admin
                </Text>
                <Checkbox
                  colorScheme="green"
                  defaultChecked={userModalData.is_admin}
                  onChange={(e) => {
                    setUserModalData({
                      ...userModalData,
                      is_admin: e.target.checked,
                    });
                  }}
                  checked={userModalData.is_admin}
                />
              </Flex>
              <Button
                colorScheme="blue"
                onClick={handleModalSaveButton}
                disabled={modalSaveButtonCondition}
                style={{ opacity: modalSaveButtonCondition ? 0.6 : 1 }}
              >
                Salvar
              </Button>
              <Button variant="ghost" onClick={handleUserModalClose}>
                Close
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Usuarios;
