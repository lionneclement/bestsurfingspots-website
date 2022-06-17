import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useMemo, useState} from 'react';
import {Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from 'swiper/react';
import {ProductItem} from '../components/item/ProductItem';
import {MessageModal} from '../components/modal/MessageModal';
import {GcloudStoragePath} from '../config/link';
import {graphqlClient} from '../graphql/GraphqlClient';
import {UPDATE_VISIT_PRODUCT} from '../graphql/mutation/ProductMutation';
import {PRODUCT_BY_ID, PRODUCT_BY_SIZE} from '../graphql/query/ProductQuery';
import {
  Product,
  ProductById,
  ProductByIdVariable,
  ProductBySizeVariable,
  UpdateVisitProduct
} from '../graphql/types/Product';
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

  if (!data.product || !data.product.visible || slug !== customSlugify(data.product.title.replace(/\//g, '-')))
    return {notFound: true};

  const productSizeResult = await graphqlClient.query<{product: Product[]}, ProductBySizeVariable>({
    query: PRODUCT_BY_SIZE,
    variables: {size: data.product.size, id: data.product.id}
  });

  graphqlClient.mutate<{product: {id: number}}, UpdateVisitProduct>({
    mutation: UPDATE_VISIT_PRODUCT,
    variables: {visit: data.product.visit + 1, id: data.product.id}
  });

  return {props: {product: data.product, productBySize: productSizeResult.data.product}};
};

const SurfBoard: NextPage<Props> = ({product, productBySize}) => {
  const {pathname} = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const productClicked = () => {
    openModal();
  };

  const headTitle = `Surfboard ${product.size} in ${product.location} Bali Indonesia ${product.title}`.slice(0, 70);
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
        <main className="lg:container">
          <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-4 lg:mt-6">
            <div className="lg:col-span-2 relative w-full h-[50vh] lg:h-[80vh] lg:rounded-lg lg:overflow-hidden">
              <Swiper
                pagination={{
                  clickable: true
                }}
                style={{
                  // @ts-ignore
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff'
                }}
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="w-full h-full relative">
                {product.product_pictures.length > 0 ? (
                  <>
                    {product.product_pictures.map(({url}, index) => {
                      const urlFormatted: string =
                        product.product_pictures.length > 0 ? `${GcloudStoragePath}${url}` : product.picture;
                      return (
                        <SwiperSlide
                          key={index}
                          style={{backgroundImage: `url(${urlFormatted})`}}
                          className={'bg-cover'}>
                          <Image
                            src={urlFormatted}
                            alt={product.title}
                            layout="fill"
                            className="object-contain backdrop-blur-lg"
                            priority={index === 0}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </>
                ) : (
                  <SwiperSlide
                    style={{backgroundImage: `url(${GcloudStoragePath + product.picture})`}}
                    className={'bg-cover'}>
                    <Image
                      src={GcloudStoragePath + product.picture}
                      alt={product.title}
                      layout="fill"
                      className="object-contain backdrop-blur-lg"
                      priority
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className="px-6 lg:px-2">
              <div onClick={productClicked} role="button">
                {!product.in_stock && <span className="text-3xl font-bold text-red-600">Sold</span>}
                <h1 className="text-primary font-bold text-3xl">{capitalize(product.title)}</h1>
                <span className="text-lg">
                  <strong>{product.price}</strong>
                </span>
                <span className="text-lg block mt-6">
                  <strong>Details</strong>
                </span>
                <p className="mt-2">{product.description.replace('… See more', '')}</p>
                <div className="mb-2 mt-6 flex justify-between font-medium">
                  <span>Size: {product.size}</span>
                  <span>📍{product.location}</span>
                </div>
              </div>
              <div className="mt-12 flex justify-center">
                <button
                  onClick={productClicked}
                  className="rounded-lg bg-primary font-medium text-lg text-white text-center py-4 px-16 cursor-pointer">
                  💬 Message seller
                </button>
              </div>
            </div>
          </div>
          <div className="container lg:p-0">
            {productBySize.length > 0 && (
              <>
                <h2 className="font-semibold text-2xl mt-20 text-primary">More Surfboards {product.size}</h2>
                <ProductItem products={productBySize} />
              </>
            )}
          </div>
          <MessageModal isOpen={isOpen} closeModal={closeModal} />
        </main>
      </>
    );
  }, [product, isOpen, productBySize]);
};

export default SurfBoard;
