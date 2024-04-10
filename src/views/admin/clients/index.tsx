/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import DevelopmentTable from "../../../views/admin/clients/components/DevelopmentTable";
import CheckTable from "../../../views/admin/clients/components/CheckTable";
import ColumnsTable from "../../../views/admin/clients/components/ColumnsTable";
import ComplexTable from "../../../views/admin/clients/components/ComplexTable";
import tableDataDevelopment from "../../../views/admin/clients/variables/tableDataDevelopment";
import tableDataCheck from "../../../views/admin/clients/variables/tableDataCheck";
import tableDataColumns from "../../../views/admin/clients/variables/tableDataColumns";
import tableDataComplex from "../../../views/admin/clients/variables/tableDataComplex";
import { marginTopDefault, marginTopMobile } from "../../../layouts/contants";

import { MdPersonAdd, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { darkBgForm, lightBgForm } from "../../../components/form/variables";

export default function Settings() {
  // Chakra Color Mode
  const navigate = useNavigate();
  const formBg = useColorModeValue(lightBgForm, darkBgForm);
  const borderOutlineButton = useColorModeValue("brand.700", "brand.400");

  return (
    <Box pt={{ base: marginTopMobile, md: "80px", xl: marginTopDefault }}>
      <Box px="1rem">
        <Tabs position="relative" variant="unstyled" flexWrap="wrap">
          <Flex
            flexWrap="wrap-reverse"
            justifyContent={{ sm: "start", md: "space-between" }}
            pr={{ base: "0", md: "1rem" }}
            gap={3}
          >
            <TabList
              display="flex"
              flexWrap="nowrap"
              overflowX="auto"
              pl="1rem"
            >
              <Tab>Ingresos</Tab>
              <Tab>Suscripciones</Tab>
              <Tab>Reportes</Tab>
            </TabList>

            <Button
              colorScheme="brand"
              borderColor={borderOutlineButton}
              textColor={borderOutlineButton}
              width={{ base: "full", md: "150px" }}
              leftIcon={<MdPersonAdd />}
              borderRadius="10px"
              variant="outline"
              onClick={() => navigate("./new")}
            >
              Nuevo Cliente
            </Button>
          </Flex>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="teal.300"
            borderRadius="1px"
            pl="1rem"
          />

          <TabPanels>
            <TabPanel>
              <Box bgColor={formBg} borderRadius={8} p={1} mb={4}>
                <form>
                  <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 4 }}
                    p={4}
                    spacing={2}
                  >
                    <FormControl>
                      <FormLabel>Cedula</FormLabel>
                      <Input placeholder="Cedula..." />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Nombre(s)</FormLabel>
                      <Input type="text" placeholder="Nombre(s)" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Apellidos</FormLabel>
                      <Input type="text" placeholder="Apellidos" />
                    </FormControl>
                  </SimpleGrid>
                  <Flex justifyContent="flex-end">
                    <Button
                      width={{ base: "full", md: "150px" }}
                      leftIcon={<MdSearch />}
                      bg="brand.400"
                      px="2rem"
                      borderRadius="8px"
                    >
                      Buscar...
                    </Button>
                  </Flex>
                </form>
              </Box>
              <SimpleGrid
                mb="20px"
                columns={{ sm: 1, md: 1 }}
                spacing={{ base: "20px", xl: "20px" }}
              >
                <DevelopmentTable tableData={tableDataDevelopment} />
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid
                mb="20px"
                columns={{ sm: 1, md: 1 }}
                spacing={{ base: "20px", xl: "20px" }}
              >
                <CheckTable tableData={tableDataCheck} />
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid
                mb="20px"
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}
              >
                <DevelopmentTable tableData={tableDataDevelopment} />
                <CheckTable tableData={tableDataCheck} />
                <ColumnsTable tableData={tableDataColumns} />
                <ComplexTable tableData={tableDataComplex} />
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
