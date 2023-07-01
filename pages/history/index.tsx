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

let mockHistory = [
  {
    Eletroposto: "EletroPosto FGA UnB",
    Usuário: "Victor Samuel dos Santos Lucas",
    Carro: "Golf GTE",
    Custo: 10,
    Data_de_Entrada: "2023-06-14 22:49:21",
    Data_de_Saída: "2023-06-14 22:49:21",
  },
  {
    Eletroposto: "EletroPosto FGA",
    Usuário: "Victor Samuel dos Santos Lucas",
    Carro: "Golf GTE",
    Custo: 11,
    Data_de_Entrada: "2023-06-15 22:49:21",
    Data_de_Saída: "2023-06-14 22:49:21",
  },
  {
    Eletroposto: "EletroPosto IFB",
    Usuário: "Victor Samuel dos Santos Lucas",
    Carro: "Golf GTE",
    Custo: 12,
    Data_de_Entrada: "2023-06-25 22:49:21",
    Data_de_Saída: "2023-06-14 22:49:21",
  },
  {
    Eletroposto: "EletroPosto Gammagiore",
    Usuário: "Victor Samuel dos Santos Lucas",
    Carro: "Golf GTE",
    Custo: 13,
    Data_de_Entrada: "2023-06-21 22:49:21",
    Data_de_Saída: "2023-06-14 22:49:21",
  },
  {
    Eletroposto: "EletroPosto IFB 2",
    Usuário: "Victor Samuel dos Santos Lucas",
    Carro: "Golf GTE",
    Custo: 14,
    Data_de_Entrada: "2023-06-18 22:49:21",
    Data_de_Saída: "2023-06-14 22:49:21",
  },
];

let historyData = [];

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

  useMemo(() => {
    if (searchField) {
      const tableFiltered = mockHistory.filter((history) =>
        history.Eletroposto.toLowerCase().includes(searchField.toLowerCase())
      );
      historyData = tableFiltered;
    } else {
      historyData = mockHistory;
    }
  }, [searchField]);

  function comparePrice(a, b) {
    if (a.Custo < b.Custo) return -1;
    if (a.Custo > b.Custo) return 1;
    return 0;
  }

  useMemo(() => {
    if (filterByPrice === "Mais Caro")
      historyData = mockHistory.sort(comparePrice).reverse();
    else historyData = mockHistory.sort(comparePrice);
  }, [filterByPrice]);

  function sortByOldest(a, b) {
    const dataEntradaA = new Date(a.Data_de_Entrada);
    const dataEntradaB = new Date(b.Data_de_Entrada);
    return dataEntradaA - dataEntradaB;
  }

  function sortByNewest(a, b) {
    const dataEntradaA = new Date(a.Data_de_Entrada);
    const dataEntradaB = new Date(b.Data_de_Entrada);
    return dataEntradaB - dataEntradaA;
  }

  useMemo(() => {
    if (filterByDate === "Mais Recente")
      historyData = mockHistory.sort(sortByNewest);
    else historyData = mockHistory.sort(sortByOldest);
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
          width={"60%"}
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
            placeholder="Buscar histórico por usuário ou posto"
            color={`${theme.colors.lightBlack.main}`}
            onChange={(e) => setSearchField(e.target.value)}
            fontSize={14}
          />
        </InputGroup>
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
        {historyData?.length >= 1 ? (
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
                {historyData.map((history, index) => {
                  return (
                    <Tr key={`${index}-${history?.Usuário}`}>
                      <Td>{history.Eletroposto}</Td>
                      <Td>{history.Usuário}</Td>
                      <Td>{history.Carro}</Td>
                      <Td textAlign={"center"}>{history.Custo} Moedas</Td>
                      <Td>{history.Data_de_Entrada}</Td>
                      <Td>{history.Data_de_Saída}</Td>
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
