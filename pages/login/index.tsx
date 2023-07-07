"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Image, Input, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styles from "../../styles/login/login.module.css";
import { useTheme } from "@chakra-ui/react";
import { signIn } from "@/utils/auth";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const theme = useTheme();
  const toast = useToast();
  const id = "test-toast";

  const onSubmit = async (data: any) => {
    await signIn(data.email, data.password)
      .then((result) => {
        if (result) {
          console.log(result);
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        if (!toast.isActive(id)) {
          toast({
            id,
            title: error.message,
            status: "error",
            variant: "left-accent",
          });
        }
      });
  };

  const handleDownload = () => {
    const fileUrl =
      "https://drive.google.com/file/d/1fsB-WmLIQhH3lwBZ4O7sRU3Tivyw-MOZ/view?usp=sharing";
    window.open(fileUrl);
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.primary.main}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <Flex
          direction="column"
          bg={theme.colors.background.main}
          p={12}
          w={400}
          rounded={6}
        >
          <Image
            src="/charging-station.png"
            alt="logo"
            width="100px"
            height="100px"
            mb={6}
            alignSelf="center"
            marginLeft={10}
          />
          <Text mb="8px" color="white">
            E-mail
          </Text>
          <Input
            {...register("email")}
            variant="filled"
            mb={3}
            type="email"
            bg={theme.colors.primary.main}
            borderRadius={200}
            color="white"
          />
          <Text mb="8px" color="white">
            Senha
          </Text>
          <Input
            {...register("password")}
            variant="filled"
            mb={6}
            type="password"
            bg={theme.colors.primary.main}
            borderRadius={200}
            color="white"
          />
          <Button
            bg={theme.colors.secundary.main}
            color={theme.colors.primary.main}
            type="submit"
          >
            Entrar
          </Button>
        </Flex>
      </form>
      <Text
        position={"absolute"}
        bottom={20}
        color={theme.colors.secundary.main}
      >
        Clique{" "}
        <span
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={handleDownload}
        >
          aqui
        </span>{" "}
        para baixar o aplicativo android.
      </Text>
    </Flex>
  );
}

export default Login;
