import axios from 'axios';
import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {StarRating} from '../components/Star';
import {graphqlClient} from '../graphql/GraphqlClient';
import {SURF_SPOT_BY_ID} from '../graphql/query/SurfSpotQuery';
import {SurfSpotById, SurfSpotByIdVariable} from '../graphql/types/SurfSpot';
import {getArrayChunks} from '../helpers/Array';
import {round5} from '../helpers/Number';
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

  if (slug !== customSlugify(data.surfSpot.name)) return {notFound: true};

  const date = new Date();
  const nowUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const inOneWeekUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7);

  const forecast: {data: MagicSeaWeedForecast[]} = await axios.get(
    `http://magicseaweed.com/api/mdkey/forecast/?spot_id=${data.surfSpot.magicseaweed_id}&fields=localTimestamp,timestamp,fadedRating,solidRating,threeHourTimeText,swell.unit,swell.height,swell.minBreakingHeight,swell.maxBreakingHeight,swell.period,swell.components.primary.trueDirection,wind.speed,wind.compassDirection,wind.trueDirection,wind.rating,condition.temperature,condition.weather&units=us`
  );

  const tide: {data: MagicSeaWeedTide[]} = await axios.get(
    `https://magicseaweed.com/api/mdkey/tide/?spot_id=${data.surfSpot.magicseaweed_id}&start=${nowUtc}&end=${inOneWeekUtc}&units=us`
  );

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
              <h3 className="font-bold mt-6 mb-2 ml-3 sm:ml-0">
                {date.toLocaleDateString('en-us', {weekday: 'long'}) + ' '}
                <small className="font-medium">
                  {date.toLocaleDateString('en-us', {month: '2-digit', day: '2-digit'})}
                </small>
              </h3>
              {forecast.map(
                (
                  {solidRating, threeHourTimeText, swell, wind, condition},
                  index
                ) => {
                  const swellDirectionClassName = `msw-swa-${round5(swell.components.primary.trueDirection)}`;
                  const windDirectionClassName = `msw-ssa-${round5(wind.trueDirection)}`;
                  const weatherClassName = `msw-sw-${condition.weather}`;
                  return (
                    <div key={index} className="flex mx-1 justify-between">
                      <small className="w-10 text-center self-center">{threeHourTimeText}</small>
                      <div className="w-14 bg-primary text-white text-center flex items-center justify-center">
                        <span>
                          {swell.minBreakingHeight}-{swell.maxBreakingHeight}
                          <small>{swell.unit}</small>
                        </span>
                      </div>
                      <div className="flex">
                        <div className="w-26 text-center self-center mr-2">
                          <div className="flex justify-between">
                            <span>
                              {swell.height}
                              {swell.unit}
                            </span>
                            <span>{swell.period}s</span>
                          </div>
                          {StarRating({value: solidRating})}
                        </div>
                        <div className="w-10 text-center self-center justify-center">
                          <div
                            className={`bg-[url('http://im-1.msw.ms/md/static/sa-sprite.png')] ${swellDirectionClassName}`}
                          />
                          <small>{Math.round(swell.components.primary.trueDirection)}°</small>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center justify-center w-10 mr-2">
                          <strong className="text-lg">{wind.speed}</strong>
                          <small className="text-xs">mph</small>
                        </div>
                        <div className="text-center self-center w-10">
                          <div
                            className={`bg-[url('http://im-1.msw.ms/md/static/wa-sprite.png')] ${windDirectionClassName}`}
                          />
                          <small className="text-xs">{wind.compassDirection}</small>
                        </div>
                      </div>
                      <div className=" w-16 hidden sm:flex items-center justify-center">
                        <div
                          className={`bg-[url('https://d12ke8i0d04z83.cloudfront.net/md/themes/msw_bs3/dist/assets/img/sprites/213944df.weather-icons.svg')] ${weatherClassName}`}
                        />
                        <span>
                          {condition.temperature}
                          <small className="text-xs">°f</small>
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          );
        })}
      </main>
    </>
  );
};

export default SurfSpot;
