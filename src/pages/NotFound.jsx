import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090a09] px-6 text-white">
      <div className="text-center">
        <p className="text-[9px] uppercase tracking-[0.34em] text-white/35">404 · Lost route</p>
        <h1 className="mt-5 font-serif text-6xl tracking-[-0.05em] text-[#f3efe6] md:text-8xl">Not this way.</h1>
        <Link to="/" className="mt-10 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-white/60 hover:text-white"><ArrowLeft size={14} /> Return home</Link>
      </div>
    </main>
  );
}
