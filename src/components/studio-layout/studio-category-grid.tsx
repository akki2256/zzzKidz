import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/content/media";
import { activities } from "@/content/site";

/** Dense square-edged tile grid of every activity, image-led with a label overlay. */
export function StudioCategoryGrid() {
  return (
    <section className="bg-black pb-16 sm:pb-20">
      <div className="studio-container">
        <h2 className="studio-display max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] text-white">
          Every way to move
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">
          A full movement curriculum — strength, balance, mobility, flexibility and agility,
          delivered through activities kids actually want to do.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {activities.map((activity, index) => {
            const image = galleryImages[(index * 3 + 5) % galleryImages.length];
            return (
              <li key={activity.title}>
                <Link
                  href="/programs"
                  className="group relative block aspect-[3/4] overflow-hidden bg-white/5"
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                    aria-hidden
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block text-xs font-extrabold uppercase leading-tight tracking-[0.08em] text-white transition-colors group-hover:text-[#c8ff00]">
                      {activity.title}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
