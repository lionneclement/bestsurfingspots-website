import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import {ListBoxUI} from '../components/ui/ListBoxUI';
import {continentData, ContinentDataTypes, costOfLivingData, CostOfLivingDataTypes} from '../data/TableData';
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
  const {push, pathname} = useRouter();
  const [allCountry, setAllCountry] = useState<HomeCountryIso[]>(countryIso);
  const [continentSelected, setContinentSelected] = useState<ContinentDataTypes>(
    homeFilter?.continent || continentData[0]
  );
  const [costOfLivingSelected, setCostOfLivingSelected] = useState<CostOfLivingDataTypes>(
    homeFilter?.costOfLiving || costOfLivingData[0]
  );

  useEffect(() => {
    const pathname = homePathName({continentSelected, costOfLivingSelected});
    push({pathname}, undefined, {shallow: true});
  }, [continentSelected, costOfLivingSelected]);

  useEffect(() => {
    setAllCountry(
      countryIso.filter(({cost_of_livings}) => cost_of_livings[0].single_person <= costOfLivingSelected.costOfLiving)
    );
  }, [costOfLivingSelected]);

  const continentFilter = () => {
    if (continentSelected.id === 0) return countryIso;
    const continentName = continentData.filter(({id}) => id === continentSelected.id)[0].name;
    return countryIso.filter(({continent}) => continentName.includes(continent.name));
  };

  useEffect(() => {
    setAllCountry(continentFilter());
  }, [continentSelected]);

  const headTitle = 'The best places to surf in the world';
  const headDescription = `Discover the best surfing spots in the world. ${allCountry
    .map(({name}, index) => `#${index + 1} ${name}`)
    .join(', ')}`;
  const image = 'https://storage.googleapis.com/bestsurfingspots/home.jpg';

  return useMemo(() => {
    return (
      <>
        <Head>
          {/* Title */}
          <title>{headTitle}</title>
          <meta data-rh property="og:title" content={headTitle} />
          {/* Description */}
          <meta data-rh name="description" content={headDescription} />
          <meta data-rh property="og:description" content={headDescription} />
          {/* Twitter */}
          <meta data-rh name="twitter:title" content={headTitle} />
          <meta data-rh name="twitter:card" content="summary_large_image" />
          <meta data-rh name="twitter:image:src" content={image} />
          <meta data-rh name="twitter:description" content={headDescription} />
          {/* og */}
          <meta data-rh property="og:url" content={pathname} />
          <meta data-rh property="og:image" content={image} />
        </Head>
        <main className="container my-10">
          <h1 className="text-center text-primary font-bold text-4xl">Best Surfing Spots</h1>
          <p className="text-center text-gray-400 font-medium text-lg mt-2">the best places to surf in the world</p>
          <div className="flex justify-around my-6 flex-wrap">
            <ListBoxUI
              value={continentSelected}
              setValue={setContinentSelected}
              data={continentData}
              containerClassName="z-20"
            />
            <ListBoxUI
              value={costOfLivingSelected}
              setValue={setCostOfLivingSelected}
              data={costOfLivingData}
              containerClassName="z-10"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allCountry.map(({emoji, name, cost_of_livings, language_country_isos, continent, id, image}, index) => {
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
  }, [allCountry]);
};

export default Home;
