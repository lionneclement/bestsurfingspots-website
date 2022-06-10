import Image from 'next/image';
import Link from 'next/link';
import {Product} from '../../graphql/types/Product';
import {customSlugify} from '../../utils/slugify';

export const ProductItem = ({products}: {products: Product[]}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6 relative">
      {products.map(({title, size, location, price, picture, id}, index) => {
        return (
          <div key={index} className="relative h-full border rounded-lg overflow-hidden">
            <div className="relative w-full h-72 bg-gray-300">
              <Image src={picture} alt={title} layout="fill" className="object-cover w-full relative" />
            </div>
            <div className="px-3 pt-3">
              <div className="flex justify-between text-gray-500">
                <span>Size {size}</span>
                <span>{location}</span>
              </div>
              <div className="truncate">
                <Link href={customSlugify(`/surfboard/${id}-${title}`)}>
                  <a className="stretched-link" title={title}>
                    <span className="text-lg font-semibold my-1">{title}</span>
                  </a>
                </Link>
              </div>
              <div className="flex justify-between mb-2">
                <span>{price}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
