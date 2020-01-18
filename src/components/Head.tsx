import React from "react";
import Helmet from "react-helmet";

interface HeadProps {
  title: string;
  description?: string;
  url?: string;
  themeColor?: string;
}

const Head = ({ title, description, url, themeColor }: HeadProps) => (
  <Helmet>
    {description && (
      <>
        <meta key="description" name="description" content={`${description}`} />
        <meta
          key="ogdescription"
          property="og:description"
          content={`${description}`}
        />
      </>
    )}

    {url && <meta key="ogurl" property="og:url" content={`${url}`} />}
    {themeColor && (
      <meta key="themecolor" name="theme-color" content={`${themeColor}`} />
    )}
    <meta key="ogtitle" property="og:title" content={`${title}`} />
    <title key="title">{title}</title>
  </Helmet>
);

export default Head;
