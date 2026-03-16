import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Recipe } from "@/types";
import { Flame } from "lucide-react";

type HotRecipesProps = React.HTMLAttributes<HTMLDivElement> & {
  recipes: Recipe[];
};

export function HotRecipes({ recipes, className, ...props }: HotRecipesProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  
  return (
    <div className={className} {...props}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="text-orange-400">
            <Flame size={24} className="fill-orange-400" />
          </div>
          <h3 className="text-3xl font-semibold font-sourgummy text-white">
            Hot Recipes
          </h3>
        </div>
        <span className="text-xs font-bold text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full">
          TRENDING
        </span>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-2 mb-9">
          {recipes.map((recipe, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <a
                title={recipe.strMeal}
                href={`/recipes/${recipe.idMeal}`}
                key={recipe.idMeal}
                className="group block relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
              >
                <AspectRatio ratio={1 / 1} className="">
                  <img
                    src={recipe.strMealThumb}
                    alt={`Photo for ${recipe.strMeal}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
                  />
                  
                  {/* Overlay with recipe name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-semibold text-sm line-clamp-2">
                      {recipe.strMeal}
                    </p>
                  </div>

                  {/* Flame badge on hot recipes */}
                  <div className="absolute top-2 right-2 bg-orange-500/90 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <Flame size={14} className="text-white fill-white" />
                  </div>
                </AspectRatio>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
