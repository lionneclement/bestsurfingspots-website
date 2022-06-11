import {GetServerSidePropsContext} from 'next';

const Robots = () => {
  return null;
};

export const getServerSideProps = async ({res}: GetServerSidePropsContext) => {
  const robotsTxt = `# *
User-agent: *
Allow: /

# Host
Host: ${process.env.NEXT_PUBLIC_URI}

# Sitemaps
Sitemap: ${process.env.NEXT_PUBLIC_URI}/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return {
    props: {}
  };
};

export default Robots;
