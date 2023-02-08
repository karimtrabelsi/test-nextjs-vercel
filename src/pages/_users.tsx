import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

type User = {
  fname: string;
  lname: string;
  mail: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const array: any = [];
  const handleSubmit = (e: any) => {
    e.preventDefault();
    array.push(...users, { fname: firstname, lname: lastname, mail: email });
    setUsers(array);
    console.log(users);
    const formdata = new FormData(e.target);
  };
  const prisma = require("@prisma/client");
  const prismaClient = new prisma.PrismaClient();
  const addUSer = async () => {
    const result = await prismaClient.user.create({
      data: {
        fname: firstname,
        lname: lastname,
        email: email,
      },
    });
    console.log(result);
  };
  const list = array.map((u: any) => {
    <>
      <Td>{u.fname}</Td>
      <Td>{u.lname}</Td>
      <Td>{u.mail}</Td>
    </>;
  });
  useEffect(() => {
    console.log("rerender");
  }, [list]);

  return (
    <>
      <FormControl isRequired w={"50%"} onSubmit={handleSubmit}>
        <FormLabel>First name</FormLabel>
        <Input
          placeholder="First name"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <FormLabel>Last name</FormLabel>
        <Input
          placeholder="Last name"
          onChange={(e) => setLastname(e.target.value)}
        />
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <Button mt={4} colorScheme="teal" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Add Users To See Changes</TableCaption>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>{list}</Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
