import Layout from "@/components/layout";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
