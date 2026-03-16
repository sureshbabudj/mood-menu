import * as React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

type RecipeTagsProps = React.HTMLAttributes<HTMLDivElement> &
  ScrollAreaProps & {
    cuisine: string;
    ingredients: string[];
    category: string;
  };

export function RecipeTags({
  cuisine,
  ingredients,
  category,
  className,
  ...props
}: RecipeTagsProps) {
  return (
    <ScrollArea
      className={cn("w-full whitespace-nowrap mb-2", className)}
      {...props}
    >
      <div className="flex w-max space-x-2 p-2">
        <Badge className="text-base bg-emerald-900 text-white py-1 rounded-full drop-shadow-md">
          {cuisine}
        </Badge>
        <Badge className="text-base bg-emerald-700 text-white py-1 rounded-full drop-shadow-md">
          {category}
        </Badge>
        {ingredients.map((ingredient) => (
          <Badge
            className="text-base bg-emerald-500 text-white py-1 rounded-full drop-shadow-md"
            key={ingredient}
          >
            {ingredient}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
