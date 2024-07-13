import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Assets
// Custom components
import { MdAttachMoney, MdBarChart } from "react-icons/md";
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import { marginTopDefault, marginTopMobile } from "../../../layouts/contants";
import DailyTraffic from "../../../views/admin/home/components/DailyTraffic";
import PieCard from "../../../views/admin/home/components/PieCard";
import AttendancesContainer from "./components/AttendancesContainer";
import ExpiringSoonContainer from "./components/ExpiringSoonContainer";
import {
  useGetTotalActiveMembers,
  useGetTotalNewMembersThisMonth,
} from "../../../hooks/subscriptions";
import { useGetMonthlyRevenue } from "../../../hooks/payments";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const {
    data: totalActiveMembersData,
    isLoading: activeMembersLoading,
    isFetching: activeMembersFetching,
  } = useGetTotalActiveMembers();

  const {
    data: totalNewMembersThisMonthData,
    isLoading: totalNewMembersThisMonthLoading,
    isFetching: totalNewMembersThisMonthFetching,
  } = useGetTotalNewMembersThisMonth();

  const {
    data: monthkyrevenueData,
    isLoading: isMonthlyRevenueLoading,
    isFetching: isMonthlyRevenueFetching,
  } = useGetMonthlyRevenue();
  return (
    <Box pt={{ base: marginTopMobile, md: "80px", xl: marginTopDefault }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Suscripciones Activas"
          value={`${totalActiveMembersData?.totalActiveMembers || 0}`}
          isLoading={activeMembersLoading || activeMembersFetching}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Nuevos este mes"
          value={`${
            totalNewMembersThisMonthData?.totalNewMembersThisMonth || 0
          }`}
          isLoading={
            totalNewMembersThisMonthLoading || totalNewMembersThisMonthFetching
          }
        />
        <MiniStatistics
          // growth="+23%"

          name="Ingresos del mes"
          value={`$BS. ${monthkyrevenueData?.monthlyRevenue || 0}`}
          isLoading={isMonthlyRevenueLoading || isMonthlyRevenueFetching}
        />
        {/* <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance">
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id="balance"
                variant="mini"
                mt="5px"
                me="0px"
                defaultValue="usd"
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gba">GBA</option>
              </Select>
            </Flex>
          }
          name="Your balance"
          value="$1,000"
        /> 
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="New Tasks"
          value="154"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Total Projects"
          value="2935"
        />*/}
      </SimpleGrid>

      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid> */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <AttendancesContainer />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid> */}
        <ExpiringSoonContainer />
      </SimpleGrid>
    </Box>
  );
}
