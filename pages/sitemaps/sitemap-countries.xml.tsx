import {GetServerSidePropsContext, GetStaticPropsResult} from 'next';
import {getServerSideSitemap, ISitemapField} from 'next-sitemap';
import {graphqlClient} from '../../graphql/GraphqlClient';
import {COUNTRY_ISO_SITE_MAP} from '../../graphql/query/CountryIsoQuery';
import {CountryIsoSiteMap} from '../../graphql/types/CountryIso';
import {customSlugify} from '../../utils/slugify';

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<{}>> => {
  const {data} = await graphqlClient.query<{countryIso: CountryIsoSiteMap[]}>({
    query: COUNTRY_ISO_SITE_MAP
  });

  const fields: ISitemapField[] = data.countryIso.map(({name, id, updated_at}) => ({
    loc: `${process.env.NEXT_PUBLIC_URI}${customSlugify(`/country/${id}-${name}`)}`,
    lastmod: new Date(updated_at).toISOString(),
    changefreq: 'daily',
    priority: 0.7
  }));

  return getServerSideSitemap(context, fields);
};

export default function SitemapIndex() {}
