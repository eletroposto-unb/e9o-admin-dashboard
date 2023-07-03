/* eslint-disable react/jsx-key */
/* eslint-disable react/no-children-prop */
import React, { useMemo, useEffect, useState } from "react";
import {
  Flex,
  Input,
  Select,
  Button,
  useTheme,
  InputGroup,
  InputRightElement,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tooltip,
  Text,
  useToast,
  Link,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { GoPlus, GoSearch } from "react-icons/go";
import { AiOutlineEye, AiFillCheckCircle } from "react-icons/ai";
import { GrVmMaintenance } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { FaRegFrownOpen } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getAllStations, deleteStation } from "@/services/station";
import { Stations } from "@/dto/station.dto";
import { firestore } from "@/firebase/config";
import { onSnapshot, doc, getDocs, collection } from "firebase/firestore";

const THeadData = ["Nome", "Local", "Comodidade", "Status", "Ações"];
let tempStations: Stations[] = [];

interface FirestoreStation {
  battery_temperature?: number;
  battery_voltage?: number;
  battery_current?: number;
  charge?: boolean;
  charge_start_time?: string;
  charge_time?: number;
  inverter_current?: number;
  status?: string;
  totem_temperature?: number;
  totem_humidity?: number;
}

function Postos() {
  const theme = useTheme();
  const toast = useToast();
  const router = useRouter();
  const [stations, setStations] = useState<Stations[]>([]);
  const [searchField, setSearchField] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [selectedStation, setSelectedStation] = useState<number | null>();
  const [embeddedStation, setEmbeddedStation] = useState<FirestoreStation | null>();

  useEffect(() => {
    handleAllStation();
  }, []);

  const handleAllStation = async () => {
    const data = await getAllStations();
    tempStations = data?.value;
    setStations(data?.value);
  };

  useMemo(() => {
    const filteredResult = stations.filter((s) => s?.station.nome.toLowerCase().includes(searchField));
    setStations(filteredResult);
    if (!searchField) handleAllStation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField]);

  useMemo(() => {
    const filteredResult = tempStations.filter((s) => s?.station?.statusFuncionamento == searchStatus);
    setStations(filteredResult);
    if (!searchStatus) handleAllStation();
  }, [searchStatus]);

  useMemo(() => {
    const filteredResult = tempStations.filter((s) => s?.address?.comodidade == searchLocation);
    setStations(filteredResult);
    if (!searchLocation) handleAllStation();
  }, [searchLocation]);

  const handleDeleteStation = async (idPosto: number) => {
    const stationDeleted = await deleteStation(idPosto);
    if (stationDeleted?.value?.idPosto) {
      toast({
        id: "delete-station-success",
        title: "Sucesso!",
        description: "A Estação de Carregamento foi deletada com sucesso!",
        status: "success",
      });
    } else {
      toast({
        id: "delete-station-error",
        title: "Alerta!",
        description: "Erro na deleção da Estação de Carregamento. Tente novamente!",
        status: "warning",
      });
    }
    handleAllStation();
  };

  useEffect(() => {
    if (selectedStation !== undefined) {
      const unsub = onSnapshot(doc(firestore, "station", (1).toString()), (doc) => {
        const data = doc.data() as FirestoreStation;
        setEmbeddedStation({ ...data, charge_start_time: data.charge_start_time !== undefined ? new Date(doc.data()?.charge_start_time.toDate()).toLocaleString() : undefined });
      });

      return () => {
        unsub();
      };
    }
  }, [selectedStation]);

  const handleStationVisualization = (index: number) => {
    setSelectedStation(index);
  };

  const handleStationModalClose = () => {
    setSelectedStation(undefined);
  };

  const NoStationsComponent = (): JSX.Element => {
    return (
      <Flex width={"100%"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"} padding={"5% 0%"}>
        <FaRegFrownOpen size={65} color={`${theme.colors.primary.main}`} />
        <Text fontSize={24}>Nenhum posto encontrado!</Text>
        <Text fontSize={14}>Cadastre o primeiro posto agora mesmo.</Text>
      </Flex>
    );
  };

  const HandleStationStatus = (status: any): JSX.Element => {
    return (
      <Td textTransform={"capitalize"} whiteSpace={"nowrap"}>
        <Text display={"flex"} alignItems={"center"}>
          <Text>{status}</Text>
          {status === "disponivel" ? (
            <AiFillCheckCircle size={20} color="green" style={{ marginLeft: 5 }} />
          ) : status === "em manutencao" ? (
            <GrVmMaintenance size={20} color="red" style={{ marginLeft: 5 }} />
          ) : (
            <ImBlocked size={20} color="red" style={{ marginLeft: 5 }} />
          )}
        </Text>
      </Td>
    );
  };

  return (
    <Flex w="100%" h="80vh" flexDir="column">
      <Flex flexDirection={"row"}>
        <InputGroup width={"40%"} mr={"1"} size={"md"} borderRadius={"5"} borderWidth={0} backgroundColor={`${theme.colors.white.main}`}>
          <InputRightElement className="InputLeft" pointerEvents="none">
            <GoSearch size={20} color={`${theme.colors.lightBlack.main}`} />
          </InputRightElement>
          <Input placeholder="Buscar postos" color={`${theme.colors.lightBlack.main}`} onChange={(e) => setSearchField(e.target.value)} fontSize={14} />
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
          <option value="disponivel">Disponível</option>
          <option value="indisponivel">Indisponível</option>
          <option value="bloqueado">Bloqueado</option>
          <option value="em manutencao">Em Manutenção</option>
          <option value="inativo">Inativo</option>
        </Select>
        <Select
          placeholder="Selecionar Comodidade"
          borderRadius={"5"}
          width={"20%"}
          size={"md"}
          ml={"1"}
          mr={"1"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
          color={`${theme.colors.lightBlack.main}`}
          onChange={(e) => setSearchLocation(e.target.value)}
          fontSize={14}
        >
          <option value="Estacionamento Público">Estacionamento Público</option>
          <option value="Estacionamento Privado">Estacionamento Privado</option>
          <option value="Shopping">Shooping</option>
          <option value="Faculdade/Universidade">Faculdade/Universidade</option>
          <option value="Órgãos Públicos">Órgãos Públicos</option>
          <option value="Loja">Loja</option>
          <option value="Outro">Outro</option>
        </Select>
        <Button
          backgroundColor={`${theme.colors.success.main}`}
          color={`${theme.colors.white.main}`}
          width={"20%"}
          fontSize={14}
          ml={"1"}
          borderRadius={"5"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={() => router.push("/createChargeStation")}
        >
          <GoPlus size={20} style={{ marginRight: 5 }} />
          {/* <Link as={NextLink} href="/createChargeStation"> */}
          Criar Posto
        </Button>
      </Flex>
      <Flex width={"100%"} marginTop={3}>
        {stations?.length >= 1 ? (
          <TableContainer width={"100%"} paddingY={5} paddingX={3} borderRadius={10} backgroundColor={`${theme.colors.white.main}`}>
            <Table size="sm">
              <Thead>
                {THeadData.map((name, index) => {
                  return (
                    <Th key={index} textAlign={index === 4 ? "right" : "left"}>
                      {name}
                    </Th>
                  );
                })}
              </Thead>
              <Tbody>
                {stations.map((s: Stations, index) => {
                  return (
                    <Tr key={`${index}-${s?.station}`}>
                      <Td>{s?.station.nome}</Td>
                      <Td>{s?.address.endereco}</Td>
                      <Td>{s?.address.comodidade}</Td>
                      {HandleStationStatus(s?.station.statusFuncionamento)}
                      <Td display={"flex"} justifyContent={"flex-end"}>
                        <Flex gap={2}>
                          <Tooltip label="Visualizar Posto" aria-label="Visualizar Posto" justifyContent={"center"}>
                            <button>
                              <AiOutlineEye onClick={() => handleStationVisualization(index)} size={22} color={`${theme.colors.black.main}`} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Editar Posto" aria-label="Editar Posto">
                            <button>
                              <FiEdit
                                onClick={() =>
                                  router.push({
                                    pathname: "/createChargeStation",
                                    query: {
                                      idPosto: `${s.station.idPosto}`,
                                    },
                                  })
                                }
                                size={18}
                                color={`${theme.colors.black.main}`}
                              />
                            </button>
                          </Tooltip>
                          <Tooltip label="Excluir Posto" aria-label="Excluir Posto">
                            <button>
                              <MdOutlineDeleteOutline onClick={() => handleDeleteStation(s.station.idPosto)} size={21} color={`${theme.colors.black.main}`} />
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
      </Flex>
      <Modal isOpen={selectedStation !== undefined} onClose={handleStationModalClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={`${theme.colors.white.main}`} paddingBottom={10}>
          <ModalHeader>{`Totem posto ${selectedStation! + 1}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={3} fontSize={18}>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Status
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {embeddedStation?.status}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Temperatura da bateria
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {`${embeddedStation?.battery_temperature} °C`}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Voltagem da bateria
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {`${embeddedStation?.battery_voltage} V`}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Corrente da bateria
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {`${embeddedStation?.battery_current !== undefined ? embeddedStation?.battery_current : 0} A`}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Corrente do inversor
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {`${embeddedStation?.inverter_current} A`}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Temperatura do totem
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {`${embeddedStation?.totem_temperature} °C`}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Umidade do totem
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {`${embeddedStation?.totem_humidity} %`}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Tempo de carregamento
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {`${embeddedStation?.charge_time} minutos`}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Horario de início de carregamento
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {embeddedStation?.charge_start_time}
                </Text>
              </Flex>
              <Flex direction={"row"} gap={2} alignItems={"center"}>
                <Text color={theme.fonts.modalLabel.color} fontSize={theme.fonts.modalLabel.size}>
                  Carregando
                </Text>
                <Text color={`${theme.colors.totemData.main}`} fontSize={14} fontWeight={700}>
                  {embeddedStation?.charge ? "Sim" : "Não"}
                </Text>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Postos;
