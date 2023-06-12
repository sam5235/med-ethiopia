import Head from "next/head";

const SEOTags = ({ title, url, image, description, card }) => {
  
  return (
    <Head>
      <title>{title}</title>
      <meta property="url" content={url} />
      <meta property="image" content={image} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content={card} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default SEOTags;
