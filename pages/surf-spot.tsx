import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {StarRating} from '../components/Star';
import {graphqlClient} from '../graphql/GraphqlClient';
import {SURF_SPOT_BY_ID} from '../graphql/query/SurfSpotQuery';
import {SurfSpotById, SurfSpotByIdVariable} from '../graphql/types/SurfSpot';
import {getArrayChunks} from '../helpers/Array';
import {round5} from '../helpers/Number';
import {customSlugify} from '../utils/slugify';

interface Props {
  surfSpot: SurfSpotById;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {id, slug} = context.query;

  if (!id) return {notFound: true};

  const {data} = await graphqlClient.query<{surfSpot: SurfSpotById}, SurfSpotByIdVariable>({
    query: SURF_SPOT_BY_ID,
    variables: {surfSpotId: Number(id)},
    fetchPolicy: 'no-cache'
  });

  if (slug !== customSlugify(data.surfSpot.name)) return {notFound: true};

  return {props: {surfSpot: data.surfSpot}};
};

const SurfSpot: NextPage<Props> = ({surfSpot}) => {
  const forecasts = getArrayChunks(surfSpot.forecasts, 3);

  return (
    <>
      <Head>
        <meta name="description" content={`Best Surfing Spots in ${surfSpot.name}`} />
      </Head>
      <main className="py-10">
        <h1 className="text-center text-primary font-bold text-4xl">{surfSpot.name}</h1>
        {forecasts.map((forecast, index) => {
          const date = new Date(forecast[0].timestamp * 1000);
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
                  {
                    swell_max_breaking_height,
                    swell_min_breaking_height,
                    solid_rating,
                    swell_height,
                    swell_period,
                    swell_unit,
                    swell_primary_true_direction,
                    wind_compass_direction,
                    wind_rating,
                    wind_speed,
                    wind_true_direction,
                    condition_temperature,
                    three_hour_time_text,
                    condition_weather
                  },
                  index
                ) => {
                  const swellDirectionClassName = `msw-swa-${round5(swell_primary_true_direction)}`;
                  const windDirectionClassName = `msw-ssa-${round5(wind_true_direction)}`;
                  const weatherClassName = `msw-sw-${condition_weather}`;
                  return (
                    <div key={index} className="flex mx-1 justify-between">
                      <small className="w-10 text-center self-center">{three_hour_time_text}</small>
                      <div className="w-14 bg-primary text-white text-center flex items-center justify-center">
                        <span>
                          {swell_min_breaking_height}-{swell_max_breaking_height}
                          <small>{swell_unit}</small>
                        </span>
                      </div>
                      <div className="flex">
                        <div className="w-26 text-center self-center mr-2">
                          <div className="flex justify-between">
                            <span>
                              {swell_height}
                              {swell_unit}
                            </span>
                            <span>{swell_period}s</span>
                          </div>
                          {StarRating({value: solid_rating})}
                        </div>
                        <div className="w-10 text-center self-center justify-center">
                          <div
                            className={`bg-[url('http://im-1.msw.ms/md/static/sa-sprite.png')] ${swellDirectionClassName}`}
                          />
                          <small>{Math.round(swell_primary_true_direction)}°</small>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center justify-center w-10 mr-2">
                          <strong className="text-lg">{wind_speed}</strong>
                          <small className="text-xs">mph</small>
                        </div>
                        <div className="text-center self-center w-10">
                          <div
                            className={`bg-[url('http://im-1.msw.ms/md/static/wa-sprite.png')] ${windDirectionClassName}`}
                          />
                          <small className="text-xs">{wind_compass_direction}</small>
                        </div>
                      </div>
                      <div className=" w-16 hidden sm:flex items-center justify-center">
                        <div
                          className={`bg-[url('https://d12ke8i0d04z83.cloudfront.net/md/themes/msw_bs3/dist/assets/img/sprites/213944df.weather-icons.svg')] ${weatherClassName}`}
                        />
                        <span>
                          {condition_temperature}
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
