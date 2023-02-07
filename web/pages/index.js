import React, { useEffect } from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import Wrapper from "./components/Wrapper";
import NextLink from "next/link";
import { AddIcon } from "@chakra-ui/icons";
import { getUsers } from "./api/user";

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
          users.map((user) => (
            <NextLink href={`/edit/${user.id}`} key={user.id}>
              <Box key={user.id} p={7} shadow="md" borderWidth="1px">
                <Box>
                  {user.first_name} {user.last_name}{" "}
                  {user.is_admin ? "(admin)" : ""}
                </Box>
                <Box>{user.phone_number}</Box>
                <Box>{user.email}</Box>
              </Box>
            </NextLink>
          ))
        ) : (
          <Box>No users found</Box>
        )}
      </Wrapper>
    </>
  );
}
