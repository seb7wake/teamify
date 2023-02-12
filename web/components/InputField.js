import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

const InputField = ({ label, size: _, ...props }) => {
  console.log(label, props);
  const [field, { error }] = useField(props);
  console.log(field);

  return (
    <FormControl isInvalid={error === undefined ? false : true}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

// InputField.getServerSideProps = async (context) => {
//   return { props: { name: "", value: "" } };
// };

export default InputField;
