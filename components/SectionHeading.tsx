import React from "react";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: Readonly<Props>) {
  const alignmentClass = align === "center" ? "text-center items-center" : "text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignmentClass}`}>
      <div className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.38em] text-[color:var(--page-muted)]">
        <span className="h-px w-8 bg-[color:var(--page-muted)]/50" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-[color:var(--page-fg)] md:text-[2.4rem] lg:text-[2.9rem]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--page-muted)] md:text-[0.98rem]">
          {description}
        </p>
      )}
    </div>
  );
}
