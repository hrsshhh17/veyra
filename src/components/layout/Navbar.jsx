import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  ["Explore", "/explore"],
  ["Journal", "/journal"],
  ["Plan a journey", "/explore?plan=1"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const home = location.pathname === "/";
  useEffect(() => setOpen(false), [location.pathname, location.search]);

  return <header className={`fixed inset-x-0 top-0 z-[100] text-white ${home ? "bg-gradient-to-b from-black/55 to-transparent" : "border-b border-white/10 bg-[#090a09]/90 backdrop-blur-xl"}`}>
    <div className="flex h-[72px] items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <Link to="/" className="relative z-10 font-serif text-[24px] leading-none tracking-[-.05em]">VEYRA</Link>
      <nav className="hidden items-center gap-9 md:flex">{links.map(([label,to]) => <Link key={label} to={to} className={`text-[8px] uppercase tracking-[.28em] transition-colors ${location.pathname === to.split("?")[0] ? "text-white" : "text-white/55 hover:text-white"}`}>{label}</Link>)}</nav>
      <button type="button" onClick={() => setOpen(v => !v)} className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden" aria-label="Toggle navigation">{open ? <X size={19}/> : <Menu size={19}/>}</button>
    </div>
    {open && <nav className="grid gap-1 border-t border-white/10 bg-[#090a09]/95 px-5 py-5 backdrop-blur-xl sm:px-8 md:hidden">{links.map(([label,to]) => <Link key={label} to={to} className="border-b border-white/10 py-4 text-[9px] uppercase tracking-[.28em] text-white/65 last:border-0">{label}</Link>)}</nav>}
  </header>;
}
