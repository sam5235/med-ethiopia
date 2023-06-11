import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <Flex
        minHeight="100vh"
        w="100%"
        justifyContent="center" 
        alignItems="center" 
      >
        <Spinner size="xl" color="brand.500" />
      </Flex> 
    );
  }
  if (!user) {
    router.replace("/login");
    return null;
  }
  return children;
}
