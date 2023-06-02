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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GoPlus, GoSearch } from "react-icons/go";
import { AiFillEye, AiFillCheckCircle } from "react-icons/ai";
import { GrVmMaintenance } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { FaRegFrownOpen } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getAllStations, deleteStation } from "@/services/station";

const THeadData = ["Nome", "Local", "Comodidade", "Status", "Ações"];

function Postos() {
  const theme = useTheme();
  const toast = useToast();
  const router = useRouter();
  const [stations, setStations] = useState([]);

  useEffect(() => {
    handleAllStation();
  }, []);

  const handleAllStation = async () => {
    const data = await getAllStations();
    console.log("data", data?.value);
    setStations(data?.value);
  };

  const handleDeleteStation = async (idPosto: number) => {
    const stationDeleted = await deleteStation(idPosto);
    console.log("stationDeleted", stationDeleted?.value);
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
        description:
          "Erro na deleção da Estação de Carregamento. Tente novamente!",
        status: "warning",
      });
    }
    handleAllStation();
  };

  const NoStationsComponent = (): JSX.Element => {
    return (
      <Flex
        width={"100%"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        padding={"5% 0%"}
      >
        <FaRegFrownOpen size={65} color={`${theme.colors.primary.main}`} />
        <Text fontSize={24}>Nenhum posto cadastrado!</Text>
        <Text fontSize={14}>Cadastre o primeiro posto agora mesmo.</Text>
      </Flex>
    );
  };

  const HandleStationStatus = (status): JSX.Element => {
    return (
      <Td textTransform={"capitalize"} whiteSpace={"nowrap"}>
        <Text display={"flex"} alignItems={"center"}>
          <Text>{status}</Text>
          {status === "disponivel" ? (
            <AiFillCheckCircle
              size={20}
              color="green"
              style={{ marginLeft: 5 }}
            />
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
        <InputGroup
          width={"40%"}
          mr={"1"}
          size={"md"}
          borderRadius={"5"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
        >
          <InputRightElement
            className="InputLeft"
            pointerEvents="none"
            children={
              <GoSearch size={20} color={`${theme.colors.lightBlack.main}`} />
            }
          />
          <Input
            placeholder="Buscar postos"
            color={`${theme.colors.lightBlack.main}`}
            fontSize={14}
          />
        </InputGroup>
        <Select
          placeholder="Selecionar Cidade"
          borderRadius={"5"}
          size={"md"}
          width={"20%"}
          ml={"1"}
          mr={"1"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
          color={`${theme.colors.lightBlack.main}`}
          fontSize={14}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select
          placeholder="Selecionar Status"
          borderRadius={"5"}
          width={"20%"}
          size={"md"}
          ml={"1"}
          mr={"1"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
          color={`${theme.colors.lightBlack.main}`}
          fontSize={14}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
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
          Criar posto
        </Button>
      </Flex>
      <Flex width={"100%"} marginTop={3}>
        {stations.length >= 1 ? (
          <TableContainer
            width={"100%"}
            paddingY={5}
            paddingX={3}
            borderRadius={10}
            backgroundColor={`${theme.colors.white.main}`}
          >
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
                {stations.map((station, index) => {
                  console.log("station", station);
                  return (
                    <Tr>
                      <Td>{station.nome}</Td>
                      <Td>{station.local}</Td>
                      <Td>{station.comodidade}</Td>
                      {HandleStationStatus(station.statusFuncionamento)}
                      <Td display={"flex"} justifyContent={"flex-end"}>
                        <Flex gap={2}>
                          <Tooltip
                            label="Visualizar Posto"
                            aria-label="Visualizar Posto"
                            justifyContent={"center"}
                          >
                            <button>
                              <AiFillEye
                                onClick={() => console.log("Visualizar")}
                                size={20}
                                color={`${theme.colors.black.main}`}
                              />
                            </button>
                          </Tooltip>
                          <Tooltip
                            label="Editar Posto"
                            aria-label="Editar Posto"
                          >
                            <button>
                              <FiEdit
                                onClick={() => console.log("Editar")}
                                size={18}
                                color={`${theme.colors.black.main}`}
                              />
                            </button>
                          </Tooltip>
                          <Tooltip
                            label="Editar Posto"
                            aria-label="Editar Posto"
                          >
                            <button>
                              <MdOutlineDeleteOutline
                                onClick={() =>
                                  handleDeleteStation(station.idPosto)
                                }
                                size={21}
                                color={`${theme.colors.black.main}`}
                              />
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
    </Flex>
  );
}

export default Postos;
