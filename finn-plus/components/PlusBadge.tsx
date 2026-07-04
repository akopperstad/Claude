export default function PlusBadge({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const cls =
    size === "sm"
      ? "px-1.5 py-0.5 text-[10px]"
      : size === "lg"
        ? "px-3 py-1 text-lg"
        : "px-2 py-0.5 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-md bg-finn-plus font-bold text-white ${cls}`}
    >
      FINN<span className="font-black">+</span>
    </span>
  );
}
