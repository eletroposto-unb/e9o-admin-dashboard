import React, { useMemo, useEffect, useState } from "react";
import {
  Flex,
  Input,
  Select,
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
  Text,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { FaRegFrownOpen } from "react-icons/fa";
import { getAllHistories } from "@/services/history";
import { getAllStations } from "@/services/station";
import { Station } from "@/dto/station.dto";

let historyData: any[] = [];

const THeadData = [
  "Eletroposto",
  "Usuário",
  "Carro",
  "Custo",
  "Data de Entrada",
  "Data de Saída",
];

function History() {
  const theme = useTheme();
  const [searchField, setSearchField] = useState("");
  const [filterByPrice, setFilterByPrice] = useState("");
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByStation, setFilterByStation] = useState("");
  const [histories, setHistories] = useState<History[]>([]);
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    handleAllHistories();
    handleAllStations();
  }, []);

  const handleAllStations = async () => {
    const res = await getAllStations();
    setStations(res.value);
  };

  const handleAllHistories = async () => {
    const histories = await getAllHistories();
    setHistories(histories.value.history);
    historyData = histories.value.history;
  };

  const handleFormatDate = (date: Date) => {
    const dataObj = new Date(date);
    const dia = dataObj.getDate().toString().padStart(2, "0");
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataObj.getFullYear().toString();
    const hora = dataObj.getHours().toString().padStart(2, "0");
    const minuto = dataObj.getMinutes().toString().padStart(2, "0");
    const segundo = dataObj.getSeconds().toString().padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
  };

  useMemo(() => {
    if (searchField) {
      const tableFiltered = histories.filter((history: any) =>
        history.posto.nome.toLowerCase().includes(searchField.toLowerCase())
      );
      historyData = tableFiltered;
    } else {
      historyData = histories;
    }
  }, [searchField]);

  useMemo(() => {
    if (filterByStation) {
      const tableFiltered = histories.filter((history: any) =>
        history?.posto.nome
          .toLowerCase()
          .includes(filterByStation.toLowerCase())
      );
      historyData = tableFiltered;
    } else {
      historyData = histories;
    }
  }, [filterByStation]);

  function comparePrice(a: { valorTotal: number }, b: { valorTotal: number }) {
    if (a.valorTotal < b.valorTotal) return -1;
    if (a.valorTotal > b.valorTotal) return 1;
    return 0;
  }

  useMemo(() => {
    if (filterByPrice === "Mais Caro")
      historyData = historyData.sort(comparePrice).reverse();
    else historyData = historyData.sort(comparePrice);
  }, [filterByPrice]);

  function sortByOldest(a: any, b: any) {
    const dataEntradaA = new Date(a.horarioEntrada);
    const dataEntradaB = new Date(b.horarioSaida);
    return Number(dataEntradaA) - Number(dataEntradaB);
  }

  function sortByNewest(a: any, b: any) {
    const dataEntradaA = new Date(a.horarioEntrada);
    const dataEntradaB = new Date(b.horarioSaida);
    return Number(dataEntradaB) - Number(dataEntradaA);
  }

  useMemo(() => {
    if (filterByDate === "Mais Recente")
      historyData = historyData.sort(sortByNewest);
    else historyData = historyData.sort(sortByOldest);
  }, [filterByDate]);

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
        <Text fontSize={24}>Nenhum registro de uso encontrado!</Text>
        <Text fontSize={14}>Cadastre o primeiro posto agora mesmo.</Text>
      </Flex>
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
          <InputRightElement className="InputLeft" pointerEvents="none">
            <GoSearch size={20} color={`${theme.colors.lightBlack.main}`} />
          </InputRightElement>
          <Input
            placeholder="Buscar histórico por posto"
            color={`${theme.colors.lightBlack.main}`}
            onChange={(e) => setSearchField(e.target.value)}
            fontSize={14}
          />
        </InputGroup>
        <Select
          placeholder="Selecione o Posto"
          borderRadius={"5"}
          width={"20%"}
          size={"md"}
          ml={"1"}
          mr={"1"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
          color={`${theme.colors.lightBlack.main}`}
          onChange={(e) => setFilterByStation(e.target.value)}
          fontSize={14}
        >
          {stations?.map((s: any, index: any) => {
            return (
              <option key={`${s.station}-${index}`} value={s.station.nome}>
                {s.station.nome}
              </option>
            );
          })}
        </Select>
        <Select
          placeholder="Custo"
          borderRadius={"5"}
          width={"20%"}
          size={"md"}
          ml={"1"}
          mr={"1"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
          color={`${theme.colors.lightBlack.main}`}
          onChange={(e) => setFilterByPrice(e.target.value)}
          fontSize={14}
        >
          <option value="Mais Caro">Mais Caro</option>
          <option value="Mais Barato">Mais Barato</option>
        </Select>
        <Select
          placeholder="Data de Entrada"
          borderRadius={"5"}
          size={"md"}
          width={"20%"}
          ml={"1"}
          mr={"1"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
          color={`${theme.colors.lightBlack.main}`}
          fontSize={14}
          onChange={(e) => setFilterByDate(e.target.value)}
        >
          <option value="Mais Recente">Mais Recente</option>
          <option value="Mais Antigo">Mais Antigo</option>
        </Select>
      </Flex>
      <Flex width={"100%"} marginTop={3}>
        {historyData.length >= 1 ? (
          <TableContainer
            width={"100%"}
            paddingY={5}
            paddingX={3}
            borderRadius={10}
            backgroundColor={`${theme.colors.white.main}`}
            sx={{
              overflowY: historyData?.length >= 10 && "scroll",
              height: historyData?.length >= 10 ? "70vh" : "auto",
            }}
          >
            <Table size="sm">
              <Thead>
                {THeadData.map((name, index) => {
                  return (
                    <Th
                      key={index}
                      textAlign={name === "Custo" ? "center" : "left"}
                    >
                      {name}
                    </Th>
                  );
                })}
              </Thead>
              <Tbody>
                {historyData?.map((history, index) => {
                  return (
                    <Tr key={`${index}-${history?.Usuário}`}>
                      <Td>{history.posto.nome}</Td>
                      <Td>
                        {`${history.usuario.name} ${history.usuario.surname}`}
                      </Td>
                      <Td>
                        {history.carro.modelo} - {history.carro.placa}{" "}
                      </Td>
                      <Td textAlign={"center"}>{history.valorTotal} Moedas</Td>
                      <Td>{handleFormatDate(history.horarioEntrada)}</Td>
                      <Td>{handleFormatDate(history.horarioSaida)}</Td>
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

export default History;
