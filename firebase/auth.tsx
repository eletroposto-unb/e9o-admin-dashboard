import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "./config";

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result)
        return result;
    } catch (e) {
        console.log(e)
        return e;
    }
}