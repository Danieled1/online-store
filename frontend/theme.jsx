import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#3182ce", // primary color used across the website (blue.500)
      secondary: "#4a5568", // secondary color used across the website (gray.600)
      lightBg: "#F5F5F5", // light mode background color (gray.50)
      darkBg: "#1A202C", // dark mode background color (gray.800)
      lightText: "#718096", // light mode text color (gray.600)
      darkText: "#A0AEC0", // dark mode text color (gray.400)
      lightBorder: "#EDF2F7", // light mode border color (gray.200)
      darkBorder: "#4A5568", // dark mode border color (gray.700)
    },
  },
  fonts: {
    logo: "Pacifico, cursive",
    heading: "Lato, sans-serif",
    body: "Poppins, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        _hover: {
          bg: "brand.primary", // using brand color
        },
      },
      variants: {
        // Adding a custom variant 'customHover'
        customHover: (props) => ({
          bg:
            props.colorScheme === "brand.primary"
              ? "brand.primary"
              : "gray.500",
          color: "white",
          _hover: {
            bg:
              props.colorScheme === "brand.secondary"
                ? "brand.secondary"
                : "gray.600",
          },
        }),
      },
    },
    Form: {
      baseStyle: {
        FormControl: {
          marginBottom: "1rem",
        },
        FormLabel: {
          marginBottom: "0.5rem",
        },
      },
    },
    Box: {
      baseStyle: {
        boxShadow: "xl",
      },
    },
  },
  breakpoints: {
    sm: "320px", // Mobile phones (average iPhone screen size)
    md: "768px", // Tablets (common tablet screen size)
    lg: "1024px", // Larger tablets and small laptops (common laptop screen size)
    xl: "1280px", // Larger laptops
    "2xl": "1440px", // Extra large screens (desktops)
  },
});

export default theme;
