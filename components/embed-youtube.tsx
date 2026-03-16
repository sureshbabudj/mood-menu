import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface EmbedYouTubeProps {
  videoUrl: string;
  title?: string;
}

const EmbedYouTube = ({
  videoUrl,
  title = "Embedded youtube",
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & EmbedYouTubeProps) => {
  const videoId = videoUrl.split("v=")[1];

  if (!videoId) {
    return null;
  }

  // YouTube embed URL with parameters to disable ads and related videos
  // rel=0 - disables related videos at the end
  // modestbranding=1 - minimal YouTube branding
  // fs=1 - allow fullscreen
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&fs=1`;

  return (
    <div className="w-full max-w-4xl mx-auto h-auto">
      <AspectRatio ratio={16 / 9}>
        <iframe
          className="w-full h-full rounded-lg"
          src={embedUrl}
          title={title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </AspectRatio>
    </div>
  );
};

export default EmbedYouTube;
