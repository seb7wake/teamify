import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import AutoComplete from "react-google-autocomplete";
import React from "react";

const InputField = ({ label, size: _, ...props }) => {
  const [field, { error }, helper] = useField(props);

  return (
    <FormControl isInvalid={error === undefined ? false : true}>
      <FormLabel htmlFor={"location"}>Location (City)</FormLabel>
      <AutoComplete
        {...field}
        id={field.name}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        style={{
          width: "100%",
          lineHeight: "40px",
          border: "1px solid #E5E4E2",
          borderRadius: "5px",
          paddingLeft: "1rem",
        }}
        {...props}
        onPlaceSelected={(place) => helper.setValue(place.formatted_address)}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
