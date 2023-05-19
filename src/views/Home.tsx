import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import axios from "../axios";

import TodoFormModal from "../components/TodoFormModal";
import ConfirmModal from "src/components/ConfirmModal";

interface ITodoForm {
  title: string;
  description: string;
}

const Home = () => {
  const toast = useToast();

  const [todoList, setTodoList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const {
    isOpen: isOpenTodoFormModal,
    onOpen: onOpenTodoFormModal,
    onClose: onCloseTodoFormModal,
  } = useDisclosure();

  const {
    isOpen: isOpenEditTodoFormModal,
    onOpen: onOpenEditTodoFormModal,
    onClose: onCloseEditTodoFormModal,
  } = useDisclosure();

  const {
    isOpen: isOpenConfirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal,
  } = useDisclosure();

  const httpCreateTodo = (form: ITodoForm) => {
    axios
      .post("/todos", form)
      .then((response) => {
        if (response.data) {
          toast({
            variant: "subtle",
            title: "Create Success!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          onCloseTodoFormModal();
          setLoaded(false);
        }
      })
      .catch((error) => {
        toast({
          variant: "subtle",
          title: error?.response?.statusText,
          description: error?.response?.data?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const httpEditTodo = (id: string, form: ITodoForm) => {
    axios
      .put(`/todos/${id}`, form)
      .then((response) => {
        if (response.data) {
          toast({
            variant: "subtle",
            title: "Edit Success!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          onCloseEditTodoFormModal();
          setLoaded(false);
        }
      })
      .catch((error) => {
        toast({
          variant: "subtle",
          title: error?.response?.statusText,
          description: error?.response?.data?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const httpDeleteTodo = (id: string) => {
    axios
      .delete(`/todos/${id}`)
      .then((response) => {
        if (response.data) {
          toast({
            variant: "subtle",
            title: "Delete Success!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setLoaded(false);
        }
      })
      .catch((error) => {
        toast({
          variant: "subtle",
          title: error?.response?.statusText,
          description: error?.response?.data?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const httpGetTodo = () => {
    axios.get("/todos").then((response) => {
      if (response.data) {
        setTodoList(response.data);
      }
    });
  };

  const onCreateTodo = async (value: ITodoForm) => {
    await httpCreateTodo(value);
    onCloseTodoFormModal();
    setLoaded(false);
  };

  const onEditTodo = async (id: string, value: ITodoForm) => {
    await httpEditTodo(id, value);
    onCloseEditTodoFormModal();
    setLoaded(false);
  };

  useEffect(() => {
    if (!loaded) {
      httpGetTodo();
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <Container>
      <Box
        mt={20}
        shadow="md"
        minH="600px"
        border="1px solid"
        borderColor="teal.200"
        p={6}
        borderRadius="lg"
        position="relative"
      >
        {todoList.map((todo: any, index) => {
          return (
            <Box key={index}>
              <Box
                position="relative"
                shadow="sm"
                borderRadius="lg"
                pt={6}
                pb={2}
                px={6}
                mb={2}
                border="1px solid"
                borderColor="teal.200"
              >
                <Text
                  cursor="pointer"
                  fontWeight="bold"
                  fontSize={24}
                  onClick={() => onOpenEditTodoFormModal()}
                >
                  {todo?.title}
                </Text>
                <Text
                  cursor="pointer"
                  fontSize={14}
                  color="teal"
                  onClick={() => onOpenEditTodoFormModal()}
                >
                  {todo?.description}
                </Text>
                <Box mt={2} textAlign="right">
                  <Text fontSize={14} color="teal">
                    {todo?.createdAt}
                  </Text>
                </Box>
                <Button
                  zIndex={1}
                  size="sm"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={() => onOpenConfirmModal()}
                >
                  X
                </Button>
              </Box>
              {isOpenConfirmModal && (
                <ConfirmModal
                  isOpen={isOpenConfirmModal}
                  onClose={onCloseConfirmModal}
                  onConfirm={() => {
                    httpDeleteTodo(todo?._id);
                    onCloseConfirmModal();
                  }}
                  message={`Want delete ${todo.title}?`}
                  title="ยืนยันลบข้อมูล"
                />
              )}
              {isOpenEditTodoFormModal && (
                <TodoFormModal
                  isOpen={isOpenEditTodoFormModal}
                  onClose={onCloseEditTodoFormModal}
                  onConfirm={(value: ITodoForm) => onEditTodo(todo?._id, value)}
                  isEdit
                  id={todo?._id}
                />
              )}
            </Box>
          );
        })}
        <Flex position="absolute" bottom="6" align="center" left={0} right={0}>
          <Button
            type="submit"
            mx="auto"
            mt={4}
            w="200px"
            colorScheme="blue"
            shadow="md"
            onClick={() => onOpenTodoFormModal()}
          >
            + Create
          </Button>
        </Flex>
      </Box>
      {isOpenTodoFormModal && (
        <TodoFormModal
          isOpen={isOpenTodoFormModal}
          onClose={onCloseTodoFormModal}
          onConfirm={onCreateTodo}
        />
      )}
    </Container>
  );
};

export default Home;
