import NextDocument, {DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript} from 'next/document';

const Document = () => (
  <Html lang="fr">
    <Head>
      {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
        <script
          defer
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
      )}
      {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
          }}
        />
      )}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

Document.getInitialProps = async (context: DocumentContext): Promise<DocumentInitialProps> => {
  const initialProps = await NextDocument.getInitialProps(context);

  return initialProps;
};

export default Document;
