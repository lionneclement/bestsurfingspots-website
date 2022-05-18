import type {GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {graphqlClient} from '../graphql/GraphqlClient';
import {COUNTRY_ISO} from '../graphql/query/CountryIsoQuery';

interface CountryIso {
  emoji: string;
  name: string;
  cost_of_livings: {single_person: number}[];
  language_country_isos: {language: {name: string}}[];
  continent: {name: string};
}

export const getServerSideProps = async (): Promise<GetStaticPropsResult<{countryIso: CountryIso[]}>> => {
  const countryIsoResult = await graphqlClient.query<{countryIso: CountryIso[]}>({
    query: COUNTRY_ISO
  });

  return {
    props: {
      countryIso: countryIsoResult.data.countryIso
    }
  };
};

const Home: NextPage<{countryIso: CountryIso[]}> = ({countryIso}) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>Welcome to Next.js!</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Emoji
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost of living
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Languages
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Continent
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {countryIso.map((row, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{row.emoji}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.cost_of_livings[0].single_person}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.language_country_isos[0].language.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.continent.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Home;
