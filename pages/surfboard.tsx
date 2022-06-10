import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {graphqlClient} from '../graphql/GraphqlClient';
import {PRODUCT_BY_ID} from '../graphql/query/ProductQuery';
import {ProductById, ProductByIdVariable} from '../graphql/types/Product';
import {customSlugify} from '../utils/slugify';

interface Props {
  product: ProductById;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {id, slug} = context.query;

  if (!id) return {notFound: true};

  const {data} = await graphqlClient.query<{product: ProductById}, ProductByIdVariable>({
    query: PRODUCT_BY_ID,
    variables: {id: Number(id)}
  });

  if (!data.product || slug !== customSlugify(data.product.title)) return {notFound: true};

  return {props: {product: data.product}};
};

const SurfBoard: NextPage<Props> = ({product}) => {
  const {pathname, push} = useRouter();
  const headTitle = product.title;
  const headDescription = product.description;
  const image = product.picture;
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
        <main className="sm:container sm:my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 relative">
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden bg-gray-300">
              <Image src={product.picture} alt={product.title} layout="fill" className="object-cover" />
            </div>
            <div className="container sm:px-6 mt-6 sm:mt-0">
              <h1 className="text-center text-primary font-bold text-4xl">{product.title}</h1>
              <p className="mt-4">{product.description.replace('… See more', '')}</p>
              <div className="mb-2 mt-12 flex justify-between font-medium">
                <span>Size: {product.size}</span>
                <span>📍{product.location}</span>
              </div>
              <span className="text-lg">
                <strong>{product.price}</strong>
              </span>
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => window.open(product.url, '_ blank')}
                  className="rounded-lg w-40 bg-primary text-white text-center p-3 cursor-pointer">
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }, [product]);
};

export default SurfBoard;
