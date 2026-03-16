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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sparkles, Globe, ChefHat, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";

export const MoodEnum = z.enum(
  ["Happy", "Tired", "Adventurous", "Stressed", "Focused"],
  {
    errorMap: () => ({
      message: "Choose your Mood to suggest more suited recipes",
    }),
  }
);
const [firstCuisine, ...restCuisine] = cuisine;
export const CuisineEnum = z.enum([firstCuisine, ...restCuisine], {
  errorMap: () => ({
    message: "Choose your Cuisine to suggest more suited recipes",
  }),
});
const [firstCategory, ...restCategories] = categories;
export const DietaryPreferencesEnum = z.enum(
  [firstCategory, ...restCategories],
  {
    errorMap: () => ({
      message: "Choose your Dietary Preferences to suggest more suited recipes",
    }),
  }
);

const FormSchema = z.object({
  mood: MoodEnum,
  cuisine: CuisineEnum,
  dietaryPreference: DietaryPreferencesEnum,
});

export function RecipeForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | undefined>(undefined);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mood: undefined,
      dietaryPreference: undefined,
      cuisine: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    const { mood, cuisine, dietaryPreference } = data;
    setTimeout(() => {
      router.push(
        `/recipes?mood=${mood}&cuisine=${cuisine}&diet=${dietaryPreference}`
      );
    }, 300);
  }

  const handleMoodChange = (value: string) => {
    setSelectedMood(value);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 600);
  };

  const formProgress = [
    form.watch("mood") ? 1 : 0,
    form.watch("cuisine") ? 1 : 0,
    form.watch("dietaryPreference") ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const moodEmojis: Record<string, string> = {
    "Happy": "😊",
    "Tired": "😴",
    "Adventurous": "🔥",
    "Stressed": "😤",
    "Focused": "🎯",
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
        {...props}
      >
        <div className="space-y-6">
          {/* Mood Field */}
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="flex items-center gap-2 mb-2 ml-1">
                  <Sparkles size={14} className="text-orange-400" />
                  <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                    Current Vibe
                  </FormLabel>
                </div>
                <Select 
                  onValueChange={(val) => {
                    field.onChange(val);
                    handleMoodChange(val);
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger 
                      className={cn(
                        "h-14 bg-slate-950/40 border-white/10 rounded-2xl focus:ring-orange-500/40 focus:border-orange-500/40 backdrop-blur-md text-white transition-all",
                        selectedMood && "border-orange-400/50 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                      )}
                    >
                      <SelectValue placeholder="How are you feeling?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    {MoodEnum.options.map((item) => (
                      <SelectItem value={item} key={item} className="focus:bg-orange-500 focus:text-white">
                        <span className="flex items-center gap-2">
                          <span>{moodEmojis[item]}</span>
                          {item}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showCelebration && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                    <div className="animate-mood-celebrate text-2xl">✨</div>
                  </div>
                )}
                <FormMessage className="text-rose-400 text-xs mt-1" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cuisine Field */}
            <FormField
              control={form.control}
              name="cuisine"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 mb-2 ml-1">
                    <Globe size={14} className="text-orange-400" />
                    <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                      Cuisine
                    </FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        className={cn(
                          "h-12 bg-slate-950/40 border-white/10 rounded-xl focus:ring-orange-500/40 backdrop-blur-md text-white transition-all",
                          field.value && "border-orange-400/30 bg-orange-500/5"
                        )}
                      >
                        <SelectValue placeholder="Preferred" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      {CuisineEnum.options.map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-rose-400 text-xs" />
                </FormItem>
              )}
            />

            {/* Dietary Field */}
            <FormField
              control={form.control}
              name="dietaryPreference"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 mb-2 ml-1">
                    <ChefHat size={14} className="text-blue-400" />
                    <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                      Diet
                    </FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        className={cn(
                          "h-12 bg-slate-950/40 border-white/10 rounded-xl focus:ring-orange-500/40 backdrop-blur-md text-white transition-all",
                          field.value && "border-orange-400/30 bg-orange-500/5"
                        )}
                      >
                        <SelectValue placeholder="Preferences" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      {DietaryPreferencesEnum.options.map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-rose-400 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Progress Indicator */}
        {formProgress > 0 && (
          <div className="animate-slide-up-fade">
            <div className="flex gap-1 mb-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-300",
                    i < formProgress ? "bg-orange-400" : "bg-slate-700"
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-primary-foreground text-center">
              {formProgress === 3 ? "✨ All set! Ready to discover?" : `${formProgress === 1 ? "Great start!" : formProgress === 2 ? "Almost there!" : "Tell us more..."}`}
            </p>
          </div>
        )}

        <Button
          className={cn(
            "w-full h-14 mt-4 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(249,115,22,0.3)] transition-all hover:shadow-[0_10px_40px_rgba(249,115,22,0.5)] active:scale-[0.98] group",
            isSubmitting && "scale-95 opacity-75"
          )}
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          <span className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Zap size={20} className="animate-pulse" />
                Finding recipes...
              </>
            ) : (
              <>
                Search Recipes
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </>
            )}
          </span>
        </Button>

        <p className="text-center text-[11px] text-slate-500 italic">
          {formProgress === 3 ? "🎉 Time to get cooking!" : "Matching your mood to the perfect plate..."}
        </p>
      </form>
    </Form>
  );
}