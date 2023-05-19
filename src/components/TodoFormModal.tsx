import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  useToast,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import axios from "../axios";

interface ITodoForm {
  title: string;
  description: string;
}

export default function TodoFormModal({
  isOpen,
  onClose,
  onConfirm,
  isEdit,
  id,
}: any) {
  const defaultForm = {
    title: "",
    description: "",
  };

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: defaultForm,
  });

  const httpGetTodoById = (id: string) => {
    return axios.get(`/todos/${id}`).then((response) => {
      if (response.data) {
        const todo = response.data;
        reset({
          title: todo?.title,
          description: todo?.description,
        });
      }
    });
  };

  const handleOnSubmit = async (value: ITodoForm) => {
    onConfirm(value);
  };

  useEffect(() => {
    if (isEdit && id) {
      httpGetTodoById(id);
    }
  }, [isEdit, id]);

  return (
    <Modal
      size={{ base: "sm", md: "lg" }}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent px={{ base: 1, md: 4 }} py={6}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <ModalCloseButton />
          <ModalBody mt={4}>
            <Box mb={4}>
              <Text mb={1}>Title</Text>
              <Controller
                control={control}
                name="title"
                rules={{
                  required: {
                    value: true,
                    message: "กรุณากรอก title",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={Boolean(errors?.title)}>
                    <Input
                      shadow="sm"
                      placeholder="title"
                      value={value}
                      onChange={onChange}
                      isInvalid={Boolean(errors?.title)}
                    />
                    {errors?.title && (
                      <FormErrorMessage>
                        {errors?.title?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
            </Box>
            <Box mb={4}>
              <Text mb={1}>Description</Text>
              <Controller
                control={control}
                name="description"
                rules={{
                  required: {
                    value: true,
                    message: "กรุณากรอก description",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={Boolean(errors?.description)}>
                    <Textarea
                      shadow="sm"
                      rows={6}
                      placeholder="description"
                      value={value}
                      onChange={onChange}
                      isInvalid={Boolean(errors?.description)}
                    />
                    {errors?.description && (
                      <FormErrorMessage>
                        {errors?.description?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
            </Box>
          </ModalBody>
          <ModalFooter
            display={{ base: "block", md: "flex" }}
            justifyContent="center"
          >
            <Button type="submit" w="full" colorScheme="blue" shadow="md">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
