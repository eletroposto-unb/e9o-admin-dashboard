import { Popup } from "react-leaflet";
import { Flex, Text, useTheme, Button } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

const CustomPopup = ({ currentStation }): JSX.Element => {
  const theme = useTheme();

  const handleStatus = (status: string) => {
    return status === "disponivel" ? (
      <span style={{ color: "green" }}>{status}</span>
    ) : (
      <span style={{ color: "red" }}>{status}</span>
    );
  };

  return (
    <Popup>
      <Flex
        width={"300px"}
        height={"230px"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Text fontWeight={"bold"}>{currentStation.station.nome}</Text>
        <p>
          {" "}
          <span style={{ display: "block" }}>
            {currentStation.station.descricao}
          </span>
          <span
            style={{
              display: "block",
              fontWeight: "bold",
            }}
          >
            {currentStation.station.horarioFuncionamento}
          </span>
          <span style={{ display: "block", textTransform: "capitalize" }}>
            {currentStation.address.endereco}
          </span>
          <span style={{ display: "block", textTransform: "capitalize" }}>
            {currentStation.address.cidade} - {currentStation.address.estado} -
            CEP: {currentStation.address.cep}
          </span>
          <span style={{ display: "block", textTransform: "capitalize" }}>
            {currentStation.address.comodidade}
          </span>
          <span
            style={{
              display: "block",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {handleStatus(currentStation.station.statusFuncionamento)}
          </span>
        </p>
        <Button
          padding={"5% 5%"}
          backgroundColor={`${theme.colors.primary.main}`}
          color={`${theme.colors.white.main}`}
          fontSize={12}
          maxH={8}
        >
          Detalhes do posto <FiArrowRight size={20} style={{ marginLeft: 5 }} />
        </Button>
      </Flex>
    </Popup>
  );
};

export default CustomPopup;
