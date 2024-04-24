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
import { marginTopDefault, marginTopMobile } from "../../../layouts/contants";
import CheckTable from "../../../views/admin/clients/components/CheckTable";
import ColumnsTable from "../../../views/admin/clients/components/ColumnsTable";
import ComplexTable from "../../../views/admin/clients/components/ComplexTable";
import DevelopmentTable from "../../../views/admin/clients/components/DevelopmentTable";
import tableDataCheck from "../../../views/admin/clients/variables/tableDataCheck";
import tableDataColumns from "../../../views/admin/clients/variables/tableDataColumns";
import tableDataComplex from "../../../views/admin/clients/variables/tableDataComplex";
import tableDataDevelopment from "../../../views/admin/clients/variables/tableDataDevelopment";

import { MdPersonAdd, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  darkBgForm,
  darkBrandBgColor,
  lightBgForm,
  lightBrandBgColor,
} from "../../../components/form/variables";
import Clients from "./components/Tabs/client";

export default function Settings() {
  // Chakra Color Mode
  const navigate = useNavigate();
  const formBg = useColorModeValue(lightBgForm, darkBgForm);
  const bgTabIndicator = useColorModeValue(lightBrandBgColor, darkBrandBgColor);

  return (
    <Box pt={{ base: marginTopMobile, md: "80px", xl: marginTopDefault }}>
      <Tabs position="relative" variant="unstyled">
        <Flex
          flexWrap="wrap-reverse"
          justifyContent={{ sm: "start", md: "space-between" }}
          pr={{ base: "0", md: "1rem" }}
          gap={3}
        >
          <TabList display="flex" flexWrap="nowrap" overflowX="auto" pl="1rem">
            <Tab>Clientes</Tab>
            <Tab>Reportes</Tab>
            <Tab>Ingresos</Tab>
          </TabList>

          <Button
            colorScheme="brandScheme"
            width={{ base: "full", md: "150px" }}
            leftIcon={<MdPersonAdd />}
            borderRadius="10px"
            variant="outline"
            onClick={() => navigate("./new")}
            fontSize="sm"
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
          bgColor={bgTabIndicator}
        />

        <TabPanels>
          <TabPanel>
            <Clients />
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

          <TabPanel>
            <Box bgColor={formBg} borderRadius={8} p={1} mb={4}>
              <form>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 4 }}
                  p={4}
                  spacing={2}
                >
                  <FormControl>
                    <FormLabel>Cédula</FormLabel>
                    <Input fontSize="small" placeholder="Cedula..." />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nombre(s)</FormLabel>
                    <Input
                      fontSize="small"
                      type="text"
                      placeholder="Nombre(s)"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Apellido(s)</FormLabel>
                    <Input
                      fontSize="small"
                      type="text"
                      placeholder="Apellidos"
                    />
                  </FormControl>
                </SimpleGrid>
                <Flex justifyContent="flex-end">
                  <Button
                    width={{ base: "full", md: "150px" }}
                    leftIcon={<MdSearch fontSize={16} />}
                    borderRadius="8px"
                    colorScheme="brandScheme"
                    fontSize="sm"
                    fontWeight="normal"
                    color="white"
                  >
                    Buscar
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
        </TabPanels>
      </Tabs>
    </Box>
  );
}
