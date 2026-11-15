import { Fragment, type CSSProperties } from "react";

// Pieces only some looks show. Each one is hidden unless its look is on, so
// the plain site is unchanged without them.

/**
 * SVG filters the looks borrow. The boil filters push every edge around with
 * noise; three seeds, swapped in turn, make the jitter of a redrawn line.
 * Scissors roughens an edge once and leaves it, like a hand cut.
 */
export function LookFilters() {
  return (
    <svg className="look-defs" aria-hidden="true" focusable="false">
      <defs>
        {[1, 2, 3].map((seed) => (
          <Fragment key={seed}>
            <filter id={`boil-${seed}`} colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves={2} seed={seed} />
              <feDisplacementMap in="SourceGraphic" scale={3} xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id={`boil-big-${seed}`} colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves={2} seed={seed + 10} />
              <feDisplacementMap in="SourceGraphic" scale={9} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </Fragment>
        ))}
        <filter id="scissors" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves={1} seed={4} />
          <feDisplacementMap in="SourceGraphic" scale={4} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * The site name with each letter in its own box, for looks that move or cut
 * them one by one. --n is the letter's place in the name, for staggering and
 * tilting; data-c counts through six, for looks that color letters in turn.
 */
export function Lettered({ text }: { text: string }) {
  const words = text.split(" ");
  const starts = words.map((_, i) => words.slice(0, i).join("").length);
  return (
    <span className="letters" aria-hidden="true">
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="word">
            {Array.from(word).map((ch, j) => (
              <span
                key={j}
                className="l"
                data-c={(starts[i] + j) % 6}
                style={{ "--n": starts[i] + j } as CSSProperties}
              >
                {ch}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/**
 * An animation peg bar: the strip at the top of a light table that holds each
 * drawing in register. Acme pattern: a round peg between two flat ones.
 */
export function PegBar() {
  return (
    <svg className="look-part pegbar" viewBox="0 0 320 30" aria-hidden="true" focusable="false">
      <rect className="bar" x="0" y="0" width="320" height="15" />
      <rect className="bar-edge" x="0" y="13" width="320" height="2" />
      <circle className="peg" cx="160" cy="22" r="5.5" />
      <rect className="peg" x="54" y="18" width="38" height="8" rx="4" />
      <rect className="peg" x="228" y="18" width="38" height="8" rx="4" />
    </svg>
  );
}

type Pose = { x: number; y: number; rx: number; ry: number };

const R = 4;
const GROUND = 42;

// The first exercise anyone animates: a ball bouncing to a stop. Drawn on twos,
// so each pose is held for two frames at 24 a second. Falling, the spacing
// opens up; rising, it closes, and the ball squashes where it lands.
function bounce(): Pose[] {
  const arcs = [
    { from: 8, apex: 8, to: 54, fall: 5 },
    { from: 54, apex: 18, to: 100, rise: 4, fall: 4 },
    { from: 100, apex: 28, to: 132, rise: 3, fall: 3 },
    { from: 132, apex: 35, to: 150, rise: 2, fall: 2 },
  ];
  const land = GROUND - R;
  const poses: Pose[] = [{ x: 8, y: 8, rx: R, ry: R }];
  for (const arc of arcs) {
    const mid = arc.rise ? (arc.from + arc.to) / 2 : arc.from;
    if (arc.rise) {
      for (let i = 1; i <= arc.rise; i++) {
        const t = i / arc.rise;
        const stretch = i === 1 ? 1.15 : 1;
        poses.push({ x: arc.from + (mid - arc.from) * t, y: land - (land - arc.apex) * (1 - (1 - t) ** 2), rx: R / stretch, ry: R * stretch });
      }
    }
    for (let i = 1; i <= arc.fall; i++) {
      const t = i / arc.fall;
      poses.push({ x: mid + (arc.to - mid) * t, y: arc.apex + (land - arc.apex) * t * t, rx: R, ry: R });
    }
    const squash = arc.apex < 20 ? 0.65 : 0.8;
    poses.push({ x: arc.to, y: GROUND - R * squash, rx: R / squash, ry: R * squash });
  }
  poses.push({ x: 153, y: land, rx: R, ry: R }, { x: 155, y: land, rx: R, ry: R });
  return poses;
}

const POSES = bounce();
const HOLD = 6;
const round = (n: number) => Math.round(n * 10) / 10;

/** A pencil test of the bouncing ball, with every drawing showing through as on a light table. */
export function PencilTest() {
  const frames = [...POSES, ...Array(HOLD).fill(POSES[POSES.length - 1])] as Pose[];
  const values = (k: keyof Pose) => frames.map((p) => round(p[k])).join(";");
  const dur = `${(frames.length / 12).toFixed(3)}s`;
  return (
    <svg className="look-part pencil-test" viewBox="0 0 160 48" aria-hidden="true" focusable="false">
      <line className="ground" x1="0" y1={GROUND} x2="160" y2={GROUND} />
      {POSES.map((p, i) => (
        <ellipse key={i} className="drawing" cx={round(p.x)} cy={round(p.y)} rx={round(p.rx)} ry={round(p.ry)} />
      ))}
      <ellipse className="live" cx={POSES[0].x} cy={POSES[0].y} rx={R} ry={R}>
        {(["cx", "cy", "rx", "ry"] as const).map((attr, i) => (
          <animate
            key={attr}
            attributeName={attr}
            values={values((["x", "y", "rx", "ry"] as const)[i])}
            dur={dur}
            calcMode="discrete"
            repeatCount="indefinite"
          />
        ))}
      </ellipse>
    </svg>
  );
}
