import Image from 'next/image';
import {FunctionComponent} from 'react';
import {SurfSpotById} from '../../graphql/types/SurfSpot';
import {MagicSeaWeedTide} from '../../types/MagicSeaWeed/TideTypes';

interface Props {
  tide: MagicSeaWeedTide[];
  index: number;
  surfSpot: SurfSpotById;
  date: Date;
}

const Tide: FunctionComponent<Props> = ({tide, index, surfSpot, date}) => {
  return (
    <div className="flex flex-col">
      <h3 className='mb-2 md:mt-0 mt-4 ml-3 sm:ml-0'>Tide and daylight times</h3>
      <Image
        src={tide[index].images.full}
        alt={`Tide and daylight times for ${surfSpot.name}, ${surfSpot.surf_area.name} ${date}`}
        height={87}
        width={532}
      />
      <Image
        src="https://d12ke8i0d04z83.cloudfront.net/md/themes/msw_bs3/dist/assets/img/fb709464.tide-scale.png"
        alt={`Tide and daylight times for `}
        height={25}
        width={532}
      />
      <div className="mt-4 flex justify-around md:justify-between text-base md:text-sm">
        <table>
          <tbody>
            {tide[index].tide.map(({shift, state, timestamp}, index) => {
              const date = new Date(timestamp * 1000);
              return (
                <tr key={index}>
                  <td>
                    <strong>{state}</strong>
                  </td>
                  <td className="text-center">
                    {date.toLocaleTimeString('en-US', {
                      timeZone: 'UTC',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="text-right">
                    {shift}
                    {tide[index].unit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>First Light</strong>
              </td>
              <td>
                {new Date(tide[index].sunriseTwilight * 1000).toLocaleTimeString('en-US', {
                  timeZone: 'UTC',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Sunrise</strong>
              </td>
              <td>
                {new Date(tide[index].sunrise * 1000).toLocaleTimeString('en-US', {
                  timeZone: 'UTC',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Sunset</strong>
              </td>
              <td>
                {new Date(tide[index].sunset * 1000).toLocaleTimeString('en-US', {
                  timeZone: 'UTC',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Last Light</strong>
              </td>
              <td>
                {new Date(tide[index].sunsetTwilight * 1000).toLocaleTimeString('en-US', {
                  timeZone: 'UTC',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tide;
