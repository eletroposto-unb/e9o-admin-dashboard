import React from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { Box, Flex, Spinner, useTheme } from '@chakra-ui/react';
import { getUser } from "@/services/user";

const auth = getAuth(firebase_app);

interface User {
  id: string;
  nome: string;
}
interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

interface AuthProtectProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthProtectProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        // pega os dados do usuário na API; se necessário descomentar linha seguinte e ajustar User interface
        // const usuario = await getUser(user.uid); 

        // Converte o objeto de usuário recebido para o tipo User
        const authenticatedUser: User = {
          id: user.uid,
          nome: user.displayName || '',
          // ...
        };
        setUser(authenticatedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
      console.log('user', user);
    });

    return () => unsubscribe();
  }, []);

  const isAuthenticated = !!user;
  
  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
      {loading ? 
       <Flex padding='6' boxShadow='lg' bg='white' w={'100%'} h={'100vh'} alignItems={'center'} justifyContent={'center'}>
         <Spinner color='#004E9A' w={'100px'} h={'100px'} thickness='6px' emptyColor='#E0E0E0' speed='0.85s'/>
       </Flex>
        : children}
    </AuthContext.Provider>
  );
};


