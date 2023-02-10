import React, { useEffect } from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import Wrapper from "./components/Wrapper";
import NextLink from "next/link";
import { AddIcon } from "@chakra-ui/icons";
import { getUsers } from "./api/user";
import CardContent from "./components/CardContent";

export default function Home() {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    getUsers().then(
      (result) => {
        setUsers(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <Wrapper>
        <Flex>
          <Box style={{ fontSize: "35px" }}>Team Members </Box>
          <NextLink
            href="/add"
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              flexDirection: "row",
            }}
          >
            <AddIcon boxSize={10} color="teal" />
            {/* <p style={{ color: "teal" }}>Add user</p> */}
          </NextLink>
        </Flex>

        <Box style={{ color: "grey" }}>
          You have {users.length} team{" "}
          {users.length === 1 ? "member." : "members."}
        </Box>
        <br />
        {users.length > 0 ? (
          <Stack spacing="3">
            {users.map((user) => (
              <NextLink href={`/edit/${user.id}`} key={user.id}>
                <CardContent
                  first_name={user.first_name}
                  last_name={user.last_name}
                  phone_number={user.phone_number}
                  email={user.email}
                  is_admin={user.is_admin}
                  id={user.id}
                />
              </NextLink>
            ))}
          </Stack>
        ) : (
          <Box>No users found. Click the "+" to add your first user!</Box>
        )}
      </Wrapper>
    </>
  );
}
