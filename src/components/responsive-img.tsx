import React from "react";

const ResponsiveImage = ({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const defaultSrc = "https://images.unsplash.com/photo-1554980291-c3e7cea75872?q=80&w=600&auto=format&fit=crop";

  return (
    <div className={`relative rounded-l-sm w-full h-full max-h-[80dvh] aspect-[9/30] md:aspect-[9/18] lg:aspect-[9/12] overflow-hidden ${className}`}>
      <img
        src={src || defaultSrc}
        alt={alt || "MoodMenu Food Recommendation"}
        className="w-full h-full object-cover"
        loading="lazy"
        {...props}
      />
      <div className="absolute bottom-[-5%] right-[-8%] w-[32%] h-[110%] bg-white blur-[10px] rounded-sm" />
    </div>
  );
};

export default ResponsiveImage;
