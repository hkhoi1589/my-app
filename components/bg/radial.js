export default function BG({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 max-w-md mx-auto h-72 blur-[118px] ${className}`}
      style={{
        background:
          "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
      }}
    ></div>
  );
}
