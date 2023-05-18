import React from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';

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
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
