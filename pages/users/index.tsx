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
  InputGroup,
  InputLeftElement,
  InputRightElement,
  CheckboxIcon,
  Stack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BiHistory, BiCoinStack, BiEdit } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getAllUsers, updateUser, updateUserStatus } from "@/services/user";

const Usuarios = () => {
  const theme = useTheme();

  const [users, setUsers] = useState<User[]>([]);
  const [userModalData, setUserModalData] = useState<User>({} as User);
  const {
    isOpen: isEditUserOpen,
    onOpen: onEditUserOpen,
    onClose: onEditUserClose,
  } = useDisclosure();
  const {
    isOpen: isViewUserOpen,
    onOpen: onViewUserOpen,
    onClose: onViewUserClose,
  } = useDisclosure();
  const {
    isOpen: isWalletUserOpen,
    onOpen: onWalletUserOpen,
    onClose: onWalletUserClose,
  } = useDisclosure();

  const handleEditUserModal = (index: number) => {
    setUserModalData(users[index]);
    onEditUserOpen();
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleEditUserModalClose = () => {
    setUserModalData({} as User);
    onEditUserClose();
  };

  const handleViewUserModal = (index: number) => {
    setUserModalData(users[index]);
    onViewUserOpen();
  };

  const handleViewUserModalClose = () => {
    setUserModalData({} as User);
    onViewUserClose();
  };

  const handleWalletUserModal = (index: number) => {
    setUserModalData(users[index]);
    onWalletUserOpen();
  };

  const handleWalletUserModalClose = () => {
    setUserModalData({} as User);
    onWalletUserClose();
  };

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
          onEditUserClose();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modalSaveButtonCondition = userModalData.status === "inactive";

  const onSubmitAccepted = () => {
    console.log("DEVE ACEITAR");
  };

  const onSubmitRecused = () => {
    console.log("DEVE RECUSAR");
  };

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
                          <Tooltip
                            label="Administrador"
                            aria-label="Administrador"
                          >
                            <button>
                              <MdOutlineAdminPanelSettings size={20} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Histórico" aria-label="Histórico">
                            <button>
                              <BiHistory size={20} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Créditos" aria-label="Créditos">
                            <button
                              onClick={() => handleWalletUserModal(index)}
                            >
                              <BiCoinStack size={20} />
                            </button>
                          </Tooltip>

                          <Tooltip label="Visualizar" aria-label="Visualizar">
                            <button onClick={() => handleViewUserModal(index)}>
                              <AiFillEye size={20} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Editar" aria-label="Editar">
                            <button onClick={() => handleEditUserModal(index)}>
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
      <Modal
        isOpen={isWalletUserOpen}
        onClose={handleWalletUserModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor={`${theme.colors.white.main}`}
          paddingBottom={2}
        >
          <ModalHeader>Carteira do Usuário</ModalHeader>
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
                  CPF
                </Text>
                <Input
                  placeholder="Cpf"
                  color={`${theme.colors.lightBlack.main}`}
                  fontSize={14}
                  disabled
                  defaultValue={userModalData.cpf}
                />
              </Flex>
              <Text fontSize={theme.fonts.modalTitle.size} textAlign={"center"}>
                Dados da Carteira
              </Text>
              <Flex direction={"column"} gap={0.5}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Quantidade atual de Créditos
                </Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input
                    placeholder="Créditos atuais"
                    type="number"
                    disabled
                    color={`${theme.colors.lightBlack.main}`}
                    fontSize={14}
                    defaultValue={userModalData.wallet?.qtdCreditos}
                  />
                  <InputRightElement>
                    <CheckboxIcon color="green.500" />
                  </InputRightElement>
                </InputGroup>
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Créditos solicitados
                </Text>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input
                    type="number"
                    placeholder="Créditos solicitados"
                    color={`${theme.colors.lightBlack.main}`}
                    fontSize={14}
                    disabled
                    defaultValue={userModalData.wallet?.qtdCreditos}
                  />
                  <InputRightElement>
                    <CheckboxIcon color="green.500" />
                  </InputRightElement>
                </InputGroup>

                <Flex
                  direction={"column"}
                  gap={4}
                  width={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"row"}
                  mt={3}
                  paddingTop={5}
                >
                  <Button
                    width={"40%"}
                    backgroundColor={`${theme.colors.primary.main}`}
                    color={`${theme.colors.white.main}`}
                    onClick={onSubmitAccepted}
                  >
                    Aceitar
                  </Button>
                  <Button
                    width={"40%"}
                    backgroundColor={`${theme.colors.secundary.main}`}
                    color={`${theme.colors.white.main}`}
                    onClick={onSubmitRecused}
                  >
                    Recusar
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isViewUserOpen}
        onClose={handleViewUserModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor={`${theme.colors.white.main}`}
          paddingBottom={10}
        >
          <ModalHeader>Visualizar Usuário</ModalHeader>
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
                  CPF
                </Text>

                <Input
                  placeholder="Nome"
                  color={`${theme.colors.lightBlack.main}`}
                  fontSize={14}
                  disabled
                  defaultValue={userModalData.cpf}
                />
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Email
                </Text>
                <Input
                  placeholder="Nome"
                  color={`${theme.colors.lightBlack.main}`}
                  fontSize={14}
                  disabled
                  defaultValue={userModalData.email}
                />
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Telefone
                </Text>
                <Input
                  placeholder="Nome"
                  color={`${theme.colors.lightBlack.main}`}
                  fontSize={14}
                  disabled
                  defaultValue={
                    userModalData.telefone
                      ? userModalData.telefone
                      : `Não cadastrado`
                  }
                />
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Status
                </Text>
                <Input
                  disabled
                  placeholder="Status"
                  borderRadius={"5"}
                  borderWidth={1}
                  backgroundColor={`${theme.colors.white.main}`}
                  color={`${theme.colors.lightBlack.main}`}
                  fontSize={14}
                  defaultValue={userModalData.status}
                ></Input>
              </Flex>
              <Flex gap={3}>
                <Text
                  color={theme.fonts.modalLabel.color}
                  fontSize={theme.fonts.modalLabel.size}
                >
                  Admin
                </Text>
                <Checkbox
                  disabled
                  colorScheme="green"
                  defaultChecked={userModalData.is_admin}
                  checked={userModalData.is_admin}
                />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isEditUserOpen}
        onClose={handleEditUserModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent backgroundColor={`${theme.colors.white.main}`}>
          <ModalHeader>Editar Usuário</ModalHeader>
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
              <Button variant="ghost" onClick={handleEditUserModalClose}>
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
