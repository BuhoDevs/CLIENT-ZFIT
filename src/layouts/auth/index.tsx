import { useState } from "react";
// import { Route } from "react-router-dom";
// import { routes } from "../../routes";

// Chakra imports
import { Box, useColorModeValue } from "@chakra-ui/react";

// Layout components
import { Outlet } from "react-router-dom";
import { SidebarContext } from "../../contexts/SidebarContext";

// Custom Chakra theme
export default function AuthLayout() {
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // const getRoute = () => {
  //   return window.location.pathname !== "/auth/full-screen-maps";
  // };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  //   const getRoutes = (routes: RoutesType[]): any => {
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     return routes.map((route: RoutesType, key: any) => {
  //       if (route.layout === "/auth") {
  //         return (
  //           <Route
  //             path={route.layout + route.path}
  //             component={route.component}
  //             key={key}
  //           />
  //         );
  //       } else {
  //         return null;
  //       }
  //     });
  //   };
  const authBg = useColorModeValue("white", "navy.900");
  document.documentElement.dir = "ltr";
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box mx="auto" minH="100vh">
            <Outlet />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
