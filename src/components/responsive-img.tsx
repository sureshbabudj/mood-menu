import React from "react";

const ResponsiveImage = ({
  src,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement & { src?: string }>) => {


  return (
    <div
      className="relative my-4 w-full h-full overflow-hidden aspect-[9_/_18] bg-cover bg-position-center lg:aspect-[9_/_12] rounded-sm bg-gradient-to-tr from-neutral-50 to-neutral-100"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1520218508822-998633d997e6?q=80&w=600')",
      }}
      title={alt}
      {...props}
    >
            <div className="absolute bottom-[-5%] right-[-10%] w-[32%] h-[110%] bg-white blur-[20px] rounded-sm" />
    </div>
  );
};

export default ResponsiveImage;
