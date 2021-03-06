import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import {ProductItem} from '../components/item/ProductItem';
import {MultipleListBoxUI} from '../components/ui/MultipleListBoxUi';
import {sizeData} from '../data/FilterData';
import {graphqlClient} from '../graphql/GraphqlClient';
import {PRODUCT, PRODUCT_SIZE} from '../graphql/query/ProductQuery';
import {Product, ProductSize} from '../graphql/types/Product';
import {customSlugify} from '../utils/slugify';

interface Props {
  product: Product[];
  productSize: ProductSize[];
  size: null | string;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {location, size} = context.query;

  if (location && location !== 'badung' && location !== 'denpasar') return {notFound: true};
  const [productResult, productSizeResult] = await Promise.all([
    graphqlClient.query<{product: Product[]}>({
      query: PRODUCT
    }),
    graphqlClient.query<{product: ProductSize[]}>({
      query: PRODUCT_SIZE
    })
  ]);

  const productSize = sizeData
    .filter((item) => productSizeResult.data.product?.some(({size}) => size === item))
    .map((size, index) => {
      return {size, id: index};
    });

  return {
    props: {
      product: productResult.data.product,
      productSize,
      size: (size as string) || null
    }
  };
};

const Home: NextPage<Props> = ({product, size, productSize}) => {
  const [allProduct, setAllProduct] = useState<Product[]>(product);
  const {pathname, push} = useRouter();

  const sizeByUrl = size
    ?.match(/([5-9]{1})([0-9]{1})([0-1]{0,1})/gm)
    ?.map((item) => item.slice(0, 1) + "'" + item.slice(1));

  const initSize = productSize.filter(({size}) => sizeByUrl?.includes(size));
  const [sizeSelected, setSizeSelected] = useState<ProductSize[]>(initSize);

  useEffect(() => {
    if (sizeSelected.length > 0) {
      setAllProduct(product.filter(({size}) => sizeSelected.map(({size}) => size).includes(size)));
    }
  }, [sizeSelected]);

  useEffect(() => {
    let url = '';
    const formatSizeUrl = () => `surfboards-size-${sizeSelected.map(({size}) => size)}`;

    if (sizeSelected.length > 0) url += formatSizeUrl();
    push('/' + customSlugify(url), undefined, {shallow: true});
  }, [sizeSelected]);

  const headTitle = 'Buy used Surfboards in Bali, Indonesia';
  const headDescription =
    'Buy or sell your new or secondhand|used surfboard for free on the beautiful island of Bali Indonesia';
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
            <MultipleListBoxUI
              containerClassName="z-10"
              data={productSize}
              setValue={setSizeSelected}
              value={sizeSelected}
            />
          </div>
          {allProduct.length === 0 ? (
            <div className="text-center mt-20">
              <Image src="/no-results.png" alt="" height={100} width={100} />
              <span className="text-2xl block mt-6">Bummer! No results.</span>
            </div>
          ) : (
            <ProductItem products={allProduct} />
          )}
        </main>
      </>
    );
  }, [allProduct, sizeSelected]);
};

export default Home;
