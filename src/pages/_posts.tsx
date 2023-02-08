import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Grid,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  list,
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
import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";

export default function Posts() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);

  function AllPosts() {
    const [posts, setPosts] = useState<any>([]);
    useEffect(() => {
      const getPosts = async () => {
        const response = await fetch(
          "https://test-nextjs-vercel-pied.vercel.app/api/getPosts"
        );
        const result = await response.json();
        setPosts(result);
      };
      getPosts();
    }, []);
    const array = posts.map((p: any) => {
      return (
        <Tr key={p.id}>
          <Td>{p.title}</Td>
          <Td>{p.body}</Td>
        </Tr>
      );
    });
    return <>{array}</>;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setRender(!render);
    console.log("submit");
    const data = {
      title: title,
      body: body,
    };
    const response = await fetch(
      "https://test-nextjs-vercel-pied.vercel.app/api/addPost",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    console.log(result);
  }

  const queryClient = useQueryClient();
  const addMutation = useMutation(handleSubmit, {
    onSuccess: () => {
      queryClient.prefetchQuery("posts", AllPosts);
    },
  });

  return (
    <>
      <Box position={"relative"}>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            >
              Test NextJs{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                &
              </Text>{" "}
              Vercel deployment
            </Heading>

            <Stack direction={"row"} spacing={4} align={"center"}></Stack>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Add a new Post
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
            </Stack>
            <Box mt={10}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <Input
                    placeholder="Title"
                    bg={"gray.100"}
                    border={0}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                  <Input
                    placeholder="Body"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    name="body"
                    onChange={(e) => setBody(e.target.value)}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </Stack>
                <Button
                  fontFamily={"heading"}
                  type="submit"
                  onClick={handleSubmit}
                  mt={8}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                >
                  Submit
                </Button>
              </form>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>List of posts</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Body</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <AllPosts />
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
