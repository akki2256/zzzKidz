import { galleryImages } from "@/content/media";
import { activities, keyActivities, movementLiteracy, zones } from "@/content/site";
import type { SiteImage } from "@/lib/media";

/** Category chips — mapped from existing Move Lab activities (FITTR-style horizontal nav). */
export const programCategories = [
  "Calisthenics",
  "Gymnastics",
  "Pilates",
  "Trampoline",
  "Functional Training",
  "Hammock",
  "Mobility",
  "Agility",
  "Strength",
  "Team Activities",
] as const;

export type ProgramCategory = (typeof programCategories)[number];
export type ProgramType = "zone" | "activity" | "literacy";
export type ProgramFormat = "In-School Move Lab";

export type ProgramCatalogItem = {
  id: string;
  title: string;
  description: string;
  category: ProgramCategory;
  type: ProgramType;
  format: ProgramFormat;
  audience: string;
  goal: string;
  highlights: string[];
  image: SiteImage;
};

const categoryByTitle: Record<string, ProgramCategory> = {
  Calisthenics: "Calisthenics",
  "Functional Training": "Functional Training",
  "Gymnastics Rings": "Gymnastics",
  "Trampoline Training": "Trampoline",
  Pilates: "Pilates",
  "Hammock Fitness": "Hammock",
  "Agility & Speed": "Agility",
  "Mobility & Flexibility": "Mobility",
  "Fun Games & Team Activities": "Team Activities",
  "Mindfulness & Stretching": "Pilates",
  Strength: "Strength",
  Balance: "Agility",
  Mobility: "Mobility",
  Flexibility: "Mobility",
  Agility: "Agility",
};

function inferZoneCategory(title: string): ProgramCategory {
  const lower = title.toLowerCase();
  if (lower.includes("calisthenics")) return "Calisthenics";
  if (lower.includes("gymnastics") || lower.includes("rings")) return "Gymnastics";
  if (lower.includes("hammock")) return "Hammock";
  if (lower.includes("pilates")) return "Pilates";
  if (lower.includes("trampoline")) return "Trampoline";
  if (lower.includes("functional") || lower.includes("bodyweight")) return "Functional Training";
  if (lower.includes("balance") || lower.includes("agility")) return "Agility";
  if (lower.includes("mobility")) return "Mobility";
  return "Strength";
}

function buildCatalog(): ProgramCatalogItem[] {
  const items: ProgramCatalogItem[] = [];

  zones.forEach((zone, index) => {
    items.push({
      id: `zone-${index}`,
      title: zone.title,
      description: zone.description,
      category: inferZoneCategory(zone.title),
      type: "zone",
      format: "In-School Move Lab",
      audience: "School-age children",
      goal: "Structured zone-based movement training",
      highlights: ["Age-appropriate", "Expert supervised"],
      image: galleryImages[index + 2] ?? galleryImages[0],
    });
  });

  activities.forEach((activity, index) => {
    items.push({
      id: `activity-${index}`,
      title: activity.title,
      description: activity.description,
      category: categoryByTitle[activity.title] ?? "Functional Training",
      type: "activity",
      format: "In-School Move Lab",
      audience: "School-age children",
      goal: activity.description,
      highlights: ["Structured sessions", "Skill progression"],
      image: galleryImages[index + 20] ?? galleryImages[index % galleryImages.length],
    });
  });

  movementLiteracy.forEach((item, index) => {
    items.push({
      id: `literacy-${index}`,
      title: item.title,
      description: item.description,
      category: categoryByTitle[item.title] ?? "Strength",
      type: "literacy",
      format: "In-School Move Lab",
      audience: "School-age children",
      goal: item.description,
      highlights: ["Movement literacy", "Measurable progress"],
      image: galleryImages[index + 10] ?? galleryImages[0],
    });
  });

  return items;
}

export const programCatalog = buildCatalog();

