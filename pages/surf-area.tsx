import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {useState} from 'react';
import ComingSoonModal from '../components/modal/ComingSoon';
import {SurfAreaTable} from '../components/table/SurfAreaTable';
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
    variables: {surfAreaId: Number(id)},
    fetchPolicy: 'no-cache'
  });
  const surfArea = countryIsoResult.data.surfArea;

  if (slug !== customSlugify(surfArea.name)) return {notFound: true};

  return {props: {surfArea: countryIsoResult.data.surfArea}};
};

const SurfArea: NextPage<Props> = ({surfArea}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Head>
        <meta name="description" content={`Best Surfing Spots in ${surfArea.name}`} />
      </Head>
      <main className="container py-10">
        <h1 className="text-center text-primary font-bold text-4xl">Best Surfing Spots in {surfArea.name}</h1>
        <SurfAreaTable surfArea={surfArea} openModal={openModal} />
        <ComingSoonModal isOpen={isOpen} closeModal={closeModal} />
      </main>
    </>
  );
};

export default SurfArea;
