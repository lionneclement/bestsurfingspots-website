import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {ListBoxUI} from '../components/ui/ListBoxUI';
import {continentData, costOfLivingData} from '../data/TableData';
import {graphqlClient} from '../graphql/GraphqlClient';
import {HOME_COUNTRY_ISO} from '../graphql/query/CountryIsoQuery';
import {HomeCountryIso} from '../graphql/types/CountryIso';
import {homeFilterPath, HomeFilterPathTypes, homePathName} from '../helpers/HomeFilterPath';
import {getImageSrc} from '../helpers/Image';
import {capitalize} from '../helpers/String';
import {customSlugify} from '../utils/slugify';

interface Props {
  countryIso: HomeCountryIso[];
  homeFilter: HomeFilterPathTypes | null;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {slug} = context.query;

  const homeFilter = homeFilterPath(slug);

  if (slug && !homeFilter) return {notFound: true};

  const countryIsoResult = await graphqlClient.query<{countryIso: HomeCountryIso[]}>({
    query: HOME_COUNTRY_ISO
  });

  return {props: {countryIso: countryIsoResult.data.countryIso, homeFilter}};
};

const Home: NextPage<Props> = ({countryIso, homeFilter}) => {
  const {push} = useRouter();
  const [continentSelected, setContinentSelected] = useState(homeFilter?.continent || continentData[0]);
  const [costOfLivingSelected, setCostOfLivingSelected] = useState(homeFilter?.costOfLiving || costOfLivingData[0]);

  useEffect(() => {
    const pathname = homePathName({continentSelected, costOfLivingSelected});
    push({pathname}, undefined, {shallow: true});
  }, [continentSelected, costOfLivingSelected]);

  return (
    <>
      <Head>
        <meta name="description" content="The best places to surf in the world" />
      </Head>
      <main className="container my-10">
        <h1 className="text-center text-primary font-bold text-4xl">Best Surfing Spots</h1>
        <p className="text-center text-gray-400 font-medium text-lg mt-2">the best places to surf in the world</p>
        <div className="flex justify-around my-6 flex-wrap">
          <ListBoxUI value={continentSelected} setValue={setContinentSelected} data={continentData} />
          <ListBoxUI value={costOfLivingSelected} setValue={setCostOfLivingSelected} data={costOfLivingData} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countryIso.map(({emoji, name, cost_of_livings, language_country_isos, continent, id, image}, index) => {
            return (
              <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                <Image src={getImageSrc(image)} className="object-cover" alt={name} layout="fill" />
                <div className="bg-[#00000080] w-full h-full absolute font-bold text-white">
                  <span className="text-right absolute top-0 right-0 p-2">
                    ${cost_of_livings[0].single_person} / month
                  </span>
                  <Link href={customSlugify(`/country/${id}-${name}`)}>
                    <a className="stretched-link " title={name}>
                      <h2 className="text-center absolute top-1/2 left-0 transform -translate-y-1/2 w-full text-2xl">
                        {`${emoji} ${name}`}
                      </h2>
                    </a>
                  </Link>
                  <span className="text-right absolute bottom-0 left-0 p-2">
                    🗣️ {capitalize(language_country_isos[0].language.name)}
                  </span>
                  <span className="text-right absolute bottom-0 right-0 p-2">{continent.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
