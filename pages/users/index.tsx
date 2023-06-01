import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, TableCaption, Flex } from "@chakra-ui/react";
import { BiHistory, BiCoinStack, BiEdit } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { Tooltip } from "@chakra-ui/react";

function Usuarios() {
  return (
    <div>
      <TableContainer border="1px" borderColor="gray.200" borderRadius={"4"} padding={3}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th textAlign="end">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockUSuarios.map((usuario) => {
              return (
                <Tr key={`${usuario.id}-${usuario.email}`}>
                  <Td>{usuario.nome}</Td>
                  <Td>{usuario.email}</Td>
                  <Td>
                    <Flex justify={"flex-end"}>
                    <Tooltip label="Histórico" aria-label="Histórico">
                        <button>
                          <BiHistory size={24}/>
                        </button>
                      </Tooltip>
                      <Tooltip label="Créditos" aria-label="Créditos">
                        <button>
                          <BiCoinStack size={24}/>
                        </button>
                      </Tooltip>
                      <Tooltip label="Administrador" aria-label="Administrador">
                        <button>
                          <MdOutlineAdminPanelSettings size={24}/>
                        </button>
                      </Tooltip>
                      <Tooltip label="Visualizar" aria-label="Visualizar">
                        <button>
                          <AiFillEye size={24}/>
                        </button>
                      </Tooltip>
                      <Tooltip label="Editar" aria-label="Editar">
                        <button>
                          <BiEdit size={24}/>
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
  );
}

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
