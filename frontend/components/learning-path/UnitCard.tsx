import { UnitCardProps } from "./types";

export default function UnitCard({
  unit,
  title,
  description,
  icon,
  color,
  shadow,
  muted = false,
}: UnitCardProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl p-8 text-white shadow-[0_6px_0_0_var(--shadow)] ${color} ${
        muted ? "opacity-60" : ""
      }`}
      style={{
        ["--shadow" as string]: shadow,
      }}
    >
      <div className="relative z-10 flex items-center justify-between gap-6">
        <div>
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.25em] opacity-80">
            {unit}
          </span>
          <h2 className="text-3xl font-black">{title}</h2>
          <p className="mt-2 text-sm opacity-90">{description}</p>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
          {icon}
        </div>
      </div>

      {muted && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
      )}
    </div>
  );
}
