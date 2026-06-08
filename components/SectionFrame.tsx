import React from "react";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function SectionFrame({ id, className = "", children }: Readonly<Props>) {
  return (
    <section id={id} className={`theme-surface relative overflow-hidden border-t border-white/5 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {children}
      </div>
    </section>
  );
}
