import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Wrapper from "../components/Wrapper";
import {
  Box,
  Button,
  Flex,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { deleteUser, updateUser, getUser } from "../api/user";
import { validateForm } from "../../utils/validateForm";

const Edit = ({ id }) => {
  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState("false");
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    getUser(id).then((response) => {
      if (response.status === 200) {
        setUser(response.data);
        setIsAdmin(response.data.is_admin ? "true" : "false");
      } else {
        router.push("/");
      }
      setLoading(false);
    });
  }, []);

  const createToast = (email) => {
    toast({
      title: email ? "User updated." : "User deleted.",
      description: email
        ? "We've updated the user " + email + " for you."
        : "We've deleted the user for you.",
      status: "success",
      position: "top",
      duration: 3500,
      isClosable: true,
    });
  };

  const handleSubmit = async (values, { setErrors }) => {
    // error handling
    values.is_admin = isAdmin === "true" ? true : false;
    const errors = validateForm(values);
    if (JSON.stringify(errors) !== "{}") {
      setErrors(toErrorMap(errors));
      return;
    }
    updateUser(values, id)
      .then((response) => {
        if (response.status === 200) {
          router.push("/");
          createToast(values.email);
        } else {
          const errorMap = toErrorMap(response.data);
          setErrors(errorMap);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const handleDelete = async () => {
    deleteUser(id)
      .then((response) => {
        router.push("/");
        createToast(undefined);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <Wrapper>
      <Box style={{ fontSize: "35px" }}>Edit team member </Box>
      <Box style={{ color: "grey" }}>
        Edit contact info, location, and role.
      </Box>
      <br />
      <Divider />
      <br />
      <Formik
        initialValues={{
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          location: user.location,
          is_admin: user.is_admin,
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
                type="text"
                name="phone_number"
                placeholder="123-123-1234"
                label="Phone Number"
              />
            </Box>
            <Box mt={4}>
              <InputField
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
                onChange={(nextValue) => {
                  setIsAdmin(nextValue);
                }}
                value={isAdmin}
                style={{ marginTop: 15 }}
              >
                <Stack>
                  <Radio value={"false"}>Regular - Can't delete members</Radio>
                  <Radio value={"true"}>Admin - Can delete members</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <br />
            <Flex mt={4}>
              <Button
                variant="outline"
                onClick={handleDelete}
                size="lg"
                ml={"2%"}
                width={"46%"}
                colorScheme="red"
              >
                Delete User
              </Button>
              <Button
                size="lg"
                style={{ marginLeft: "auto", marginTop: "auto" }}
                type="submit"
                mr={"2%"}
                width={"46%"}
                isLoading={isSubmitting}
                colorScheme="blue"
              >
                Save Changes
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

// allows us to get any query parameters from the url and pass it to the component
Edit.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default Edit;
