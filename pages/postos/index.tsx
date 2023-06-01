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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GoPlus, GoSearch } from "react-icons/go";
import { AiFillEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
const THeadData = ["Nome", "Local", "Ações"];
const TableMockData = [
  {
    name: "Eletroposto FGA",
    local: "GAMA DF",
    actions: "GAMA DF",
  },
  {
    name: "Eletroposto FGA",
    local: "GAMA DF",
    actions: "GAMA DF",
  },
  {
    name: "Eletroposto FGA",
    local: "GAMA DF",
    actions: "GAMA DF",
  },
  {
    name: "Eletroposto FGA",
    local: "GAMA DF",
    actions: "GAMA DF",
  },
];

function Postos() {
  const theme = useTheme();
  const router = useRouter();
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
              <GoSearch size={20} color={`${theme.colors.mediumGray.main}`} />
            }
          />
          <Input
            placeholder="Buscar postos"
            color={`${theme.colors.mediumGray.main}`}
          />
        </InputGroup>
        <Select
          placeholder="Selecionar Cidade"
          borderRadius={"5"}
          size={"md"}
          width={"20%"}
          mr={"1"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
          color={`${theme.colors.mediumGray.main}`}
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
          mr={"1"}
          borderWidth={0}
          backgroundColor={`${theme.colors.white.main}`}
          color={`${theme.colors.mediumGray.main}`}
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
          borderRadius={"5"}
          onClick={() => router.push("/criarPosto")}
        >
          <GoPlus size={20} />
          Criar posto
        </Button>
      </Flex>
      <Flex width={"100%"} marginTop={3}>
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
                return <Th key={index}>{name}</Th>;
              })}
            </Thead>
            <Tbody>
              {TableMockData.map((posto, index) => {
                return (
                  <Tr>
                    <Td>{posto.name}</Td>
                    <Td>{posto.local}</Td>
                    <Td>
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
                        <Tooltip label="Editar Posto" aria-label="Editar Posto">
                          <button>
                            <FiEdit
                              onClick={() => console.log("Editar")}
                              size={18}
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
      </Flex>
    </Flex>
  );
}

export default Postos;
