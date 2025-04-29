import { SyntheticEvent, useState } from "react";

interface LazyImageProps {
  src: string;
  alt?: string;
}

const LazyImage = ({ src, alt }: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.naturalWidth === 0) {
      setIsFailed(true);
      setIsLoading(false);
    }
  };

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.complete) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {isFailed && <span>Error on loading image.</span>}
      {!isFailed && (
        <img
          onError={handleError}
          onLoad={handleLoad}
          src={src}
          alt={alt ?? ""}
          style={{ display: isLoading ? "none" : "block" }}
        />
      )}
    </div>
  );
};

export default LazyImage;
