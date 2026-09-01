/**
 * Authoritative site content derived from the ZZZKids e-Catalogue.
 * Do not invent facts, stats, testimonials, or school names.
 */

export const siteConfig = {
  name: "ZZZKidz",
  productName: "Triple Z Kids Move Lab",
  tagline: "School Fitness & Movement Solutions",
  slogan: "Stronger Bodies. Sharper Minds. Brighter Futures.",
  missionLine: "Building a Fit India — One School at a Time",
  description:
    "Triple Z Kids Move Lab is a complete school fitness and movement solution designed to build stronger bodies, sharper minds and brighter futures.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.triplezkidsmovelab.com",
  logo: "/images/brand/zzzkidz-logo.jpg",
  contact: {
    email: "connect@triplezkidsmovelab.com",
    /** Catalogue listed a placeholder number — replace with real phone before production. */
    phone: null as string | null,
    phonePlaceholder: "[PHONE TO BE CONFIRMED]",
  },
  cta: {
    primary: "Partner With Us",
    primaryHref: "/contact",
    secondary: "Explore the Move Lab",
    secondaryHref: "/programs",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/benefits", label: "Benefits" },
  { href: "/why-us", label: "Why Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroContent = {
  eyebrow: "School Fitness & Movement Solutions",
  headline: "Building a Fit India",
  headlineAccent: "One School at a Time",
  supporting:
    "We build in-school Fitness Labs, deliver engaging programs and trained coaches to help every child move better, get stronger and grow with confidence.",
  callout: "Active Kids. Healthy Kids. Happy Kids.",
  pillars: [
    { title: "Safe Structured Environment", description: "Age-appropriate programs with expert supervision." },
    { title: "Expert Trainers & Support", description: "Professional. Certified. Trusted." },
    { title: "Result Driven Programs", description: "Structured sessions with measurable progress." },
    { title: "For Every Age Group", description: "Designed for available school space and age groups." },
  ],
} as const;

export const challengeItems = [
  {
    title: "Excessive Screen Time",
    description: "Leads to a sedentary lifestyle and weak physical activity.",
  },
  {
    title: "Poor Posture & Flexibility",
    description: "Long study hours and device use affect posture and body alignment.",
  },
  {
    title: "Low Strength & Stamina",
    description: "Limited outdoor play results in low strength and endurance.",
  },
  {
    title: "Stress & Lack of Concentration",
    description: "Inactivity contributes to stress and reduced focus in the classroom.",
  },
  {
    title: "Reduced Social Interaction",
    description: "Less movement means fewer friendships and team experiences.",
  },
] as const;

export const foundationOutcomes = [
  { title: "Stronger Bodies", description: "Build strength, endurance and healthy habits." },
  { title: "Sharper Minds", description: "Better focus, concentration and confidence." },
  { title: "Better Confidence", description: "Positive self-image and courage to take on challenges." },
  { title: "Stronger Relationships", description: "Teamwork, respect and stronger social connections." },
  { title: "Brighter Futures", description: "Healthy habits today, success and happiness tomorrow." },
] as const;

export const solutionPillars = [
  {
    title: "In-School Fitness Lab Setup",
    description:
      "We design and build state-of-the-art fitness labs with safe, age-appropriate equipment.",
  },
  {
    title: "Expert Coaches",
    description: "Trained, certified and passionate coaches who connect and inspire kids.",
  },
  {
    title: "Scientific Programs",
    description: "Age-specific, progressive and fun movement curriculum.",
  },
  {
    title: "Assessment & Progress Tracking",
    description: "Regular assessments to track improvement and celebrate growth.",
  },
  {
    title: "Parent & School Engagement",
    description: "Strong communication, reports and events to build a fitness community.",
  },
] as const;

export const activities = [
  { title: "Calisthenics", description: "Build strength using bodyweight movements." },
  { title: "Functional Training", description: "Improve everyday movement, strength and endurance." },
  { title: "Gymnastics Rings", description: "Develop upper body strength, control and stability." },
  { title: "Trampoline Training", description: "Enhance coordination, balance and body control." },
  { title: "Pilates", description: "Improve posture, flexibility, core strength and focus." },
  { title: "Hammock Fitness", description: "Build flexibility, mobility and core stability." },
  { title: "Agility & Speed", description: "Increase speed, agility, quickness and reaction." },
  { title: "Mobility & Flexibility", description: "Improve range of motion and prevent injuries." },
  { title: "Fun Games & Team Activities", description: "Build teamwork, leadership and social skills." },
  { title: "Mindfulness & Stretching", description: "Breathing, relaxation and focus for a calm and strong mind." },
] as const;

export const keyActivities = [
  "Calisthenics",
  "Gymnastics",
  "Hammock",
  "Roman Rings",
  "Trampoline",
  "Pilates",
  "Bungee Workout",
  "Functional Training",
] as const;

export const movementLiteracy = [
  { title: "Strength", description: "Builds power, endurance and a strong foundation." },
  { title: "Balance", description: "Improves stability, control and body awareness." },
  { title: "Mobility", description: "Enhances movement quality and joint function." },
  { title: "Flexibility", description: "Increases range of motion and helps prevent injury." },
  { title: "Agility", description: "Develops speed, coordination and quick reactions." },
] as const;

export const peComparison = {
  traditional: {
    title: "Traditional P.E.",
    points: [
      { title: "Limited Activities", description: "The same games and drills, repeated every week." },
      { title: "Low Engagement", description: "Children lose interest when sessions feel predictable." },
      { title: "No Skill Progression", description: "No clear path to build skill, strength or coordination." },
      { title: "No Lasting Impact", description: "Doesn't build lasting fitness or confidence." },
    ],
  },
  moveLab: {
    title: "With Triple Z Kids Move Lab",
    points: [
      { title: "Structured Programs", description: "Scientifically designed movement curriculum." },
      { title: "Skill Development", description: "Builds strength, balance, coordination and agility." },
      { title: "High Engagement", description: "Fun, challenging and result-driven sessions." },
      { title: "Lifelong Impact", description: "Stronger bodies, sharp minds, confident kids." },
    ],
  },
} as const;

export const zones = [
  {
    title: "Calisthenics Zone",
    description: "Pull-up bars, parallel bars, dip bars and core stations.",
  },
  {
    title: "Gymnastics & Roman Rings",
    description: "Roman rings for hanging strength, body control and grip stability.",
  },
  {
    title: "Hammock / Aerial Zone",
    description: "Aerial hammocks for flexibility and core strength.",
  },
  {
    title: "Trampoline",
    description: "Rebound training for cardio fitness and coordination.",
  },
  {
    title: "Pilates & Mobility",
    description: "Pilates reformers for posture correction and injury prevention.",
  },
  {
    title: "Functional / Bodyweight Training",
    description: "Battle ropes, medicine balls and plyometric boxes.",
  },
  {
    title: "Balance & Agility Equipment",
    description: "Balance beams, agility ladders, cones and hurdles.",
  },
] as const;

export const processSteps = [
  {
    title: "Site Assessment & Consultation",
    points: [
      "We study your available space, student strength, needs and goals.",
      "Customized plan for maximum impact.",
    ],
  },
  {
    title: "Customized Lab Design & Planning",
    points: [
      "3D layout and zone planning as per age groups.",
      "Best utilization of available space.",
    ],
  },
  {
    title: "Premium Equipment & Installation",
    points: [
      "International standard equipment for safety and performance.",
      "Professional installation by expert team.",
    ],
  },
  {
    title: "Safety Setup & Flooring",
    points: [
      "High-quality flooring, padding and safety compliances.",
      "Safe environment, always.",
    ],
  },
  {
    title: "Trainers / PTI Training & Deployment Support",
    points: [
      "We provide certified coaches or train your existing PTI.",
      "Ongoing guidance and support.",
    ],
  },
  {
    title: "Curriculum & Program Delivery",
    points: [
      "Age-wise movement curriculum.",
      "Structured sessions, progressive learning.",
    ],
  },
  {
    title: "Assessment & Progress Tracking",
    points: [
      "Regular fitness assessment and skill tracking.",
      "Reports for school and parents.",
    ],
  },
  {
    title: "Maintenance & After-Sales Support",
    points: ["Regular equipment check-ups.", "Quick support and maintenance."],
  },
] as const;

export const approachPillars = [
  { title: "Student Centric", description: "Every plan focused on student growth." },
  { title: "Safe & Scientific", description: "Safety, age-appropriate and evidence-based programs." },
  { title: "Easy for Schools", description: "We handle everything, you focus on education." },
  { title: "Measurable Impact", description: "Visible progress, better outcomes." },
  { title: "Long Term Partnership", description: "We grow together, year after year." },
] as const;

export const studentBenefits = [
  {
    title: "Stronger & Healthier Body",
    description: "Improved strength, stamina, flexibility, posture and overall fitness.",
  },
  {
    title: "Better Focus & Academic Performance",
    description: "Regular physical activity boosts concentration, memory and classroom performance.",
  },
  {
    title: "Confidence & Self-Esteem",
    description: "Achieving movement milestones builds self-belief and a positive body image.",
  },
  {
    title: "Discipline & Team Spirit",
    description: "Learn consistency, respect, teamwork and leadership through group activities.",
  },
  {
    title: "Stress Relief & Emotional Well-Being",
    description: "Helps manage stress, anxiety and builds emotional balance.",
  },
] as const;

export const schoolBenefits = [
  {
    title: "Stronger School Brand & Differentiation",
    description: "A modern fitness program that sets your school apart.",
  },
  {
    title: "Greater Parent Satisfaction & Trust",
    description: "Holistic development increases parent confidence in your school.",
  },
  {
    title: "Higher Student Engagement & Retention",
    description: "Healthy, active students are happier, more engaged and more regular.",
  },
  {
    title: "Value-Added Infrastructure",
    description: "A world-class Move Lab enhances campus value and future readiness.",
  },
  {
    title: "Stronger Admission Advantage",
    description: "Promote a future-ready, health-focused school that parents prefer.",
  },
] as const;

export const overallOutcomes = [
  "Healthy Bodies",
  "Sharp Minds",
  "Confident Individuals",
  "Stronger Communities",
  "A Fitter, Stronger India",
] as const;

export const whyUsPillars = [
  {
    title: "Expertise You Can Trust",
    description:
      "Triple Z brings years of experience in fitness, movement and training — now dedicated to schools.",
  },
  {
    title: "Age-Wise & Scientific Programs",
    description: "Curriculum designed specifically for different age groups and fitness levels.",
  },
  {
    title: "Safety First, Always",
    description: "International safety standards, certified equipment and trained professionals.",
  },
  {
    title: "Trained Coaches & PTI Training",
    description:
      "Professional coaches to deliver sessions, or we train your school's PTI and staff.",
  },
  {
    title: "Complete Support From Start to Success",
    description: "We manage everything — design, setup, training, operation, tracking and support.",
  },
  {
    title: "Adds Real Value to Your School",
    description:
      "Enhances school image, attracts parents and supports holistic development of every child.",
  },
] as const;

export const promises = [
  { title: "Safe Environment", description: "Every session. Every time." },
  { title: "Stronger Students", description: "Physically, mentally and emotionally." },
  { title: "Better Habits", description: "For today. For life." },
  { title: "Brighter Futures", description: "Active kids. Successful adults." },
] as const;

export const thankYouPillars = [
  {
    title: "Better Schools",
    description: "Enhance reputation with world-class fitness and movement centers.",
  },
  {
    title: "Happier Students",
    description: "Active kids are happier, more focused and ready to achieve their best.",
  },
  {
    title: "Stronger Results",
    description: "Improved health, better attendance and strong academic performance.",
  },
  {
    title: "Long Term Partnership",
    description: "Committed to the growth, success and well-being of every student.",
  },
  {
    title: "Positive Impact",
    description: "Building a fitter community today for a healthier and stronger nation tomorrow.",
  },
] as const;

export const trustPillars = [
  { title: "Safe & Scientific", description: "Age-appropriate, expert-supervised programs." },
  { title: "Trusted by Schools", description: "Built for schools, backed by results." },
  { title: "Holistic Development", description: "Body, mind, skills and values — all in one place." },
  { title: "Pan India Vision", description: "Building a fitter, stronger India one school at a time." },
] as const;

export const faqs = [
  {
    question: "What is Triple Z Kids Move Lab?",
    answer:
      "It is a complete movement and fitness solution for schools. We build in-school Fitness Labs, deliver engaging programs and trained coaches to help every child move better, get stronger and grow with confidence.",
  },
  {
    question: "What do you provide to schools?",
    answer:
      "An end-to-end solution covering site assessment, lab design, premium equipment and installation, safety setup, coach or PTI training, curriculum delivery, assessment and progress tracking, plus maintenance and after-sales support.",
  },
  {
    question: "Is the Move Lab designed for our available space?",
    answer:
      "Yes. Zones and equipment are designed according to available school space and age groups for best utilization and safety.",
  },
  {
    question: "Do you only supply equipment?",
    answer:
      "No. We take care of planning, setup, training, program delivery, tracking and ongoing support so schools can focus on education while seeing the difference.",
  },
] as const;
