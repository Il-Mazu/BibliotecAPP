export default function BookCover({ title, author, color, size = "full" }) {
  if (size === "small") {
    return (
      <div
        style={{
          width: 60,
          height: 84,
          background: color,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: "white" }}>
          menu_book
        </span>
      </div>
    );
  }

  const w = 160;
  const h = 220;
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");
  const gradId = `g-${title.length}-${w}`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display: "block", borderRadius: 6, flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${gradId})`} rx="4" />
      <rect
        x="8"
        y="8"
        width={w - 16}
        height={h - 16}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        rx="2"
      />
      <rect x="8" y={h - 36} width={w - 16} height="1" fill="rgba(255,255,255,0.25)" />
      <text
        x={w / 2}
        y={h / 2 - 14}
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="600"
        fontFamily="Georgia, serif"
      >
        {line1}
      </text>
      <text
        x={w / 2}
        y={h / 2 + 4}
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="600"
        fontFamily="Georgia, serif"
      >
        {line2}
      </text>
      <text
        x={w / 2}
        y={h - 18}
        textAnchor="middle"
        fill="rgba(255,255,255,0.75)"
        fontSize="9"
        fontFamily="Georgia, serif"
      >
        {author}
      </text>
    </svg>
  );
}
