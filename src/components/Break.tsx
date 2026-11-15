// A section break drawn as an animator's timing chart: two keys and the
// in-betweens found by halving, bunched toward each key for an ease in and out.
const KEYS = [0, 144];
const INBETWEENS = [9, 18, 36, 72, 108, 126, 135];

export function Break() {
  return (
    <svg className="break" viewBox="-1 0 146 20" aria-hidden="true" focusable="false">
      <line x1="0" y1="10" x2="144" y2="10" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {KEYS.map((x) => (
        <line key={x} className="key" x1={x} y1="2" x2={x} y2="18" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      {INBETWEENS.map((x) => (
        <line key={x} className="ib" x1={x} y1="6" x2={x} y2="14" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
