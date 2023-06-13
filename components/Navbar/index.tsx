import { logOut } from "@/utils/auth";
import { Box, Flex, Button, useTheme, Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    await logOut()
      .then((result) => {
        console.log(result);
        if (result) {
          router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box as="header" bg={theme.colors.background.main} color="white" py={4}>
      <Flex
        maxW="container.lg"
        maxWidth={"100%"}
        padding={"0 10%"}
        maxH={50}
        alignItems={"center"}
      >
        <Image
          src="/charging-station.png"
          alt="EletroGama"
          width="40px"
          height="40px"
          marginRight="10px"
        />
        <Heading size="md">EletroGama</Heading>
        <Box ml="auto">
          <Button
            bg="#DE5353"
            variant="solid"
            size="sm"
            width="90px"
            onClick={handleSignOut}
            color="white"
          >
            Sair
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
