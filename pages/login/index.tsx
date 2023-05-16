'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import signIn from '../../firebase/auth'
import { Button, Flex, Heading, Image, Input, Text} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styles from '../../styles/login/login.module.css'
import station from '../../public/assets/charging-station.png'

function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter()

    const onSubmit = async (data: any) => {

        console.log(data)

        // const result = await signIn(data.email, data.password);

        // console.log(result)

        // return router.push("/admin")
    }

    return (
        <Flex height='100vh' alignItems='center' justifyContent='center' background='#004E9A'>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <Flex direction='column' background='#003B75' p={12} w={400} rounded={6}>
                    <Image src='/charging-station.png' alt='logo' width='100px' height='100px' mb={6} align='center'/>
                    <Text mb='8px' color='white'>E-mail</Text>
                    <Input {...register("email")} variant='filled' mb={3} type="email" background='#004E9A' borderRadius={200} color='white'/>
                    <Text mb='8px' color='white'>Senha</Text>
                    <Input {...register("password")} variant='filled' mb={6} type="password" background='#004E9A' borderRadius={200} color='white'/>
                    <Button background='#FFC107' color='#003B75' type="submit">
                        Entrar
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
}

export default Login;