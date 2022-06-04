import axios from 'axios';
import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Forecast from '../components/magicSeaWeed/Forecast';
import Tide from '../components/magicSeaWeed/Tide';
import {graphqlClient} from '../graphql/GraphqlClient';
import {SURF_SPOT_BY_ID} from '../graphql/query/SurfSpotQuery';
import {SurfSpotById, SurfSpotByIdVariable} from '../graphql/types/SurfSpot';
import {getArrayChunks} from '../helpers/Array';
import {MagicSeaWeedForecast} from '../types/MagicSeaWeed/ForecastTypes';
import {MagicSeaWeedTide} from '../types/MagicSeaWeed/TideTypes';
import {customSlugify} from '../utils/slugify';

interface Props {
  surfSpot: SurfSpotById;
  forecast: MagicSeaWeedForecast[];
  tide: MagicSeaWeedTide[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {id, slug} = context.query;

  if (!id) return {notFound: true};

  const {data} = await graphqlClient.query<{surfSpot: SurfSpotById}, SurfSpotByIdVariable>({
    query: SURF_SPOT_BY_ID,
    variables: {surfSpotId: Number(id)}
  });

  if (slug !== customSlugify(data.surfSpot.name.replace('/', ''))) return {notFound: true};

  const date = new Date();
  const nowUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;
  const inOneWeekUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 6) / 1000;

  const [forecast, tide]: [forecast: {data: MagicSeaWeedForecast[]}, tide: {data: MagicSeaWeedTide[]}] =
    await Promise.all([
      axios.get(
        `http://magicseaweed.com/api/mdkey/forecast/?spot_id=${data.surfSpot.magicseaweed_id}&fields=localTimestamp,timestamp,fadedRating,solidRating,threeHourTimeText,swell.unit,swell.height,swell.minBreakingHeight,swell.maxBreakingHeight,swell.period,swell.components.primary.trueDirection,wind.speed,wind.compassDirection,wind.trueDirection,wind.rating,condition.temperature,condition.weather&units=us`
      ),
      axios.get(
        `https://magicseaweed.com/api/mdkey/tide/?spot_id=${data.surfSpot.magicseaweed_id}&start=${nowUtc}&end=${inOneWeekUtc}&units=us`
      )
    ]);

  return {props: {surfSpot: data.surfSpot, forecast: forecast.data, tide: tide.data}};
};

const SurfSpot: NextPage<Props> = ({surfSpot, forecast, tide}) => {
  const forecasts = getArrayChunks(forecast, 8);

  return (
    <>
      <Head>
        <meta name="description" content={`Best Surfing Spots in ${surfSpot.name}`} />
      </Head>
      <main className="py-10">
        <h1 className="text-center text-primary font-bold text-4xl">
          {surfSpot.name}, {surfSpot.surf_area.name}
        </h1>
        {forecasts.map((forecast, index) => {
          const date = new Date(forecast[0].localTimestamp * 1000);
          return (
            <div key={index} className="sm:container">
              <h2 className="font-bold mt-16 mb-2 ml-3 sm:ml-0 text-xl">
                {date.toLocaleDateString('en-us', {weekday: 'long'}) + ' '}
                <small className="font-medium">
                  {date.toLocaleDateString('en-us', {month: '2-digit', day: '2-digit'})}
                </small>
              </h2>
              <div className="md:flex justify-between">
                <div className="w-full mr-10">
                  {forecast.map((spotForecast, index) => {
                    return <Forecast key={index} forecast={spotForecast} />;
                  })}
                </div>
                <Tide tide={tide} index={index} surfSpot={surfSpot} date={date} />
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default SurfSpot;
