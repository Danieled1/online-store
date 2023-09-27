import {
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTags,
  FaBlog,
  FaInfoCircle,
  FaHeadset,
  FaSignInAlt,
} from "react-icons/fa";
import React from "react";

const navigationItems = [
  { icon: FaHome, label: "Home", to: "/" },
  { icon: FaTags, label: "Shop", to: "/shop" },
  { icon: FaBlog, label: "Blog", to: "/blog" },
  { icon: FaInfoCircle, label: "About", to: "/about" },
  { icon: FaHeadset, label: "Support", to: "/support" },
  { icon: FaSignInAlt, label: "Login", to: "/login" },
];
const NavigationMenu = ({ isMobile }) => {
  const location = useLocation();
  const buttonHoverBg = useColorModeValue("brand.primary", "brand.secondary");

  return isMobile ? (
    <Menu>
      <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="ghost" />
      <MenuList color="black">
        {navigationItems.map(({ icon: Icon, label, to }, index) => (
          <MenuItem as={Link} to={to} key={index} icon={<Icon />}>
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  ) : (
    <ButtonGroup spacing={5}>
      {navigationItems.map(({ icon: Icon, label, to }, index) => (
        <Button
          key={index}
          _hover={{ bg: buttonHoverBg }}
          leftIcon={<Icon />}
          variant={location.pathname === to ? "Background" : "solid"}
          color="dark"
          bg={"Background"}
          as={Link}
          to={to}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default NavigationMenu;
