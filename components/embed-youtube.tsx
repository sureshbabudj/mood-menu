import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Play } from "lucide-react";

interface EmbedYouTubeProps {
  videoUrl: string;
  title?: string;
}

const EmbedYouTube = ({
  videoUrl,
  title = "Embedded youtube",
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & EmbedYouTubeProps) => {
  const videoId = videoUrl.split("v=")[1];
  const embedUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <>
      {!videoId ? (
        <></>
      ) : (
        <a
          className="w-full max-w-lg h-auto mx-auto block relative"
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AspectRatio ratio={4 / 3}>
            <img src={embedUrl} alt={title} title={title} width="100%" height="100%" />
          </AspectRatio>
          <div className="text-white absolute left-[calc(50%_-_37px)] top-[calc(50%_-_29px)] bg-destructive rounded-sm px-4 py-2">
            <Play width={42} height={42} />
          </div>
        </a>
      )}
    </>
  );
};

export default EmbedYouTube;
