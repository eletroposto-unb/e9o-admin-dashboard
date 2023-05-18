import firebase_app from "@/firebase/config";
import { signInWithEmailAndPassword, signOut, getAuth,  } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const auth = getAuth(firebase_app);

async function signIn(email: string, password: string): Promise<any> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (e: any) {
    if (e.code === 'auth/user-not-found') {
      throw new Error('Usuário não encontrado. Verifique o email digitado.');
    } else if (e.code === 'auth/wrong-password') {
      throw new Error('Senha incorreta. Verifique a senha digitada.');
    } else {
      throw new Error('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
  }
}


async function logOut() {
  try {
      const result = await signOut(auth);
      console.log(result);
      return true;
  } catch (e) {
      console.log(e)
      return false;
  }
}

async function useRequireAuth() {
  const router = useRouter();
  const user = true

  useEffect(() => {

    if (!user) {
      // Redirecione o usuário para a página de login se não estiver autenticado
      router.push('/login');
    }
  }, []);

  return user;
};

export { signIn, logOut, useRequireAuth}