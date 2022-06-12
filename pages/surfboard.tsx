import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useMemo, useState} from 'react';
import {ProductItem} from '../components/item/ProductItem';
import {GroupModal} from '../components/modal/GroupModal';
import {graphqlClient} from '../graphql/GraphqlClient';
import {PRODUCT_BY_ID, PRODUCT_BY_SIZE} from '../graphql/query/ProductQuery';
import {Product, ProductById, ProductByIdVariable, ProductBySizeVariable} from '../graphql/types/Product';
import {memberFormatter} from '../helpers/Number';
import {capitalize} from '../helpers/String';
import {customSlugify} from '../utils/slugify';

interface Props {
  product: ProductById;
  productBySize: Product[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {id, slug} = context.query;

  if (!id) return {notFound: true};

  const {data} = await graphqlClient.query<{product: ProductById}, ProductByIdVariable>({
    query: PRODUCT_BY_ID,
    variables: {id: Number(id)}
  });

  if (!data.product || slug !== customSlugify(data.product.title.replace(/\//g, '-'))) return {notFound: true};

  const productSizeResult = await graphqlClient.query<{product: Product[]}, ProductBySizeVariable>({
    query: PRODUCT_BY_SIZE,
    variables: {size: data.product.size, id: data.product.id}
  });

  return {props: {product: data.product, productBySize: productSizeResult.data.product}};
};

const SurfBoard: NextPage<Props> = ({product, productBySize}) => {
  const {pathname} = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const joinGroup = () => {
    window.open(product.facebook_group.link, '_ blank');
    closeModal();
  };
  const viewProduct = () => {
    window.open(product.url, '_ blank');
    closeModal();
  };

  const productClicked = () => (product.facebook_group.status === 'private' ? openModal() : viewProduct());

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
        <main className="container sm:my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 relative gap-4">
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden bg-gray-300">
              <Image src={product.picture} alt={product.title} layout="fill" className="object-cover" />
            </div>
            <div className="px-2">
              <div onClick={productClicked} role="button">
                <h1 className="text-center text-primary font-bold text-4xl">{product.title}</h1>
                <p className="mt-4">{product.description.replace('… See more', '')}</p>
                <div className="mb-2 mt-6 flex justify-between font-medium">
                  <span>Size: {product.size}</span>
                  <span>📍{product.location}</span>
                </div>
                <span className="text-lg">
                  <strong>{product.price}</strong>
                </span>
              </div>
              <div onClick={() => window.open(product.facebook_group.link, '_ blank')} role="button">
                <span className="mt-10 block font-semibold text-lg">From Facebook Group</span>
                <div className="mt-2 flex justify-between bg-[#7490a3] p-4 rounded-lg cursor-pointer text-white">
                  <div className="mt-2 min-h-[4rem] min-w-[4rem] relative h-fit rounded-lg overflow-hidden mr-4">
                    <Image
                      src={product.facebook_group.picture}
                      alt={product.facebook_group.name}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-lg">{product.facebook_group.name}</span>
                    <span className="block text-gray-200">
                      {capitalize(product.facebook_group.status)} group -{' '}
                      {memberFormatter(product.facebook_group.members)}
                    </span>
                    <span className="text-clip text-sm text-gray-300">{product.facebook_group.description}</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex justify-center">
                <button
                  onClick={productClicked}
                  className="rounded-lg bg-primary font-medium text-lg text-white text-center py-4 px-16 cursor-pointer">
                  View Full Details
                </button>
              </div>
            </div>
          </div>
          {productBySize.length > 0 && (
            <>
              <h2 className="font-semibold text-2xl mt-20 text-primary">More Surfboards {product.size}</h2>
              <ProductItem products={productBySize} />
            </>
          )}
          <GroupModal isOpen={isOpen} joinGroup={joinGroup} viewProduct={viewProduct} closeModal={closeModal} />
        </main>
      </>
    );
  }, [product, isOpen, productBySize]);
};

export default SurfBoard;
