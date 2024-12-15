import { OrganizationProvider } from '../contexts/OrganizationContext';

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>; pageProps: any }) {
  return (
    <OrganizationProvider>
      {/* Other providers */}
      <Component {...pageProps} />
    </OrganizationProvider>
  );
}

export default MyApp; 