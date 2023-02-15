import React from "react";
import { useRouter } from "next/router";
import Wrapper from "../components/Wrapper";
import { Box, Button, Divider } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import { toErrorMap } from "../utils/toErrorMap";
import { addUser } from "../api/user";
import { validateForm } from "../utils/validateForm";
import LocationInput from "../components/LocationInput";

const Add = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState("false");
  const toast = useToast();

  const createToast = (email) => {
    toast({
      title: "User created.",
      description: "We've added the user " + email + " for you.",
      position: "top",
      status: "success",
      duration: 3500,
      isClosable: true,
    });
  };

  const handleSubmit = async (values, { setErrors }) => {
    // error handling
    values["is_admin"] = isAdmin === "true" ? true : false;
    const errors = validateForm(values);
    if (JSON.stringify(errors) !== "{}") {
      setErrors(toErrorMap(errors));
      return;
    }
    addUser(values).then((response) => {
      if (response.status === 400) {
        const errorMap = toErrorMap(response.data);
        setErrors(errorMap);
      } else {
        router.push("/");
        createToast(values.email);
      }
    });
  };

  return (
    <Wrapper>
      <Box style={{ fontSize: "35px" }}>Add a team member </Box>
      <Box style={{ color: "grey" }}>Set email, location, and role.</Box>
      <br />
      <Divider />
      <br />
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          location: "",
          is_admin: "false",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <strong style={{ fontSize: "20px" }}> Contact Information</strong>
            <Box mt={4}>
              <InputField
                type="text"
                name="first_name"
                placeholder="First Name"
                label="First Name"
              />
            </Box>
            <Box mt={4}>
              <InputField
                type="text"
                name="last_name"
                placeholder="Last Name"
                label="Last Name"
              />
            </Box>
            <Box mt={4}>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                label="Email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                type="tel"
                name="phone_number"
                placeholder="1231231234"
                label="Phone Number"
              />
            </Box>
            <Box mt={4}>
              {/* <InputField
                type="text"
                name="location"
                placeholder="Toronto, Canada"
                label="Location"
              /> */}
              <LocationInput
                type="text"
                name="location"
                placeholder="Toronto, Canada"
                label="Location"
              />
            </Box>
            <br />
            <Box mt={4}>
              <strong style={{ fontSize: "20px" }}>Role</strong>
              <RadioGroup
                name="is_admin"
                value={isAdmin}
                onChange={setIsAdmin}
                style={{ marginTop: 15 }}
              >
                <Stack>
                  <Radio value={"false"}>Regular - Can't delete members</Radio>
                  <Radio value={"true"}>Admin - Can delete members</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <br />
            <br />
            <Button
              size={"lg"}
              type="submit"
              width={"100%"}
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Add User
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Add;
