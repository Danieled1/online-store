import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ButtonSection = ({children, path}) => {
  return (
    <Button
    colorScheme='blue'
    size={{ base: "lg" }}
    mt={4} // Adjust margin based on breakpoints
    fontSize={{ base: "md", sm: "lg", md: "xl", xl: "xl" }} // Adjust font size based on breakpoints
    _hover={{ transform: "scale(1.02)" }}
    alignSelf={{ base: "center", sm: "start" }} // Adjust alignment based on breakpoints
    as={Link}
    to={path}
  >
    {children}
  </Button>
  )
}

export default ButtonSection    