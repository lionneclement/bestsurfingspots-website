import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {graphqlClient} from '../graphql/GraphqlClient';
import {SURF_AREA_BY_ID} from '../graphql/query/SurfAreaQuery';
import {SurfAreaById, SurfAreaByIdVariable} from '../graphql/types/SurfArea';
import {customSlugify} from '../utils/slugify';

interface Props {
  surfArea: SurfAreaById;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {id, slug} = context.query;

  if (!id) return {notFound: true};

  const countryIsoResult = await graphqlClient.query<{surfArea: SurfAreaById}, SurfAreaByIdVariable>({
    query: SURF_AREA_BY_ID,
    variables: {surfAreaId: Number(id)}
  });
  const surfArea = countryIsoResult.data.surfArea;

  if (slug !== customSlugify(surfArea.name)) return {notFound: true};

  return {props: {surfArea: countryIsoResult.data.surfArea}};
};

const SurfArea: NextPage<Props> = ({surfArea}) => {
  return (
    <>
      <Head>
        <title>Best Surfing Spots in {surfArea.name}</title>
        <meta name="description" content="the best places to surf in the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container py-10">
        <h1 className="text-center text-primary font-bold text-4xl">Best Surfing Spots in {surfArea.name}</h1>
        <span>{surfArea.country.name}</span>
        <span>{surfArea.country_seasons?.map(({season, month}) => season.name + ' ' + month.name)}</span>
        <span>
          {surfArea.surf_spots?.map(({name, level_surf_spots}, index) => {
            return (
              <div key={index}>
                <span>{name}</span>
                {level_surf_spots?.map(({level}, index) => {
                  return <span key={index}>{level.name}</span>;
                })}
              </div>
            );
          })}
        </span>
      </main>
    </>
  );
};

export default SurfArea;
