import { Popup } from "react-leaflet";
import { Flex, Text, useTheme, Button } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import React from "react";

const CustomPopup = ({ currentStation }: any): JSX.Element => {
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
        width={"auto"}
        height={"auto"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
      >
        <Text fontWeight={"bold"}>{currentStation.station.nome}</Text>
        <Text>
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
        </Text>
      </Flex>
    </Popup>
  );
};

export default CustomPopup;
