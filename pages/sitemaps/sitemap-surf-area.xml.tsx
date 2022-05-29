import {GetServerSidePropsContext, GetStaticPropsResult} from 'next';
import {getServerSideSitemap, ISitemapField} from 'next-sitemap';
import {graphqlClient} from '../../graphql/GraphqlClient';
import {SURF_AREA_SITE_MAP} from '../../graphql/query/SurfAreaQuery';
import {SurfAreaSiteMap} from '../../graphql/types/SurfArea';
import {customSlugify} from '../../utils/slugify';

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<{}>> => {
  const {data} = await graphqlClient.query<{surfAreas: SurfAreaSiteMap[]}>({
    query: SURF_AREA_SITE_MAP
  });

  const fields: ISitemapField[] = data.surfAreas.map(({name, id}) => ({
    loc: `${process.env.NEXT_PUBLIC_URI}${customSlugify(`/surf-area/${id}-${name}`)}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7
  }));

  return getServerSideSitemap(context, fields);
};

export default function SitemapIndex() {}
