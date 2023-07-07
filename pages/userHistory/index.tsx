import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  useTheme,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { FaRegFrownOpen } from "react-icons/fa";
import AuthProtect from "@/components/AuthProtect";
import Navbar from "@/components/Navbar";
import { getHistoryByCpf } from "@/services/history";

const THeadData = [
  "Eletroposto",
  "Carro",
  "Custo",
  "Data de Entrada",
  "Data de Saída",
];

const UserHistory = () => {
  const theme = useTheme();
  const router = useRouter();
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    async function fetchMyAPI() {
      if (router.query.cpf) {
        const currentHistory = await getHistoryByCpf(router.query.cpf);
        console.log("currentHistory", currentHistory.value);
        setHistory(currentHistory.value.history);
      }
    }
    fetchMyAPI();
  }, []);

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
      </Flex>
    );
  };

  return (
    <AuthProtect>
      <Navbar />
      <Flex
        w="100%"
        minHeight={"calc(100vh - 74px)"}
        h="auto"
        flexDir="column"
        padding="2% 10% 5% 10%"
        backgroundColor={`${theme.colors.lightGray.main}`}
      >
        <BiArrowBack
          size={25}
          color={`${theme.colors.primary.main}`}
          onClick={() => router.back()}
          style={{ cursor: "pointer", marginBottom: 10 }}
        />
        <Text>
          Histórico
          <Text fontWeight={"bold"} fontSize={18}>
            {router.query.name}
          </Text>
        </Text>

        <Flex mt={5}>
          {history && history?.length < 1 ? (
            <NoStationsComponent />
          ) : (
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
                  {history &&
                    history.length >= 1 &&
                    history.map((h: any, index: any) => {
                      return (
                        <Tr key={`${index}-${h?.cpf}`}>
                          <Td>{h.posto.nome}</Td>
                          <Td>
                            {h.carro.modelo} - {h.carro.placa}{" "}
                          </Td>
                          <Td textAlign={"center"}>{h.valorTotal} Moedas</Td>
                          <Td>{handleFormatDate(h.horarioEntrada)}</Td>
                          <Td>{handleFormatDate(h.horarioSaida)}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Flex>
      </Flex>
    </AuthProtect>
  );
};

export default UserHistory;
