"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { categories, cuisine } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const MoodEnum = z.enum(
  ["Happy", "Tired", "Adventurous", "Stressed", "Focused"],
  {
    errorMap: () => ({
      message: "Choose your Mood to suggest more suited recipes",
    }),
  }
);
type MoodEnum = z.infer<typeof MoodEnum>;
const [firstCuisine, ...restCuisine] = cuisine;
export const CuisineEnum = z.enum([firstCuisine, ...restCuisine], {
  errorMap: () => ({
    message: "Choose your Cuisine to suggest more suited recipes",
  }),
});
type CuisineEnum = z.infer<typeof CuisineEnum>;
const [firstCategory, ...restCategories] = categories;
export const DietaryPreferencesEnum = z.enum(
  [firstCategory, ...restCategories],
  {
    errorMap: () => ({
      message: "Choose your Dietary Preferences to suggest more suited recipes",
    }),
  }
);
type DietaryPreferencesEnum = z.infer<typeof DietaryPreferencesEnum>;

const FormSchema = z.object({
  mood: MoodEnum,
  cuisine: CuisineEnum,
  dietaryPreference: DietaryPreferencesEnum,
});

export function RecipeForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mood: undefined,
      dietaryPreference: undefined,
      cuisine: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { mood, cuisine, dietaryPreference } = data;
    navigate(
      `/recipes?mood=${mood}&cuisine=${cuisine}&diet=${dietaryPreference}`
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6", className)}
          {...props}
        >
          <div className="flex flex-row items-center justify-between space-x-4">
            <span className="text-5xl">😋</span>
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Mood</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your mood" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MoodEnum.options.map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Feeling adventurous? Try something exotic like sushi!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row items-center justify-between space-x-4">
            <FormField
              control={form.control}
              name="cuisine"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Cuisine</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Preferred cuisine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CuisineEnum.options.map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Eg., Italian: Pizza, pasta, tiramisu
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-5xl">🥘</span>
          </div>

          <div className="flex flex-row items-center justify-between space-x-4">
            <span className="text-5xl">🍱</span>
            <FormField
              control={form.control}
              name="dietaryPreference"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Dietary Preferences</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Preferred Dietary Preferences" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DietaryPreferencesEnum.options.map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Eg., Vegetarian: No meat, but eggs are fine
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full mt-8 text-lg font-semibold"
            size="lg"
            type="submit"
          >
            Search recipes
          </Button>
        </form>
      </Form>
    </>
  );
}
