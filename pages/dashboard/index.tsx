'use client'
import Navbar from "../../components/Navbar"
import { Flex, useTheme } from "@chakra-ui/react"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import Postos from "../postos"
import Mapa from "../mapa"
import Usuarios from "../usuarios"
import Historico from "../historico"
import AuthProtect from "../../components/AuthProtect"

function Dashboard() {
  const theme = useTheme()

  return (
    <AuthProtect>
      <Navbar />
      <Flex height='100vh' direction='column' padding='2% 10%'>
        <Tabs>
          <TabList>
            <Tab _selected={{ color: 'white', bg: theme.colors.primary.main, borderTopRadius: '10px' }}>Mapa</Tab>
            <Tab _selected={{ color: 'white', bg: theme.colors.primary.main, borderTopRadius: '10px' }}>Postos</Tab>
            <Tab _selected={{ color: 'white', bg: theme.colors.primary.main, borderTopRadius: '10px' }}>Usuários</Tab>
            <Tab _selected={{ color: 'white', bg: theme.colors.primary.main, borderTopRadius: '10px' }}>Histórico</Tab>
          </TabList>
          <TabPanels>
            <TabPanel style={{ paddingRight: 0, paddingLeft: 0 }}>
              <Mapa />
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
  )
}

export default Dashboard