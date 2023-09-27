import React, {useEffect, useState} from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ButtonCategory = ({ children, path, colorScheme }) => {

  return (
    <Button
      as={Link}
      to={path}
      colorScheme={colorScheme}
      size="xl"
      mx={2}
      py={4}
      fontSize={{ base: 'md', sm: 'lg', md: 'xl', xl: 'xl' }}
      _hover={{ transform: 'scale(1.05)' }}
      w="100%" // Adjust the width as needed
      h="100%" // Adjust the height as needed
      whiteSpace="nowrap" // Prevent text from breaking into multiple lines
    >
      {children}
    </Button>
  );
};

export default ButtonCategory;