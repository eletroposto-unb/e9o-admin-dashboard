import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { theme } from "../styles/theme";
import { AuthContextProvider } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const dashboardRoutes = [
      "/mapa",
      "/dashboard",
      "/postos",
      "/usuarios",
      "/historico",
    ];

    if (dashboardRoutes.includes(router.pathname)) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <main className={inter.className}>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthContextProvider>
    </main>
  );
}
