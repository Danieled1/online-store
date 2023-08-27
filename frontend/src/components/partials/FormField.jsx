import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const FormField = ({ children, id, type, placeholder, isRequired }) => {
  return (
    <FormControl id={id} isRequired={isRequired} mt={2}>
      <FormLabel>{children}</FormLabel>
      <Input type={type} placeholder={placeholder} />
    </FormControl>
  );
};

export default FormField;
