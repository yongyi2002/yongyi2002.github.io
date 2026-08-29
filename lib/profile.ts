// Everything on the home page's opening block comes from here.
// Any field left empty is simply not rendered.

export const profile = {
  name: "Yongyi Xiong",

  /** Browser tab and search-result title. */
  title: "Computational Design, AI Agents & Machine Learning",

  /** Search-result summary. Keep it to what you actually work on. */
  seoDescription:
    "Computational designer and AI engineer. Agent development, human–agent interaction, vision-language models, robotic fabrication and urban perception.",

  /** Short self-description, shown under the name in the sidebar. */
  role: ["Computational Designer,", "AI Engineer &", "Creative Technologist."],

  /**
   * The introduction. Kept to what the timeline and publications sections below
   * do not already say, so nothing is repeated and nothing gets clipped.
   * DRAFT — written from your projects and papers; please edit to taste.
   */
  bio: [
    "I work between computational design and machine learning — building AI systems and the interfaces through which people actually work with them. My research runs from agent development and human–agent interaction to vision-language models, robotic fabrication and urban perception.",
  ],

  /**
   * Experience as a timeline. `start`/`end` are YYYY-MM and drive the bars —
   * omit `end` for anything still running. `period` is the human-readable label.
   * TODO: the month boundaries for Tongji are assumed (Sep intake, Jun finish);
   * correct them if they are off.
   */
  education: [
    {
      school: "Tongji University",
      degree: "Bachelor of Architecture",
      period: "Sep 2020 — Jun 2025",
      start: "2020-09",
      end: "2025-06",
      kind: "education",
    },
    {
      school: "TU Graz",
      degree: "Exchange, Institute of Architecture and Media",
      period: "Mar — Jun 2024",
      start: "2024-03",
      end: "2024-06",
      kind: "education",
    },
    {
      school: "Meituan",
      degree: "AI Engineer, Intern",
      period: "May — Aug 2025",
      start: "2025-05",
      end: "2025-08",
      kind: "work",
    },
    {
      school: "Carnegie Mellon University",
      degree: "Master of Computational Design",
      period: "Aug 2025 — May 2027 (expected)",
      start: "2025-08",
      end: "2027-05",
      expected: true,
      kind: "education",
    },
    {
      school: "HILOS",
      degree: "AI Research Fellow",
      period: "Jun — Aug 2026",
      start: "2026-06",
      end: "2026-08",
      kind: "work",
    },
  ] as {
    school: string;
    degree: string;
    period: string;
    start: string;
    end?: string;
    /** Runs past today — the stretch after now is drawn as projected. */
    expected?: boolean;
    kind: "education" | "work";
  }[],

  /** Grouped capability lists — the "system configuration" panel. */
  stack: [
    {
      group: "Machine Intelligence",
      items: ["PyTorch", "Vision-Language Models", "Computer Vision (YOLO, DPT)", "QLoRA / PEFT"],
    },
    {
      group: "Agents & Interaction",
      items: [
        "Agent Development",
        "Tool Use & Planning",
        "Human–Agent Interaction",
        "LLM-as-a-Judge Evaluation",
      ],
    },
    {
      group: "Computation",
      items: ["Python (NumPy, Pandas)", "Next.js / TypeScript"],
    },
    {
      group: "Spatial Computing",
      items: ["Rhino / Grasshopper", "Shape Grammars", "Structural Optimisation"],
    },
    {
      group: "Robotics & Fabrication",
      items: ["Robotic Arm Toolpathing", "Custom End-effectors", "CNC Milling", "3D Printing / Laser Cutting"],
    },
  ] as { group: string; items: string[] }[],

  email: "yongyixiong11@gmail.com",

  /**
   * Icon links next to the email address. `icon` picks the glyph;
   * an entry with an empty href is skipped, so LinkedIn stays hidden
   * until you paste your URL in.
   */
  links: [
    { label: "GitHub", href: "https://github.com/yongyi2002", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yongyi-xiong-1a39b5380/", icon: "linkedin" },
  ] as { label: string; href: string; icon: "github" | "linkedin" }[],

  /** Closing line in the footer, in the spirit of a manifesto. */
  footerLine: "Design. Computation. Fabrication.",
};
