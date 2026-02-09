import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  name?: string;
  twitterHandle?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  name = 'MoodMenu',
  twitterHandle = '@moodmenu',
  noindex = false,
}) => {
  const siteTitle = title ? `${title} | ${name}` : name;
  const siteDescription = description || 'Discover recipes and restaurants based on your mood.';
  const siteKeywords = keywords || 'recipes, food, mood, dinner ideas, meal planning, mood-based recipes';
  const siteUrl = url || 'https://moodmenu.kanini.top';
  const siteImage = image || 'https://moodmenu.kanini.top/assets/logo-share.png';

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Structured Data: BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://moodmenu.kanini.top"
            },
            title ? {
              "@type": "ListItem",
              "position": 2,
              "name": title,
              "item": siteUrl
            } : null
          ].filter(Boolean)
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
