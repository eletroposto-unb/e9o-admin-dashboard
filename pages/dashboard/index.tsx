"use client";
import Navbar from "../../components/Navbar";
import { Flex, useTheme } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Postos from "../chargeStations";
import ChargeStationMap from "../chargeStationMap";
import Usuarios from "../users";
import Historico from "../history";
import AuthProtect from "../../components/AuthProtect";

function Dashboard() {
  const theme = useTheme();

  return (
    <AuthProtect>
      <Navbar />
      <Flex
        height="100vh"
        direction="column"
        padding="2% 10%"
        backgroundColor={`${theme.colors.lightGray.main}`}
      >
        <Tabs>
          <TabList>
            <Tab
              _selected={{
                color: "white",
                bg: theme.colors.primary.main,
                borderTopRadius: "10px",
              }}
            >
              Mapa
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: theme.colors.primary.main,
                borderTopRadius: "10px",
              }}
            >
              Postos
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: theme.colors.primary.main,
                borderTopRadius: "10px",
              }}
            >
              Usuários
            </Tab>
            <Tab
              _selected={{
                color: "white",
                bg: theme.colors.primary.main,
                borderTopRadius: "10px",
              }}
            >
              Histórico
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel style={{ paddingRight: 0, paddingLeft: 0 }}>
              <ChargeStationMap />
            </TabPanel>
            <TabPanel>
              <Postos />
            </TabPanel>
            <TabPanel>
              <Usuarios />
            </TabPanel>
            <TabPanel>
              <Historico />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </AuthProtect>
  );
}

export default Dashboard;
