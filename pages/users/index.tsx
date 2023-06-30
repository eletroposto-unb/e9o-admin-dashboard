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
} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useToast } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { BiHistory, BiCoinStack, BiEdit, BiUserX } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineUser, AiOutlineEye, AiFillCheckCircle } from "react-icons/ai";
import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { getAllUsers, updateUser, updateUserStatus } from "@/services/user";
import { updateUserWallet } from "@/services/wallet";
import { FaRegFrownOpen } from "react-icons/fa";
import { GrVmMaintenance } from "react-icons/gr";
import { ImBlocked } from "react-icons/im";

let tempUsers: User[] = [];

const Usuarios = () => {
  const theme = useTheme();
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [userModalData, setUserModalData] = useState<User>({} as User);
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [searchField, setSearchField] = useState<string>("");
  const [searchCoin, setSearchCoin] = useState<string>("");
  const { isOpen: isEditUserOpen, onOpen: onEditUserOpen, onClose: onEditUserClose } = useDisclosure();
  const { isOpen: isViewUserOpen, onOpen: onViewUserOpen, onClose: onViewUserClose } = useDisclosure();
  const { isOpen: isWalletUserOpen, onOpen: onWalletUserOpen, onClose: onWalletUserClose } = useDisclosure();

  const handleEditUserModal = (index: number) => {
    setUserModalData(users[index]);
    onEditUserOpen();
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = async () => {
    await getAllUsers()
      .then((res) => {
        tempUsers = res?.value;
        setUsers(res?.value);
      })
      .catch(() => {});
  };

  useMemo(() => {
    const filteredResult = tempUsers.filter((user) => {
      const fullName = `${user.name} ${user.surname}`.toLowerCase();
      return fullName.includes(searchField.toLowerCase());
    });
    setUsers(filteredResult);
    if (!searchField) handleGetAllUsers();
  }, [searchField]);

  useMemo(() => {
    const filteredResult = tempUsers.filter((user) => user.status == searchStatus);
    setUsers(filteredResult);
    if (!searchStatus) handleGetAllUsers();
  }, [searchStatus]);

  useMemo(() => {
    let filteredResult: User[] = [];
    if (Number(searchCoin) === 0) {
      console.log("NAO SOLICITOU ");
      filteredResult = tempUsers.filter((user) => user?.wallet?.qtdCreditosSolicitados === Number(searchCoin));
    } else {
      console.log(" SOLICITOU ");
      filteredResult = tempUsers.filter((user) => user?.wallet?.qtdCreditosSolicitados > Number(searchCoin));
    }
    setUsers(filteredResult);
    if (!searchCoin) handleGetAllUsers();
  }, [searchCoin]);

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

  const onSubmitAccepted = async () => {
    const payload = {
      aprovado: true,
    };
    const walletUpdated = await updateUserWallet(userModalData.cpf, payload);
    if (walletUpdated.value.idCarteira) {
      toast({
        id: "update-wallet-success",
        title: "Sucesso!",
        description: "Solicitação de moedas aceita!",
        status: "success",
      });
      handleGetAllUsers();
      onWalletUserClose();
    } else {
      toast({
        id: "update-wallet-error",
        title: "Error!",
        description: "Erro na aprovação de novas moedas!",
        status: "warning",
      });
    }
  };

  const onSubmitRecused = async () => {
    const payload = {
      aprovado: false,
    };
    const walletUpdated = await updateUserWallet(userModalData.cpf, payload);
    if (walletUpdated.value.idCarteira) {
      toast({
        id: "update-wallet-success",
        title: "Sucesso!",
        description: "Solicitação de moedas recusada!",
        status: "success",
      });
      handleGetAllUsers();
      onWalletUserClose();
    } else {
      toast({
        id: "update-wallet-error",
        title: "Error!",
        description: "Erro na negação de novas de moedas!",
        status: "warning",
      });
    }
  };

  const NoStationsComponent = (): JSX.Element => {
    return (
      <Flex width={"100%"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"} padding={"5% 0%"}>
        <FaRegFrownOpen size={65} color={`${theme.colors.primary.main}`} />
        <Text fontSize={24}>Nenhum usuário encontrado!</Text>
      </Flex>
    );
  };

  const HandleStationStatus = (status: any): JSX.Element => {
    return (
      <Td textTransform={"capitalize"} whiteSpace={"nowrap"}>
        <Text display={"flex"} alignItems={"center"}>
          <Text>{status}</Text>
          {status === "active" ? (
            <AiFillCheckCircle size={20} color="green" style={{ marginLeft: 5 }} />
          ) : status === "inactive" ? (
            <BiUserX size={20} color="red" style={{ marginLeft: 5 }} />
          ) : (
            <ImBlocked size={20} color="red" style={{ marginLeft: 5 }} />
          )}
        </Text>
      </Td>
    );
  };

  return (
    <>
      <div>
        <Flex flexDirection={"row"}>
          <InputGroup width={"60%"} mr={"1"} size={"md"} borderRadius={"5"} borderWidth={0} backgroundColor={`${theme.colors.white.main}`}>
            <InputRightElement className="InputLeft" pointerEvents="none">
              <GoSearch size={20} color={`${theme.colors.lightBlack.main}`} />
            </InputRightElement>
            <Input placeholder="Buscar usuários" color={`${theme.colors.lightBlack.main}`} onChange={(e) => setSearchField(e.target.value)} fontSize={14} />
          </InputGroup>
          <Select
            placeholder="Selecionar Status"
            borderRadius={"5"}
            size={"md"}
            width={"20%"}
            ml={"1"}
            mr={"1"}
            borderWidth={0}
            backgroundColor={`${theme.colors.white.main}`}
            color={`${theme.colors.lightBlack.main}`}
            fontSize={14}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </Select>
          <Select
            placeholder="Selecionar Solicitações "
            borderRadius={"5"}
            size={"md"}
            width={"20%"}
            ml={"1"}
            mr={"1"}
            borderWidth={0}
            backgroundColor={`${theme.colors.white.main}`}
            color={`${theme.colors.lightBlack.main}`}
            fontSize={14}
            onChange={(e) => setSearchCoin(e.target.value)}
          >
            <option value="1">Solicitou Moedas</option>
            <option value="0">Não Solicitou Moedas</option>
          </Select>
        </Flex>
        {users && users.length >= 1 ? (
          <TableContainer
            marginTop={3}
            border="1px"
            borderColor="gray.200"
            borderRadius={"10"}
            paddingY={5}
            paddingX={3}
            backgroundColor={`${theme.colors.white.main}`}
            sx={{
              overflowY: "scroll",
              height: "70vh",
            }}
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
                        <Td>{usuario.name + " " + usuario.surname}</Td>
                        <Td>{usuario.email}</Td>

                        {HandleStationStatus(usuario.status)}

                        <Td>
                          <Flex justify={"flex-end"} gap={3}>
                            {usuario && usuario.is_admin ? (
                              <Tooltip label="Administrador" aria-label="Administrador">
                                <button>
                                  <MdOutlineAdminPanelSettings size={22} />
                                </button>
                              </Tooltip>
                            ) : (
                              <Tooltip label="Usuário" aria-label="Usuário">
                                <button>
                                  <AiOutlineUser size={22} />
                                </button>
                              </Tooltip>
                            )}
                            {usuario && usuario?.wallet?.qtdCreditosSolicitados > 0 ? (
                              <Tooltip label="Usuário solicitou créditos" aria-label="Usuário solicitou créditos">
                                <button onClick={() => handleWalletUserModal(index)}>
                                  <BiCoinStack size={20} color={theme.colors.secundary.main} />
                                </button>
                              </Tooltip>
                            ) : (
                              <Tooltip label="Créditos" aria-label="Créditos">
                                <button onClick={() => handleWalletUserModal(index)}>
                                  <BiCoinStack size={20} />
                                </button>
                              </Tooltip>
                            )}
                            <Tooltip label="Histórico" aria-label="Histórico">
                              <button>
                                <BiHistory size={22} />
                              </button>
                            </Tooltip>

                            <Tooltip label="Visualizar" aria-label="Visualizar">
                              <button onClick={() => handleViewUserModal(index)}>
                                <AiOutlineEye size={22} />
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
        ) : (
          <NoStationsComponent />
        )}
      </div>
      <Modal isOpen={isWalletUserOpen} onClose={handleWalletUserModalClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={`${theme.colors.white.main}`} paddingBottom={2}>
          <ModalHeader>Carteira do Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={3}>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Nome
                </Text>
                <Input placeholder="Nome" color={`${theme.colors.lightBlack.main}`} fontSize={14} disabled defaultValue={userModalData.name + " " + userModalData.surname} />
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  CPF
                </Text>
                <Input placeholder="Cpf" color={`${theme.colors.lightBlack.main}`} fontSize={14} disabled defaultValue={userModalData.cpf} />
              </Flex>
              <Text fontSize={theme.fonts.modalTitle.size} textAlign={"center"}>
                Dados da Carteira
              </Text>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Quantidade atual de Créditos
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" fontSize="1.2em" bgColor={"#eaeaea"} textColor={theme.colors.white.main}>
                    $
                  </InputLeftElement>
                  <Input placeholder="Créditos atuais" type="number" disabled color={`${theme.colors.black.main}`} marginLeft={1} fontSize={14} defaultValue={userModalData.wallet?.qtdCreditos} />
                </InputGroup>
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Créditos solicitados
                </Text>

                <InputGroup>
                  <InputLeftElement pointerEvents="none" fontSize="1.2em" bgColor={"#eaeaea"} textColor={theme.colors.white.main}>
                    $
                  </InputLeftElement>
                  <Input
                    type="number"
                    placeholder="Créditos solicitados"
                    color={`${theme.colors.black.main}`}
                    fontSize={16}
                    marginLeft={1}
                    disabled
                    defaultValue={userModalData.wallet?.qtdCreditosSolicitados}
                  />
                </InputGroup>

                <Flex direction={"column"} gap={4} width={"100%"} justifyContent={"center"} alignItems={"center"} flexDirection={"row"} mt={3} paddingTop={5}>
                  <Button width={"40%"} backgroundColor={`${theme.colors.primary.main}`} color={`${theme.colors.white.main}`} onClick={onSubmitAccepted}>
                    Aceitar
                  </Button>
                  <Button width={"40%"} backgroundColor={`${theme.colors.secundary.main}`} color={`${theme.colors.white.main}`} onClick={onSubmitRecused}>
                    Recusar
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isViewUserOpen} onClose={handleViewUserModalClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={`${theme.colors.white.main}`} paddingBottom={10}>
          <ModalHeader>Visualizar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={3}>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Nome
                </Text>
                <Input placeholder="Nome" color={`${theme.colors.lightBlack.main}`} fontSize={14} disabled defaultValue={userModalData.name} />
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  CPF
                </Text>

                <Input placeholder="Nome" color={`${theme.colors.lightBlack.main}`} fontSize={14} disabled defaultValue={userModalData.cpf} />
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Email
                </Text>
                <Input placeholder="Nome" color={`${theme.colors.lightBlack.main}`} fontSize={14} disabled defaultValue={userModalData.email} />
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Telefone
                </Text>
                <Input placeholder="Nome" color={`${theme.colors.lightBlack.main}`} fontSize={14} disabled defaultValue={userModalData.telefone ? userModalData.telefone : `Não cadastrado`} />
              </Flex>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
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
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Admin
                </Text>
                <Checkbox disabled colorScheme="green" defaultChecked={userModalData.is_admin} checked={userModalData.is_admin} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditUserOpen} onClose={handleEditUserModalClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={`${theme.colors.white.main}`}>
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={3}>
              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Nome
                </Text>
                <Input placeholder="Nome" color={`${theme.colors.lightBlack.main}`} fontSize={14} disabled defaultValue={userModalData.name} />
              </Flex>

              <Flex direction={"column"} gap={0.5}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
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
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
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
                backgroundColor={`${theme.colors.primary.main}`}
                color={`${theme.colors.white.main}`}
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
