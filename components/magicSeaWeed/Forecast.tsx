import {FunctionComponent} from 'react';
import {round5} from '../../helpers/Number';
import {MagicSeaWeedForecast} from '../../types/MagicSeaWeed/ForecastTypes';
import {StarRating} from '../Star';

interface Props {
  forecast: MagicSeaWeedForecast;
}

const Forecast: FunctionComponent<Props> = ({forecast}) => {
  const {solidRating, threeHourTimeText, swell, wind, condition} = forecast;

  const swellDirectionClassName = `msw-swa-${round5(swell.components.primary.trueDirection)}`;
  const windDirectionClassName = `msw-ssa-${round5(wind.trueDirection)}`;
  const weatherClassName = `msw-sw-${condition.weather}`;

  return (
    <div className="flex mx-1 justify-between">
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
          <div className={`bg-[url('http://im-1.msw.ms/md/static/sa-sprite.png')] ${swellDirectionClassName}`} />
          <small>{Math.round(swell.components.primary.trueDirection)}°</small>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center justify-center w-10 mr-2">
          <strong className="text-lg">{wind.speed}</strong>
          <small className="text-xs">mph</small>
        </div>
        <div className="text-center self-center w-10">
          <div className={`bg-[url('http://im-1.msw.ms/md/static/wa-sprite.png')] ${windDirectionClassName}`} />
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
};

export default Forecast;
