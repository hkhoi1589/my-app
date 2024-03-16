export default function BG({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 blur-xl h-[580px] ${className}`}
      style={{
        background:
          "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      }}
    ></div>
  );
}
