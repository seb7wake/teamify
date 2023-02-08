import {
  Box,
  Card,
  Text,
  Heading,
  Stack,
  Image,
  CardBody,
} from "@chakra-ui/react";
import React from "react";

const CardContent = ({
  first_name,
  last_name,
  email,
  phone_number,
  is_admin,
  id,
}) => {
  return (
    <Card
      variant={"outline"}
      direction={{ base: "column", sm: "row" }}
      key={id}
      size="md"
    >
      <Image
        style={{ maxHeight: "70px", maxWidth: "70px" }}
        ml={4}
        mt={6}
        src="https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png"
        alt="Profile photo"
      />
      <Stack>
        <CardBody>
          <Box>
            <Heading size="s" textTransform="capitalize">
              {first_name} {last_name} {is_admin ? "(admin)" : ""}
            </Heading>
            <Text py="2" fontSize="sm">
              {phone_number}
              <br />
              {email}
            </Text>
          </Box>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default CardContent;
