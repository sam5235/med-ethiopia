import { ChakraProvider } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import "../styles/globals.css";
import theme from "../theme/theme";
import ProtectedRoute from "../components/wrappers/ProtectedRoute";
import AuthContextProvider from "../context/AuthContext";
import Layout from "../Layout/Layout";
import SEOTags from "../components/SEOTags";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();

  // add paths that should be protected
  const shouldBeAuth = ["/records", "/profile", "/settings"].includes(
    pathname?.toLowerCase()
  );

  return (
    <ChakraProvider theme={theme}>
      <SEOTags
        title="Med-Ethiopia"
        description="Effortlessly manage your centralized medical system with our powerful admin website."
        url="https://med-ethiopia.vercel.app/"
        image="https://med-ethiopia.vercel.app/landing-2.svg"
      />
      <AuthContextProvider>
        <Layout>
          {shouldBeAuth ? (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
