import {GetServerSidePropsContext, GetStaticPropsResult} from 'next';
import {getServerSideSitemap, ISitemapField} from 'next-sitemap';
import {graphqlClient} from '../../graphql/GraphqlClient';
import {SURF_SPOT_SITE_MAP} from '../../graphql/query/SurfSpotQuery';
import {SurfSpotSiteMap} from '../../graphql/types/SurfSpot';
import {customSlugify} from '../../utils/slugify';

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<{}>> => {
  const {data} = await graphqlClient.query<{surfSpots: SurfSpotSiteMap[]}>({
    query: SURF_SPOT_SITE_MAP
  });

  const fields: ISitemapField[] = data.surfSpots.map(({name, id}) => ({
    loc: `${process.env.NEXT_PUBLIC_URI}${customSlugify(`/surf-spot/${id}-${name.replace('/', '')}`)}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7
  }));

  return getServerSideSitemap(context, fields);
};

export default function SitemapIndex() {}
