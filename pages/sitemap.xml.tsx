import {GetServerSidePropsContext} from 'next';
import {graphqlClient} from '../graphql/GraphqlClient';
import {PRODUCT_SITEMAP} from '../graphql/query/ProductQuery';
import {ProductSitemap} from '../graphql/types/Product';
import {surfboardLink} from '../helpers/Link';

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({res}: GetServerSidePropsContext) => {
  const {data} = await graphqlClient.query<{product: ProductSitemap[]}>({
    query: PRODUCT_SITEMAP
  });

  const dynamicPaths = data.product.map(({id, title, updated_at}) => {
    const loc = `${process.env.NEXT_PUBLIC_URI}${surfboardLink({id, title})}`;

    return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${new Date(updated_at).toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `;
  });

  const staticPaths = [
    `
  <url>
    <loc>${process.env.NEXT_PUBLIC_URI}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
`
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${allPaths.map((url) => url).join('')}
        </urlset>
    `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default Sitemap;
