import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {graphqlClient} from '../graphql/GraphqlClient';
import {COUNTRY_ISO_BY_ID} from '../graphql/query/CountryIsoQuery';
import {CountryIsoById, CountryIsoByIdVariable} from '../graphql/types/CountryIso';
import {getImageSrc} from '../helpers/Image';
import {capitalize} from '../helpers/String';
import {customSlugify} from '../utils/slugify';

interface Props {
  countryIso: CountryIsoById;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {id, slug} = context.query;

  if (!id) return {notFound: true};

  const countryIsoResult = await graphqlClient.query<{countryIso: CountryIsoById}, CountryIsoByIdVariable>({
    query: COUNTRY_ISO_BY_ID,
    variables: {countryId: Number(id)}
  });
  const countryIso = countryIsoResult.data.countryIso;

  if (slug !== customSlugify(countryIso.name)) return {notFound: true};

  return {props: {countryIso: countryIsoResult.data.countryIso}};
};

const Country: NextPage<Props> = ({countryIso}) => {
  const {beer, single_person, family, cigarettes, coffee, dinner} = countryIso.cost_of_livings[0];

  return (
    <>
      <Head>
        <title>Best Surfing Spots in {countryIso.name}</title>
        <meta name="description" content="the best places to surf in the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="relative w-full h-80">
          <Image
            src={getImageSrc(countryIso.image)}
            className="object-cover w-full"
            alt={countryIso.name}
            layout="fill"
          />
          <h1 className="absolute bg-[#00000080] w-full h-full text-center text-white font-bold text-4xl pt-32">
            Best Surfing Spots in {countryIso.name}
          </h1>
        </section>
        <div className="container py-10">
          <h2 className="font-bold text-2xl">Guide</h2>
          <div className="flex mt-4 justify-between">
            <span className="w-[45%] flex justify-between">
              <strong>🌐 Continent</strong>
              {countryIso.continent.name}
            </span>
            <span className="w-[45%] flex justify-between">
              <strong>🗣️ Official language</strong>
              {countryIso.language_country_isos.map(({language}) => capitalize(language.name)).join(', ')}
            </span>
          </div>
          <h2 className="font-bold text-2xl mt-16">Cost of living</h2>
          <div className="flex mt-4 justify-between flex-wrap">
            <span className="w-[45%] flex justify-between">
              <strong>💰 Single person</strong>${single_person} / month
            </span>
            <span className="w-[45%] flex justify-between">
              <strong>💰 Family of four</strong>${family} / month
            </span>
            <span className="my-2 w-[45%] flex justify-between">
              <strong>🍺 Beer (0.5L)</strong>${beer}
            </span>
            <span className="my-2 w-[45%] flex justify-between">
              <strong>🚬 1 package of cigarettes</strong>${cigarettes}
            </span>
            <span className="w-[45%] flex justify-between">
              <strong>☕️ Coffee</strong>${coffee}
            </span>
            <span className="w-[45%] flex justify-between">
              <strong>🍛 Dinner</strong>${dinner}
            </span>
          </div>
          <h2 className="font-bold text-2xl mt-16">Surf areas</h2>
          {countryIso.countries.map(({name, surf_areas}, index) => {
            return (
              <div key={index} className="mt-4">
                <h3 className="font-bold text-xl">{name}</h3>
                <div className="flex justify-between flex-wrap">
                  {surf_areas.map(({name, id, surf_spots_aggregate}, index) => (
                    <span className="w-[45%] flex justify-between mt-2 relative" key={index}>
                      <Link href={customSlugify(`/surf-area/${id}-${name}`)}>
                        <a className="stretched-link" title={name}>
                          <strong>{name}</strong>
                        </a>
                      </Link>
                      {surf_spots_aggregate.aggregate.count} spots
                    </span>
                  ))}
                </div>
                {index !== countryIso.countries.length - 1 && <hr className="my-8" />}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Country;
