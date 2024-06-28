import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    // brand: {
    //   100: "#E9E3FF",
    //   200: "#422AFB",
    //   300: "#422AFB",
    //   400: "#7551FF",
    //   500: "#422AFB",
    //   600: "#3311DB",
    //   700: "#02044A",
    //   800: "#190793",
    //   900: "#11047A",
    // },
    // brandScheme: {
    //   100: "#E9E3FF",
    //   200: "#7551FF",
    //   300: "#7551FF",
    //   400: "#7551FF",
    //   500: "#422AFB",
    //   600: "#3311DB",
    //   700: "#02044A",
    //   800: "#190793",
    //   900: "#02044A",
    // },
    // brandTabs: {
    //   100: "#E9E3FF",
    //   200: "#422AFB",
    //   300: "#422AFB",
    //   400: "#422AFB",
    //   500: "#422AFB",
    //   600: "#3311DB",
    //   700: "#02044A",
    //   800: "#190793",
    //   900: "#02044A",
    // },
    // secondaryGray: {
    //   100: "#E0E5F2",
    //   200: "#E1E9F8",
    //   300: "#F4F7FE",
    //   400: "#E9EDF7",
    //   500: "#8F9BBA",
    //   600: "#A3AED0",
    //   700: "#707EAE",
    //   800: "#707EAE",
    //   900: "#1B2559",
    // },
    // red: {
    //   100: "#FEEFEE",
    //   500: "#EE5D50",
    //   600: "#E31A1A",
    // },
    // blue: {
    //   50: "#EFF4FB",
    //   500: "#3965FF",
    // },
    // orange: {
    //   100: "#FFF6DA",
    //   500: "#FFB547",
    // },
    // green: {
    //   100: "#E6FAF5",
    //   500: "#01B574",
    // },
    // navy: {
    //   50: "#d0dcfb",
    //   100: "#aac0fe",
    //   200: "#a3b9f8",
    //   300: "#728fea",
    //   400: "#3652ba",
    //   500: "#1b3bbb",
    //   600: "#24388a",
    //   700: "#1B254B",
    //   800: "#111c44",
    //   900: "#0b1437",
    // },
    // gray: {
    //   100: "#FAFCFE",
    // },

    brand: {
      100: "#FFFFFF", // Blanco
      200: "#FF0000", // Rojo
      300: "#FF0000", // Rojo
      400: "#FF0000", // Rojo
      500: "#FF0000", // Rojo
      600: "#D40000", // Rojo más oscuro
      700: "#A00000", // Rojo más oscuro
      800: "#800000", // Rojo más oscuro
      900: "#000000", // Negro
    },
    brandScheme: {
      100: "#FFFFFF", // Blanco
      200: "#FF0000", // Rojo
      300: "#FF0000", // Rojo
      400: "#FF0000", // Rojo
      500: "#FF0000", // Rojo
      600: "#D40000", // Rojo más oscuro
      700: "#A00000", // Rojo más oscuro
      800: "#800000", // Rojo más oscuro
      900: "#000000", // Negro
    },
    brandTabs: {
      100: "#FFFFFF", // Blanco
      200: "#FF0000", // Rojo
      300: "#FF0000", // Rojo
      400: "#FF0000", // Rojo
      500: "#FF0000", // Rojo
      600: "#D40000", // Rojo más oscuro
      700: "#A00000", // Rojo más oscuro
      800: "#800000", // Rojo más oscuro
      900: "#000000", // Negro
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#e5eaf2", // Gris azulado muy claro
      100: "#c2c9d3", // Gris azulado claro
      200: "#9da6b2", // Gris azulado claro medio
      300: "#778491", // Gris azulado medio
      400: "#515f70", // Gris azulado oscuro
      500: "#2c3a50", // Gris azulado oscuro más
      600: "#202b3e", // Gris azulado muy oscuro
      700: "#151c2c", // Gris azulado muy muy oscuro
      800: "#151c2c", // Gris azulado casi negro
      900: "#000000", // Negro
    },
    gray: {
      100: "#FAFCFE",
    },
  },
  styles: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global: (props: any) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "'Roboto', sans-serif",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "'Roboto', sans-serif",
      },
    }),
  },
};
