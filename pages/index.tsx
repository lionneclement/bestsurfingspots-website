import type {GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import {ListBoxUI} from '../components/ui/ListBoxUI';
import {locationData, LocationDataTypes, sizeData, SizeDataTypes} from '../data/TableData';
import {graphqlClient} from '../graphql/GraphqlClient';
import {PRODUCT} from '../graphql/query/ProductQuery';
import {Product} from '../graphql/types/Product';

interface Props {
  product: Product[];
}

export const getServerSideProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const productResult = await graphqlClient.query<{product: Product[]}>({
    query: PRODUCT
  });

  return {props: {product: productResult.data.product}};
};

const Home: NextPage<Props> = ({product}) => {
  const [allProduct, setAllProduct] = useState<Product[]>(product);
  const {pathname} = useRouter();
  const [sizeSelected, setSizeSelected] = useState<SizeDataTypes>(sizeData[0]);
  const [locationSelected, setLocationSelected] = useState<LocationDataTypes>(locationData[0]);

  useEffect(() => {
    let newProduct = product;
    if (sizeSelected.id > 0) {
      newProduct = product.filter(({size_string}) => size_string === sizeSelected.name);
    }
    if (locationSelected.id > 0) {
      newProduct = newProduct.filter(({location}) => location === locationSelected.name);
    }

    setAllProduct(newProduct);
  }, [sizeSelected, locationSelected]);

  const headTitle = 'Buy used Surfboards in California';
  const headDescription =
    'Sale, Buy or Trade Surf, Surfing, Bodyboarding, snowboarding, skateboarding stuff for free, California used new surfboards wetsuits accessories etc';
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
          <h1 className="text-center text-primary font-bold text-4xl">Buy and Sell</h1>
          <p className="text-center text-gray-400 font-medium text-lg mt-2">Buy used Surfboards in California</p>
          <div className="flex justify-around my-6 flex-wrap">
            <ListBoxUI
              value={locationSelected}
              setValue={setLocationSelected}
              data={locationData}
              containerClassName="z-20"
            />
            <ListBoxUI value={sizeSelected} setValue={setSizeSelected} data={sizeData} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-12 relative">
            {allProduct.map(({title, size_string, location, price, product_pictures, url, volume, picture}, index) => {
              return (
                <div key={index} className="relative h-full border rounded-xl overflow-hidden	">
                  <div className="relative w-full h-72">
                    <Image
                      src={picture || product_pictures[0].url}
                      alt={title}
                      layout="fill"
                      className="object-cover w-full relative"
                    />
                  </div>
                  <div className="px-3 pt-3">
                    <div className="flex justify-between text-gray-500">
                      <span>${price}</span>
                      <span>{location}</span>
                    </div>
                    <a className="stretched-link" target="_blank" rel="noreferrer" title={title} href={url}>
                      <h2 className="text-lg font-semibold truncate my-1">{title}</h2>
                    </a>
                    <div className="flex justify-between mb-2">
                      <span>Size {size_string}</span>
                      {volume && <span>{volume}L</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </>
    );
  }, [allProduct, sizeSelected, locationSelected]);
};

export default Home;
