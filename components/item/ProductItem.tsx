import Image from 'next/image';
import Link from 'next/link';
import {GcloudStoragePath} from '../../config/link';
import {Product} from '../../graphql/types/Product';
import {surfboardLink} from '../../helpers/Link';

export const ProductItem = ({products}: {products: Product[]}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6 relative">
      {products.map(({title, size, location, price, picture, id, product_pictures}, index) => {
        if (index < 100) {
          return (
            <div key={index} className="relative h-full border rounded-lg overflow-hidden">
              <div className="relative w-full h-72 bg-gray-300">
                <Image
                  src={product_pictures.length > 0 ? `${GcloudStoragePath}${product_pictures[0].url}` : picture}
                  alt={title}
                  layout="fill"
                  className="object-cover w-full relative"
                  priority={index < 8}
                />
              </div>
              <div className="px-3 pt-3">
                <div className="flex justify-between text-gray-500">
                  <span>Size {size}</span>
                  <span>{location}</span>
                </div>
                <div className="truncate">
                  <Link href={surfboardLink({id, title})}>
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
        }
      })}
    </div>
  );
};
