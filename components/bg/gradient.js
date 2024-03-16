export default function BG({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        background:
          "linear-gradient(268.24deg, rgba(59, 130, 246, 0.76) 50%, rgba(59, 130, 246, 0.545528) 80.61%, rgba(55, 48, 163, 0) 117.35%)",
      }}
    ></div>
  );
}