export function getRelatedPrograms(
  current: ProgramCatalogItem,
  limit = 4,
): ProgramCatalogItem[] {
  return programCatalog
    .filter(
      (item) =>
        item.id !== current.id &&
        (item.category === current.category || item.type === current.type),
    )
    .slice(0, limit);
}

export function filterPrograms(options: {
  query?: string;
  category?: ProgramCategory | "all";
  type?: ProgramType | "all";
  goal?: string | "all";
}): ProgramCatalogItem[] {
  const query = options.query?.trim().toLowerCase() ?? "";

  return programCatalog.filter((item) => {
    if (options.category && options.category !== "all" && item.category !== options.category) {
      return false;
    }
    if (options.type && options.type !== "all" && item.type !== options.type) {
      return false;
    }
    if (options.goal && options.goal !== "all" && item.goal !== options.goal) {
      return false;
    }
    if (!query) return true;

    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.goal.toLowerCase().includes(query)
    );
  });
}

export const coachCapabilityCards = [
  {
    id: "expert-coaches",
    title: "Expert Coaches",
    description:
      "Trained, certified and passionate coaches who connect and inspire kids.",
    specialty: "Program Delivery",
    badge: "Coaches",
    image: galleryImages[5],
  },
  {
    id: "pti-training",
    title: "PTI Training & Deployment",
    description:
      "We provide certified coaches or train your existing PTI with ongoing guidance and support.",
    specialty: "School Staff Enablement",
    badge: "PTI Support",
    image: galleryImages[6],
  },
  {
    id: "safety-first",
    title: "Safety First, Always",
    description:
      "International safety standards, certified equipment and trained professionals.",
    specialty: "Supervision & Safety",
    badge: "Safety",
    image: galleryImages[7],
  },
  {
    id: "scientific-programs",
    title: "Scientific Programs",
    description: "Age-specific, progressive and fun movement curriculum.",
    specialty: "Curriculum Design",
    badge: "Curriculum",
    image: galleryImages[8],
  },
] as const;

export const relatedCategoryCards = [
  {
    title: "Activity Zones",
    description: "Safe, engaging zones designed for available school space and age groups.",
    href: "/programs",
    image: galleryImages[2],
  },
  {
    title: "How It Works",
    description: "From site assessment to progress tracking — an end-to-end school solution.",
    href: "/how-it-works",
    image: galleryImages[4],
  },
  {
    title: "Benefits for Schools",
    description: "Stronger brand, happier students and a future-ready fitness advantage.",
    href: "/benefits",
    image: galleryImages[8],
  },
] as const;

/** Social proof from existing promises — not fabricated testimonials. */
export const socialProofItems = [
  { id: "safe", quote: "Every session. Every time.", context: "Safe Environment" },
  { id: "stronger", quote: "Physically, mentally and emotionally.", context: "Stronger Students" },
  { id: "habits", quote: "For today. For life.", context: "Better Habits" },
  { id: "futures", quote: "Active kids. Successful adults.", context: "Brighter Futures" },
] as const;

export const premiumHowItWorksSteps = [
  {
    step: "01",
    title: "Discover",
    description: "Site assessment and consultation tailored to your school space and goals.",
  },
  {
    step: "02",
    title: "Choose",
    description: "Customized lab design, zones and programs matched to age groups.",
  },
  {
    step: "03",
    title: "Start",
    description: "Equipment installation, safety setup and coach or PTI deployment.",
  },
  {
    step: "04",
    title: "Track",
    description: "Curriculum delivery with assessment and progress tracking.",
  },
] as const;

export const premiumTrustMetrics = [
  { label: "Move Lab Zones", value: `${zones.length}+` },
  { label: "Activities Offered", value: `${activities.length}+` },
  { label: "Movement Skills", value: String(movementLiteracy.length) },
] as const;

export const premiumHeroBullets = [
  "Safe, age-appropriate programs with expert supervision",
  "Structured scientific curriculum for every age group",
  "Trained coaches and complete school support",
] as const;

/** Key activity names for category strip labels (existing content only). */
export { keyActivities };
