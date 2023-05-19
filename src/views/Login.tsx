import {
  Box,
  Container,
  Input,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

import axios from "../axios";
import { useNavigate } from "react-router-dom";

interface ILoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const defaultForm = {
    username: "test03",
    password: "12345678",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultForm,
  });

  const httpLogin = (form: ILoginForm) => {
    axios
      .post("/users/auth", form)
      .then((response) => {
        if (response.data && response?.data?.token) {
          toast({
            variant: "subtle",
            title: "Login Success!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          localStorage.setItem("token", response?.data?.token);
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      })
      .catch((error) => {
        if (error.response.status === 401)
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

  const handleOnSubmit = async (value: ILoginForm) => {
    await httpLogin(value);
  };

  return (
    <Container mt={10}>
      <Box borderRadius="md" shadow="md" py={8} px={10}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Text
            align="center"
            fontWeight="bold"
            mb={4}
            color="blue.500"
            fontSize={42}
          >
            LOGIN
          </Text>
          <Box mb={2}>
            <Text mb={1}>Username</Text>
            <Controller
              control={control}
              name="username"
              rules={{
                required: {
                  value: true,
                  message: "กรุณากรอกอีเมลล์",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={Boolean(errors?.username)}>
                  <Input
                    shadow="sm"
                    placeholder="username"
                    value={value}
                    onChange={onChange}
                    isInvalid={Boolean(errors?.username)}
                  />
                  {errors?.username && (
                    <FormErrorMessage>
                      {errors?.username?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
          </Box>
          <Box mb={2}>
            <Text mb={1}>Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "กรุณากรอกรหัสผ่าน",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={Boolean(errors?.password)}>
                  <Input
                    shadow="sm"
                    placeholder="password"
                    type="password"
                    value={value}
                    onChange={onChange}
                    isInvalid={Boolean(errors?.password)}
                  />
                  {errors?.password && (
                    <FormErrorMessage>
                      {errors?.password?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
          </Box>
          <Button type="submit" mt={4} w="full" colorScheme="blue" shadow="md">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
