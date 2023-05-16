import firebase_app from "@/firebase/config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const auth = getAuth(firebase_app);

async function signIn(email: string, password: string) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result)
        return result;
    } catch (e) {
        console.log(e)
        return e;
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

export { signIn, useRequireAuth}