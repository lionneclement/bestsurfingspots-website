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
      loc: `${process.env.NEXT_PUBLIC_URI}/north-america`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/countries-on-a-budget-in-north-america`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/cheap-countries-in-north-america`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/latin-america`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/countries-on-a-budget-in-latin-america`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/cheap-countries-in-latin-america`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/europe`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/countries-on-a-budget-in-europe`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/cheap-countries-in-europe`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/africa`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/countries-on-a-budget-in-africa`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/cheap-countries-in-africa`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/asia`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/countries-on-a-budget-in-asia`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/cheap-countries-in-asia`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/oceania`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/countries-on-a-budget-in-oceania`,
      priority: 0.7,
      changefreq: 'daily'
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URI}/cheap-countries-in-oceania`,
      priority: 0.7,
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
