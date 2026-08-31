import Link from "next/link";
import { siteConfig } from "@/content/site";

export function ActiveFooter() {
  return (
    <footer className="bg-[#3aa8a6] text-white">
      <div className="active-container flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-extrabold uppercase tracking-[0.12em]">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/programs" className="hover:underline">
            Programs
          </Link>
          <Link href="/how-it-works" className="hover:underline">
            How It Works
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        <div className="text-center sm:text-right">
          <p className="active-display text-xl text-white">{siteConfig.name}</p>
          <p className="mt-0.5 text-xs font-bold tracking-wide text-white/80">Kids Move Lab</p>
          <Link href={siteConfig.cta.primaryHref} className="active-btn mt-4 inline-flex">
            {siteConfig.cta.primary}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="active-container flex flex-col gap-2 py-4 text-[11px] text-white/70 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.productName}
          </p>
          <p>{siteConfig.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
