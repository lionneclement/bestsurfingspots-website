import type {GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import {ProductItem} from '../components/item/ProductItem';
import {ListBoxUI} from '../components/ui/ListBoxUI';
import {MultipleListBoxUI} from '../components/ui/MultipleListBoxUi';
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
  const [sizeSelected, setSizeSelected] = useState<SizeDataTypes[]>([]);
  const [locationSelected, setLocationSelected] = useState<LocationDataTypes>(locationData[0]);

  useEffect(() => {
    let newProduct = product;

    if (sizeSelected.length > 0) {
      newProduct = product.filter(({size}) => sizeSelected.map(({name}) => name).includes(size));
    }
    if (locationSelected.id > 0) {
      newProduct = newProduct.filter(
        ({location}) => location.toLocaleLowerCase() === locationSelected.name.toLocaleLowerCase()
      );
    }

    setAllProduct(newProduct);
  }, [sizeSelected, locationSelected]);

  const headTitle = 'Buy used Surfboards in Bali, Indonesia';
  const headDescription =
    'Sale, Buy or Trade Surf, Surfing, Bodyboarding, snowboarding, skateboarding stuff for free, Bali Indonesia used new surfboards wetsuits accessories etc';
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
          <p className="text-center text-gray-400 font-medium text-lg mt-2">Buy used Surfboards in Bali, Indonesia</p>
          <div className="flex justify-around my-6 flex-wrap">
            <ListBoxUI
              value={locationSelected}
              setValue={setLocationSelected}
              data={locationData}
              containerClassName="z-20"
            />
            <MultipleListBoxUI
              containerClassName="z-10"
              data={sizeData}
              setValue={setSizeSelected}
              value={sizeSelected}
            />
          </div>
          <ProductItem products={allProduct} />
        </main>
      </>
    );
  }, [allProduct, sizeSelected, locationSelected]);
};

export default Home;
