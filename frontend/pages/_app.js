import { AppProvider } from "@/components/Context";
import Layout from "@/components/layout";
import { useFetchUser, UserProvider } from "@/lib/AuthContext";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  const { user, loading } = useFetchUser();
  if (Component.getLayout) {
    return Component.getLayout(
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    );
  }
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
