import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';
import { useContext, useEffect } from 'react';

interface AuthProtectProps {
  children: React.ReactNode;
}

const AuthProtect: React.FC<AuthProtectProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return isAuthenticated ? <>{children}</> : null;
};

export async function getServerSideProps() {
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AuthProtect;
