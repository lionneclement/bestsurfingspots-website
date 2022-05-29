import {GetServerSidePropsContext, GetStaticPropsResult} from 'next';
import {getServerSideSitemap, ISitemapField} from 'next-sitemap';

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<{}>> => {
  const fields: ISitemapField[] = [
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/`,
      priority: 0.8,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/sitemaps/sitemap-countries.xml`,
      priority: 0.5,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/sitemaps/sitemap-surf-area.xml`,
      priority: 0.5,
      changefreq: 'daily'
    }
  ];

  console.log({fields});
  return getServerSideSitemap(context, fields);
};

export default function SitemapIndex() {}
