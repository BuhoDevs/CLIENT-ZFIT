// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "../../components/footer/FooterAdmin";
// Layout components
import Sidebar from "../../components/sidebar/Sidebar";
// import { SidebarContext } from "../../contexts/SidebarContext";
import { useState } from "react";
import { routes } from "../../routes";
import AdminNavbar from "../../components/navbar/NavbarAdmin";
import { Outlet } from "react-router-dom";
// Custom Chakra theme
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Dashboard(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  // const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components

  // const getRoute = () => {
  //   return window.location.pathname !== "/admin/full-screen-maps";
  // };

  const getActiveRoute = (routes: RoutesType[]): string => {
    const activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): boolean => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return Boolean(routes[i].secondary);
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeNavbar;
  };

  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  return (
    <Box>
      {/* <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      > */}
      <Sidebar routes={routes as RoutesType[]} display="none" {...rest} />
      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{
          base: "100%",
          xl: "calc( 100% - 290px )",
        }}
        maxWidth={{
          base: "100%",
          xl: "calc( 100% - 290px )",
        }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        <Portal>
          <Box>
            <AdminNavbar
              onOpen={onOpen}
              logoText={"Horizon UI Dashboard PRO"}
              brandText={getActiveRoute(routes as RoutesType[])}
              secondary={getActiveNavbar(routes as RoutesType[])}
              message={getActiveNavbarText(routes as RoutesType[])}
              fixed={fixed}
              {...rest}
            />
          </Box>
        </Portal>
        {/* {children} */}
        <Outlet />

        <Box>
          <Footer />
        </Box>
      </Box>
      {/* </SidebarContext.Provider> */}
    </Box>
  );
}
