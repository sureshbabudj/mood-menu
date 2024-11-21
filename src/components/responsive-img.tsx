import React from "react";

const ResponsiveImage = ({
  src,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const srcSet = `
    ${src}&w=320 320w,
    ${src}&w=480 480w,
    ${src}&w=800 800w,
    ${src}&w=1200 1200w
  `;

  return (
    <img
      src={`${src}&w=600`}
      srcSet={srcSet}
      sizes="(max-width: 320px) 320px,
             (max-width: 480px) 480px,
             (max-width: 800px) 800px,
             1200px"
      alt={alt}
      {...props}
    />
  );
};

export default ResponsiveImage;
