import { Fragment } from "react";
import { paragraphs } from "@/lib/text";

export function Prose({ text, className }: { text?: string; className?: string }) {
  const blocks = paragraphs(text);
  if (blocks.length === 0) return null;
  return (
    <div className={className ? `prose ${className}` : "prose"}>
      {blocks.map((lines, i) => (
        <p key={i}>
          {lines.map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
