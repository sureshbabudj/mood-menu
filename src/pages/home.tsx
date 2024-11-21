import { RecipeForm } from "@/components/recipe-from";
import ResponsiveImage from "@/components/responsive-img";
import { SVGAttributes } from "lucide-react";

function FoodPlateSvg(props: SVGAttributes) {
  return (
    <svg
      className="fill-current"
      height={64}
      width={64}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      {...props}
    >
      <path d="M60,36.5c0-1.654-1.346-3-3-3H3c-1.654,0-3,1.346-3,3c0,1.635,1.316,2.964,2.944,2.994c1.289,1.725,3.6,3.496,6.05,5.364 c2.319,1.767,4.803,3.665,6.575,5.642h28.862c1.772-1.977,4.256-3.874,6.575-5.642c2.449-1.868,4.761-3.639,6.05-5.364 C58.684,39.464,60,38.135,60,36.5z"></path>
      <path d="M10,32.5c0.553,0,1-0.447,1-1c0-4.963,4.037-9,9-9h2c0.553,0,1-0.447,1-1s-0.447-1-1-1h-2c-6.065,0-11,4.935-11,11 C9,32.053,9.447,32.5,10,32.5z"></path>
      <path d="M25,26.5h-5c-2.757,0-5,2.243-5,5c0,0.553,0.447,1,1,1s1-0.447,1-1c0-1.654,1.346-3,3-3h5c0.553,0,1-0.447,1-1 S25.553,26.5,25,26.5z"></path>
      <path d="M24,25.5c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4c-4.411,0-8,3.589-8,8c0,0.553,0.447,1,1,1s1-0.447,1-1c0-3.309,2.691-6,6-6 H24z"></path>
      <path d="M25,29.5h-5c-0.553,0-1,0.447-1,1s0.447,1,1,1h5c0.553,0,1-0.447,1-1S25.553,29.5,25,29.5z"></path>
      <path d="M32,20.5c-0.553,0-1,0.447-1,1s0.447,1,1,1h7c4.963,0,9,4.037,9,9c0,0.553,0.447,1,1,1s1-0.447,1-1c0-6.065-4.935-11-11-11 H32z"></path>
      <path d="M42,31.5c0,0.553,0.447,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5h-5c-0.553,0-1,0.447-1,1s0.447,1,1,1h5 C40.654,28.5,42,29.846,42,31.5z"></path>
      <path d="M46,32.5c0.553,0,1-0.447,1-1c0-4.411-3.589-8-8-8h-6c-0.553,0-1,0.447-1,1s0.447,1,1,1h6c3.309,0,6,2.691,6,6 C45,32.053,45.447,32.5,46,32.5z"></path>
      <path d="M34,29.5c-0.553,0-1,0.447-1,1s0.447,1,1,1h5c0.553,0,1-0.447,1-1s-0.447-1-1-1H34z"></path>
      <path d="M28,32.5c0.553,0,1-0.447,1-1c0-12.397-5.438-15-10-15c-1.654,0-3,1.346-3,3c0,0.553,0.447,1,1,1s1-0.447,1-1 c0-0.552,0.448-1,1-1c5.383,0,8,4.252,8,13C27,32.053,27.447,32.5,28,32.5z"></path>
      <path d="M13,22.5c0.553,0,1-0.447,1-1v-1c0-2.757,2.243-5,5-5c9.928,0,11,11.189,11,16c0,0.553,0.447,1,1,1s1-0.447,1-1 c0-11.271-4.859-18-13-18c-3.859,0-7,3.141-7,7v1C12,22.053,12.447,22.5,13,22.5z"></path>
      <path d="M33,19.5c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S30.794,19.5,33,19.5z"></path>
      <path d="M25.5,14.5c2.481,0,4.5-2.019,4.5-4.5s-2.019-4.5-4.5-4.5S21,7.519,21,10S23.019,14.5,25.5,14.5z"></path>
      <path d="M38,16.5c0,2.206,1.794,4,4,4s4-1.794,4-4s-1.794-4-4-4S38,14.294,38,16.5z"></path>
      <path d="M36,11.5c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S33.794,11.5,36,11.5z"></path>
      <path d="M18,55.5v1h24v-1c0-1.011,0.351-2.013,0.935-3H17.065C17.649,53.487,18,54.489,18,55.5z"></path>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex max-sm:flex-col sm:flex-row sm:space-x-8">
      <div className="self-center hidden sm:block md:basis-1/2">
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80"
          alt="intro"
          className="rounded-lg object-cover mx-auto max-h-[600px]"
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 p-4 grow">
        <div className="relative p-2 m-2  bg-orange-400 rounded-3xl  skew-x-1 skew-y-1">
          <span className="block absolute w-full -top-2 -left-2 bg-orange-400 opacity-70 rounded-3xl h-full -z-10 -skew-x-1 -skew-y-3"></span>
          <div className="flex flex-row p-2 text-white justify-between items-center">
            <p className="text-lg font-extrabold font-sourgummy sm:text-2xl">
              Find the Perfect Recipe to Match Your Mood!
            </p>
            <FoodPlateSvg />
          </div>
        </div>
        <RecipeForm className="w-full max-w-lg block" />
      </div>
    </div>
  );
}
