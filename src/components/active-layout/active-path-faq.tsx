import { ActiveAsterisk, ActiveStickFigure } from "@/components/active-layout/active-decor";
import {
  challengeItems,
  heroContent,
  processSteps,
  solutionPillars,
} from "@/content/site";

type PathBlock = {
  question: string;
  answer: string;
  side: "left" | "right";
};

const blocks: PathBlock[] = [
  {
    question: "What is Triple Z Kids Move Lab?",
    answer: heroContent.supporting,
    side: "left",
  },
  {
    question: "Why Move Lab?",
    answer: `${challengeItems[0].description} ${challengeItems[2].description} Regular movement builds stronger bodies, sharper minds and lasting confidence.`,
    side: "right",
  },
  {
    question: "Who delivers the program?",
    answer: `${solutionPillars[1].description} ${solutionPillars[2].description}`,
    side: "left",
  },
  {
    question: "What do schools get?",
    answer: `${solutionPillars[0].description} ${solutionPillars[3].description}`,
    side: "right",
  },
  {
    question: "What does partnership include?",
    answer: solutionPillars[4].description,
    side: "left",
  },
  {
    question: "How do we get started?",
    answer: processSteps[0].points.join(" "),
    side: "right",
  },
];

/**
 * Signature Active Kids winding-path FAQ on royal blue.
 * Desktop: SVG snake + asterisk characters. Mobile: stacked cards with color rails.
 */
export function ActivePathFaq() {
  return (
    <section className="overflow-hidden bg-[#5261ac] py-16 text-white sm:py-20">
      <div className="active-container">
        {/* Mobile / tablet */}
        <div className="space-y-8 lg:hidden">
          {blocks.map((block, i) => {
            const rail = ["#69c8c6", "#a2b6df", "#ec1f8f", "#f26038", "#b6d433", "#6c35b5"][i];
            const poses = ["run", "lunge", "leap", "crawl", "run", "lunge"] as const;
            return (
              <article key={block.question} className="relative pl-5">
                <span
                  aria-hidden
                  className="absolute bottom-1 left-0 top-1 w-2.5 rounded-full"
                  style={{ background: rail }}
                />
                <div className="mb-3 flex items-center gap-3">
                  {i % 2 === 0 ? (
                    <ActiveStickFigure pose={poses[i]} color={rail} size={56} />
                  ) : (
                    <ActiveAsterisk size={36} color={rail} />
                  )}
                </div>
                <h3 className="active-display text-lg text-white">{block.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{block.answer}</p>
              </article>
            );
          })}
        </div>

        {/* Desktop — winding path + icons */}
        <div className="relative mx-auto hidden min-h-[1180px] max-w-5xl lg:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 900 1180"
            fill="none"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M120 80 H620" stroke="#69c8c6" strokeWidth="72" strokeLinecap="round" />
            <path
              d="M620 80 V260 H280"
              stroke="#a2b6df"
              strokeWidth="72"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M280 260 V460 H640"
              stroke="#ec1f8f"
              strokeWidth="72"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M640 460 V660 H260"
              stroke="#f26038"
              strokeWidth="72"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M260 660 V860 H620"
              stroke="#b6d433"
              strokeWidth="72"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M620 860 V1060 H300"
              stroke="#ffc215"
              strokeWidth="72"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Icon cluster — Active Kids reference composition */}
          <span
            aria-hidden
            className="absolute left-[58%] top-[3%] z-[1] h-14 w-20 rounded-md bg-[#69c8c6]/90"
          />
          <ActiveStickFigure
            pose="run"
            color="#a2b6df"
            size={96}
            className="absolute left-[52%] top-[1%] z-10 -translate-x-1/2"
          />

          <ActiveAsterisk
            color="#f26038"
            size={78}
            className="absolute left-[22%] top-[14%] z-10"
          />
          <ActiveAsterisk
            color="#3aa8a6"
            size={42}
            variant="outline"
            className="absolute right-[26%] top-[18%] z-10"
          />

          <ActiveStickFigure
            pose="lunge"
            color="#ffc215"
            size={92}
            accent="#ec1f8f"
            className="absolute left-[46%] top-[30%] z-10 -translate-x-1/2"
          />

          <ActiveAsterisk
            color="#ffffff"
            size={58}
            className="absolute left-[18%] top-[46%] z-10"
          />
          <ActiveAsterisk
            color="#ec1f8f"
            size={44}
            className="absolute right-[24%] top-[55%] z-10"
          />

          <ActiveStickFigure
            pose="crawl"
            color="#ffc215"
            size={100}
            accent="#ec1f8f"
            className="absolute left-[12%] top-[62%] z-10"
          />

          <ActiveStickFigure
            pose="leap"
            color="#69c8c6"
            size={92}
            className="absolute left-[50%] top-[70%] z-10 -translate-x-1/2"
          />

          <ActiveAsterisk
            color="#b6d433"
            size={64}
            className="absolute right-[16%] top-[80%] z-10"
          />
          <ActiveAsterisk
            color="#a2b6df"
            size={36}
            variant="outline"
            className="absolute right-[10%] top-[84%] z-10"
          />

          {blocks.map((block, i) => {
            const positions = [
              "left-0 top-[6%] max-w-[280px]",
              "right-0 top-[18%] max-w-[300px] text-right",
              "left-0 top-[36%] max-w-[280px]",
              "right-0 top-[52%] max-w-[300px] text-right",
              "left-0 top-[68%] max-w-[280px]",
              "right-0 top-[84%] max-w-[300px] text-right",
            ];
            return (
              <article key={block.question} className={`absolute z-20 ${positions[i]}`}>
                <h3 className="active-display text-[1.15rem] leading-tight text-white">
                  {block.question}
                </h3>
                <p
                  className={`mt-2 text-[13px] leading-relaxed text-white/85 ${
                    block.side === "right" ? "ml-auto" : ""
                  }`}
                >
                  {block.answer}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
