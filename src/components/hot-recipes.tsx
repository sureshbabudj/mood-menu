import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Recipe } from "@/orm/entities/recipe";

type HotRecipesProps = React.HTMLAttributes<HTMLDivElement> & {
  recipes: Recipe[];
};

export function HotRecipes({ recipes, className, ...props }: HotRecipesProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className={className} {...props}>
      <h3 className="text-lg font-semibold font-sourgummy text-primary my-4">
        Hot Recipes
      </h3>
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
              className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/5"
            >
              <a
                title={recipe.strMeal}
                href={`/recipes/${recipe.idMeal}`}
                key={recipe.idMeal}
                className=" hover:opacity-85"
              >
                <AspectRatio ratio={1 / 1} className="drop-shadow-xl px-3">
                  <img
                    src={recipe.strMealThumb}
                    alt={`Photo for ${recipe.strMeal}`}
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
