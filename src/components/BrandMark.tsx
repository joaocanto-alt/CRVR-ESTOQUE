import Link from "next/link";
import { Leaf } from "lucide-react";

export function BrandMark({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="CRVR - início">
      <div className={`relative flex h-10 w-10 items-center justify-center rounded-[14px] ${light ? "bg-white/15 ring-1 ring-white/25" : "bg-brand shadow-soft"}`}>
        <Leaf size={22} className="text-white" strokeWidth={2.6}/>
        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-accent" />
      </div>
      {!compact && <div className="leading-none">
        <p className={`font-display text-xl font-black tracking-[-.05em] ${light ? "text-white" : "text-brand-dark"}`}>CRVR</p>
        <p className={`mt-1 text-[8px] font-bold uppercase tracking-[.13em] ${light ? "text-white/70" : "text-ink-muted"}`}>São Leopoldo</p>
      </div>}
    </Link>
  );
}
