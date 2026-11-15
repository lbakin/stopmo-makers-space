import type { Photo as PhotoType } from "@/lib/types";
import { smartQuotes } from "@/lib/text";

const WIDTHS = [480, 800, 1200, 1600];

function sized(url: string, width: number) {
  return `${url}?w=${width}&fit=max&auto=format`;
}

/** A photo from Sanity, or a crossed box saying which photo goes here. */
export function Photo({ photo, missing }: { photo?: PhotoType; missing?: string }) {
  if (!photo) {
    if (!missing) return null;
    return (
      <figure className="photo">
        <svg className="photo-missing" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="0" x2="300" y2="200" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          <line x1="300" y1="0" x2="0" y2="200" stroke="currentColor" vectorEffect="non-scaling-stroke" />
        </svg>
        <figcaption>{missing}</figcaption>
      </figure>
    );
  }
  const widths = WIDTHS.filter((w) => w < photo.width).concat(photo.width);
  return (
    <figure className="photo">
      <img
        src={sized(photo.url, Math.min(800, photo.width))}
        srcSet={widths.map((w) => `${sized(photo.url, w)} ${w}w`).join(", ")}
        sizes="(min-width: 40em) 36rem, calc(100vw - 2rem)"
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
      />
      {photo.caption && <figcaption>{smartQuotes(photo.caption)}</figcaption>}
    </figure>
  );
}
