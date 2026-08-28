export type GalleryImage = {
  src: string;
  caption?: string;
};

export type ProjectCategory = "selected" | "other";

/** Filter buckets on the index. A project may sit in more than one. */
export const DOMAINS = [
  "Machine Learning",
  "Robotic Fabrication",
  "Digital Fabrication",
  "Computational Design",
] as const;

export type Domain = (typeof DOMAINS)[number];

/** A headline number, shown in a row under the hero. */
export type Stat = { value: string; label: string; detail?: string };

/** A compact results table. `highlight` emphasises the best-performing row. */
export type ResultsTable = {
  caption?: string;
  columns: string[];
  rows: { cells: string[]; highlight?: boolean }[];
  note?: string;
};

export type ProjectLink = { label: string; href: string };

/** A documentation clip. `poster` is shown until the viewer hits play. */
export type ProjectVideo = { src: string; poster: string; caption?: string };

export type Project = {
  slug: string;
  /** "selected" projects lead the index; "other" works are listed below them */
  category: ProjectCategory;
  title: string;
  subtitle: string;
  year: string;
  /** Short label shown in the index grid */
  blurb: string;
  /** Filter buckets this project belongs to */
  domains: Domain[];
  /** Short kind label shown next to the year, e.g. "Research Project" */
  kind: string;
  meta: {
    type?: string;
    instructor?: string;
    collaborators?: string;
    role?: string;
    publication?: string;
  };
  tags: string[];
  description: string[];
  /** Footnote-style credit shown under the description */
  note?: string;
  /** Headline results, rendered as a stat row under the hero */
  stats?: Stat[];
  /** Quantitative results, rendered as a real table rather than a screenshot */
  table?: ResultsTable;
  /** Code, paper or poster links, shown in the sidebar */
  links?: ProjectLink[];
  /** Documentation clip, shown above the image sequence */
  video?: ProjectVideo;
  /**
   * Silent looping cover for the index, cut from `video`. A short muted video
   * rather than a GIF: same effect, a fraction of the bytes at full width.
   */
  cover?: { src: string; poster: string };
  /** Cover photograph. Omit for papers that only have a typographic cover. */
  hero?: string;
  gallery: GalleryImage[];
};

const m = (slug: string, file: string) => `/media/${slug}/${file}`;

export const projects: Project[] = [
  {
    slug: "janusmm",
    category: "selected",
    domains: ["Machine Learning"],
    kind: "Research Project",
    title: "JanusMM",
    subtitle: "A Benchmark for Self-Deprecation Understanding in Real-World Multimodal Conversations",
    year: "2026",
    blurb:
      "The first benchmark for whether multimodal models can tell self-deprecation from a literal complaint.",
    meta: {
      type: "Research",
      collaborators:
        "Xinyi Xu, Bingguang Hao, Zimo Chen, Xinchen Liu, Hongxin Guo, Xuelong Wang, Silin Zhou & Shihan Dou",
      role: "Co-first author",
      publication: "ACL 2026, Long Paper",
    },
    tags: [
      "Multimodal LLMs",
      "Benchmark",
      "Pragmatics",
      "Human–AI Interaction",
      "Memes",
      "Bilingual",
    ],
    description: [
      "Self-deprecation refers to the act of being modest or critical of oneself, especially in a humorous way. Unlike humor, it not only evokes laughter and fosters social interaction but also allows individuals to reveal hidden sadness — and online, people often convey it through a combination of images and text, such as memes. Whether multimodal large language models can understand it remains underexplored.",
      "JanusMM is the first benchmark designed to evaluate MLLMs' understanding of self-deprecation in real-world conversations. It contains 2,016 bilingual memes from three types of social interactions, and provides a dual-task evaluation framework with six new metrics.",
      "The first task, Unpacking Self-Deprecation, assesses recognition and reasoning. The second, Joining the Self-Deprecating Conversation, evaluates the consistency of a model's understanding by simulating the perspectives of the initiator and the responder. Recognition is scored on accuracy; reasoning is scored with METEOR, Greedy Match, BARTScore and BERTScore. For the dual-perspective task the paper introduces Initiator–Responder Consistency (IRC), which quantifies consistency across Emotional Label Consistency, Factual Grounding Consistency and Causal Reasoning Consistency.",
      "Ten frontier MLLMs were evaluated. They exhibit weak recognition and reasoning abilities, and their understanding of self-deprecation remains inconsistent across both perspectives.",
      "To locate the failures, the reasoning process is abstracted into a logical chain: the model must first accurately capture the literal features of images and text (modality extraction), then correctly match the underlying emotion in cases of text-image conflict (affective mapping), and finally infer the speaker's pragmatic intention beyond the literal meaning (self-deprecating intention inference). Errors are categorised into eight types along that chain — Affective Hallucination (AH), the most prevalent, where models are misled by superficially positive cues and fail to recognise the underlying intent; Knowledge Disconnection (KD), where factual knowledge is not applied to self-deprecating situations; Social Criticism (SC), reading too much into casual jokes; Attribution Fallacy (AF), recognising the expression but making up reasons; Textual Misunderstanding (TM), fragility with puns and rhetorical questions; Safety Misjudgment (SM), labelling harmless content as harmful and refusing to respond; Context Dependency (Cdep), failing to recognise objects in unusual contexts; and Attention Bias (AB), overlooking part of a multi-frame meme.",
    ],
    note: "Nine-author collaboration; co-first author with Xinyi Xu and Bingguang Hao. Figures are reproduced from the published paper, and the description follows its wording.",
    stats: [
      { value: "2,016", label: "Bilingual memes", detail: "three interaction settings, Chinese and English" },
      { value: "67.0%", label: "Best model", detail: "GPT-4.1 recognition accuracy on the Chinese subset" },
      { value: "90.8%", label: "Human baseline", detail: "the gap the benchmark is built to measure" },
    ],
    table: {
      caption: "Task 1: Unpacking Self-Deprecation — recognition accuracy (%)",
      columns: ["Model", "Chinese", "English"],
      rows: [
        { cells: ["Human baseline", "90.8", "88.4"], highlight: true },
        { cells: ["GPT-4.1", "67.00", "60.46"] },
        { cells: ["Claude-3.7-Sonnet", "61.37", "20.29"] },
        { cells: ["Gemini-2.5-Pro", "52.11", "53.45"] },
        { cells: ["Qwen-VL-Max", "45.98", "10.20"] },
        { cells: ["Claude-Sonnet-4", "44.16", "15.40"] },
        { cells: ["GPT-4o", "41.24", "39.10"] },
        { cells: ["Gemini-2.5-Flash", "36.22", "39.95"] },
        { cells: ["Doubao-1.5-Thinking-Pro", "23.44", "18.27"] },
        { cells: ["Doubao-1.5-Thinking-Pro-Vision", "17.30", "24.76"] },
        { cells: ["Qwen-VL-Plus", "16.80", "7.75"] },
      ],
      note: "Ten frontier models, ordered by accuracy on the Chinese subset. Every one of them sits far below the human baseline, and several collapse when the language changes — Claude-3.7-Sonnet drops from 61.37 to 20.29, Qwen-VL-Max from 45.98 to 10.20.",
    },
    links: [
      { label: "Paper", href: "https://aclanthology.org/2026.acl-long.1116/" },
      { label: "PDF", href: "https://aclanthology.org/2026.acl-long.1116.pdf" },
      { label: "DOI", href: "https://doi.org/10.18653/v1/2026.acl-long.1116" },
    ],
    hero: m("janusmm", "hero.jpg"),
    gallery: [
      { src: m("janusmm", "01.jpg"), caption: "Benchmark pipeline — dataset construction from three interaction scenarios, the dual-task evaluation, and the error-analysis loop" },
      { src: m("janusmm", "02.jpg"), caption: "Eight reasoning error types found across the models, each shown with a real failing case" },
    ],
  },
  {
    slug: "spatial-cue-fine-tuning",
    domains: ["Machine Learning"],
    kind: "Research Project",
    category: "selected",
    title: "Spatial Cue Fine-Tuning",
    subtitle: "Improving Front/Back Depth Reasoning in Vision-Language Models",
    year: "2026",
    blurb:
      "A QLoRA-tuned 7B VLM that reads structured spatial cues — and beats a zero-shot model 10× its size.",
    meta: {
      type: "Course project · 10-423/623 Generative AI (CMU)",
      collaborators: "Jingwu Wang & Yunxiang Ma",
      role: "Dataset reconstruction · evaluation pipeline · QLoRA tuning · analysis",
    },
    tags: [
      "Vision-Language Models",
      "Qwen2.5-VL",
      "QLoRA",
      "Spatial Reasoning",
      "Occlusion",
      "LLM-as-a-Judge",
    ],
    description: [
      "Vision-language models do well on general multimodal tasks but still fail at spatial reasoning in partially occluded scenes. We studied one concrete version of that failure — pairwise occlusion order prediction: given an image and two localised objects A and B, decide whether A is in front of or behind B. The task is framed generatively, so the model writes a short rationale and the final front/behind label is parsed from its answer.",
      "The dataset is built from InstaOrder depth annotations paired with COCO 2017 images. Three preprocessing decisions make the benchmark honest: every unordered pair is emitted twice with flipped labels so a front-only shortcut cannot beat 50%; all pairs from one image stay in the same split, preventing visual leakage; and the queried boxes are drawn onto the image and labelled A and B, so the pair is unambiguous even when the same object category appears many times.",
      "Measured this way, the 7B zero-shot baseline scores 50.51% — chance. That number hides a severe directional shortcut: 74.53% on front queries against 26.49% on behind. Adding bounding-box coordinates and a 2D overlap flag to the prompt alone lifts raw accuracy to roughly 65–66%, but pairwise consistency stays weak, showing the pretrained model can read the metadata without forming a stable relational rule.",
      "Fine-tuning with QLoRA on a 4-bit backbone is what makes the cues pay off. All three tuned variants clear 91% raw accuracy, and the combined bbox + overlap setting reaches 92.65% raw accuracy with 96.82% consistency — outperforming the 72B zero-shot reference on this task while training only low-rank adapters. The remaining weakness is honest and specific: accuracy still falls from 96.08% on non-overlapping pairs to 75.80% when the boxes overlap, so lightweight 2D cues help but do not resolve deeply ambiguous occlusion.",
    ],
    note: "Course project for 10-423/623 Generative AI at Carnegie Mellon University. Total compute was roughly 64 GPU-hours on NVIDIA B200 workers (~$400).",
    stats: [
      {
        value: "92.65%",
        label: "Raw accuracy",
        detail: "7B QLoRA + bbox + overlap, from 50.51% zero-shot",
      },
      {
        value: "96.82%",
        label: "Pairwise consistency",
        detail: "from 26.15% at the 7B zero-shot baseline",
      },
      {
        value: "10×",
        label: "Smaller than the model it beats",
        detail: "7B tuned vs. 72B zero-shot at 70.16%",
      },
    ],
    table: {
      caption: "Filtered InstaOrder test split — key configurations",
      columns: ["Configuration", "Raw", "front", "behind", "Consistency", "Pair acc."],
      rows: [
        { cells: ["7B zero-shot", "50.51", "74.53", "26.49", "26.15", "21.61"] },
        { cells: ["7B zero-shot + bbox + overlap", "66.26", "79.20", "53.32", "50.63", "44.33"] },
        { cells: ["72B zero-shot", "70.16", "78.52", "61.79", "67.01", "53.66"] },
        {
          cells: ["7B QLoRA + bbox + overlap", "92.65", "93.56", "91.73", "96.82", "91.06"],
          highlight: true,
        },
      ],
      note: "All values are percentages. The 7B zero-shot gap between front and behind is the directional shortcut the balanced dataset was built to expose.",
    },
    links: [
      { label: "Code", href: "https://github.com/yongyi2002/10623_project" },
      { label: "Report", href: "/papers/spatial-cue-fine-tuning-report.pdf" },
      { label: "Poster", href: "/papers/spatial-cue-fine-tuning-poster.pdf" },
    ],
    hero: m("spatial-cue-fine-tuning", "hero.jpg"),
    gallery: [
      { src: m("spatial-cue-fine-tuning", "01.jpg"), caption: "Each unordered pair is asked twice — swapping the A and B labels — so a front-only shortcut cannot beat chance" },
      { src: m("spatial-cue-fine-tuning", "02.jpg"), caption: "Method — marked image and textual spatial cues assembled into a prompt, then baseline, zero-shot cue and QLoRA branches" },
      { src: m("spatial-cue-fine-tuning", "03.jpg"), caption: "Accuracy by overlap setting and by target label across all eight configurations" },
      { src: m("spatial-cue-fine-tuning", "04.jpg"), caption: "Accuracy by bbox IoU bucket, accuracy against consistency, and rationale quality scores" },
    ],
  },
  {
    slug: "placing-nature",
    domains: ["Machine Learning", "Robotic Fabrication"],
    kind: "Research Project",
    category: "selected",
    title: "Placing Nature",
    subtitle: "Interactive Form-Finding with Robotic Arm Collaboration",
    year: "2024",
    blurb: "Human–robot form-finding with branches, gesture control and YOLOv5.",
    meta: {
      type: "Individual work",
      instructor: "Yiqing Wang",
      publication: "Full paper accepted by CAADRIA 2025",
    },
    tags: [
      "Human–Robot Collaboration",
      "YOLOv5",
      "Gesture Tracking",
      "Timber",
      "Form-Finding",
    ],
    description: [
      "This project investigates a dynamic design-build process that fosters creativity through human–robot collaboration. An interactive robotic fabrication method was developed, incorporating the YOLOv5 model and gesture tracking to create improvised natural structures. The robotic arm classified the wood elements selected by humans and identified potential placement points, integrating human input to refine the process until a natural timber structure emerged.",
      "Throughout the pick-and-place phases, humans and robots alternated roles in learning and construction. Ten participants constructed forty test mockups and ten final natural structures, followed by interviews and questionnaires about the process. Participants reflected on their experiences, gaining deeper insights into the detection model, the robot's performance in relation to existing structures, and the role of material constraints in shaping new forms.",
      "The findings underscore how humans adapt to physical feedback and machine operations to design with materiality and natural characteristics.",
    ],
    note: "Individually developed from group work with Jingyi Liu.",
    video: {
      src: m("placing-nature", "video.mp4"),
      poster: m("placing-nature", "video-poster.jpg"),
      caption: "The robotic arm classifying branches and placing them into the growing structure",
    },
    hero: m("placing-nature", "hero.jpg"),
    gallery: [
      { src: m("placing-nature", "01.jpg"), caption: "Interactive form-finding with the robotic arm and hand gestures" },
      { src: m("placing-nature", "02.jpg"), caption: "Dataflow — object detection and gesture control; fabrication workflow" },
      { src: m("placing-nature", "03.jpg"), caption: "Real-time construction sequence and user-prediction study" },
      { src: m("placing-nature", "04.jpg"), caption: "User interview outcomes across eight participants" },
    ],
  },
  {
    slug: "segmented-image",
    domains: ["Machine Learning", "Computational Design"],
    kind: "Research Project",
    category: "selected",
    title: "Segmented Image",
    subtitle: "City Identity Spatial Image",
    year: "2024",
    blurb: "Quantifying Chongqing's urban identity through segmentation, TrueSkill and a tangible collage device.",
    meta: {
      type: "Group work",
      instructor: "Han Tu & Yiqing Wang",
      collaborators: "Tiange Liu & Guanze Sun",
      role: "40% data collection · 50% design · 100% collage coding · 50% device design · 50% experiment",
      publication: "Abstract accepted by CAADRIA 2025",
    },
    tags: [
      "Semantic Segmentation",
      "DPT",
      "TrueSkill",
      "Random Forest",
      "Urban Perception",
      "Interactive Device",
    ],
    description: [
      "Urban spatial elements shape perceptions of city identity. Addressing the limitations of small-scale qualitative studies lacking quantitative analysis, and of large-scale analyses using street-view images that neglect internal elements, we propose a random collage approach to quantitatively investigate the interrelationships among these internal elements and the overall imagery.",
      "Focusing on perception in urban life, we used DPT for semantic segmentation of Chongqing rail transit, then generated collages by masking to isolate elements individually and employed the TrueSkill algorithm to rank their city-imagery scores. To explore the nonlinear relationship between imagery perception and element proportions, we conducted feature engineering to extract the seven most influential elements, and trained two Random Forest models — an entrance model and an elevated-track model.",
      "The methodology identifies spatial elements contributing to urban imagery and offers insights into city identity and public-memory cultivation. An interactive device that lets participants build their own collage was made based on the analysis.",
    ],
    hero: m("segmented-image", "hero.jpg"),
    gallery: [
      { src: m("segmented-image", "01.jpg"), caption: "Elements of the urban image; data-collection and model-training workflow" },
      { src: m("segmented-image", "02.jpg"), caption: "Random collage — segmentation, masking and element extraction" },
      { src: m("segmented-image", "03.jpg"), caption: "TrueSkill questionnaire and mapping of entrance scores across the network" },
      { src: m("segmented-image", "04.jpg"), caption: "Interactive device — element block and terrain assembly" },
    ],
  },
  {
    slug: "computed-cake",
    domains: ["Digital Fabrication", "Computational Design"],
    kind: "Studio Project",
    category: "selected",
    title: "Computed Cake",
    subtitle: "3D Printing Cake Mould",
    year: "2024",
    blurb: "A parametric Chinese interlocking pattern, 3D-printed into a mould and baked into a mousse cake.",
    meta: {
      type: "Individual work · Studio (TU Graz)",
      instructor: "Milena Stavric",
    },
    tags: [
      "Parametric Design",
      "Digital Fabrication",
      "3D Printing",
      "Silicone Moulding",
      "Interlocking Pattern",
    ],
    description: [
      "Rethinking new building materials starts with using local products and combining them in unexpected ways. Can we think about building materials in the context of our daily activities and manufacturing processes? In this project I learned from cooking and combined it with parametric design and digital fabrication.",
      "For the design, the inspiration came from a traditional Chinese interlocking pattern, which was remapped, reconfigured and reformed. A positive cake mould and a negative silicone mould were produced: the positive mould is 3D-printed in PLA with four side walls to stop the edible silicone from leaking; the negative silicone mould is cast against it and baked for at least two hours before use.",
      "The final cake was a yogurt mousse cake with an orange jelly and cookie layer inside.",
    ],
    hero: m("computed-cake", "hero.jpg"),
    gallery: [
      { src: m("computed-cake", "01.jpg"), caption: "The finished yogurt mousse cake, cut to show the layers" },
      { src: m("computed-cake", "02.jpg"), caption: "Pattern generation and the 3D-printed mould" },
      { src: m("computed-cake", "03.jpg"), caption: "Cake-making process" },
    ],
  },
  {
    slug: "dynamic-facade",
    domains: ["Digital Fabrication"],
    kind: "Workshop",
    category: "selected",
    title: "Dynamic Facade",
    subtitle: "Movable Structure Prototype Design",
    year: "2024",
    blurb: "A modular scissor-structure facade whose pattern shifts as the whole surface expands and contracts.",
    meta: {
      type: "Workshop (4 days)",
      instructor: "Vera Parlac",
      collaborators: "Jooyoung Lee",
      role: "70% design · 100% laser cutting · 50% assembly",
    },
    tags: ["Kinetic Architecture", "Scissor Structure", "Laser Cutting", "Prototyping"],
    description: [
      "A dynamic facade blends aesthetics with functionality. Designed to respond to environmental changes or user needs, these adaptive systems incorporate sensors, smart materials and mechanical components, and offer an ever-changing visual identity that turns buildings into living, responsive structures.",
      "In this four-day workshop we designed and built a prototype of a possible dynamic facade using a scissor structure. The idea is a modular surface in which the pattern of each box changes as the whole structure shrinks or expands.",
    ],
    video: {
      src: m("dynamic-facade", "video.mp4"),
      poster: m("dynamic-facade", "video-poster.jpg"),
      caption: "The scissor structure folding and unfolding by hand",
    },
    hero: m("dynamic-facade", "hero.jpg"),
    gallery: [
      { src: m("dynamic-facade", "01.jpg"), caption: "Prototype detail — scissor linkages and lens components" },
      { src: m("dynamic-facade", "02.jpg"), caption: "Component, one movable box, and the assembled frame" },
    ],
  },
  {
    slug: "monument-to-loneliness",
    domains: ["Digital Fabrication", "Computational Design"],
    kind: "Studio Project",
    category: "selected",
    title: "Monument to Loneliness",
    subtitle: "1:1 Onsite Construction Using CNC Milling",
    year: "2024",
    blurb: "A Möbius-strip timber pavilion, structurally optimised, CNC-milled and built 1:1 on the TU Graz campus.",
    meta: {
      type: "Studio (TU Graz)",
      instructor: "Urs Hirschberg & Milena Stavric",
      collaborators: "Zhenyang Chen — selected as the design to build among 8 groups; constructed with 16 classmates",
      role: "Initial form design · model making · CNC milling · polishing · on-site construction",
      publication: "Published on Baunetz Campus",
    },
    tags: ["Möbius Strip", "CNC Milling", "Timber Joinery", "Structural Optimization", "1:1 Construction"],
    description: [
      "The main idea of the monument is a Möbius strip with part of it vanishing beneath the ground — an icon that, to us, perfectly represents loneliness. The design is made of two parts: a cylinder and a vault. The cylinder has a narrow entrance that admits only one person at a time and is quite tall, so visitors are likely to feel lonely there. The vault is much more open and has seats, so people are encouraged to gather.",
      "As visitors travel from the cylinder to the vault they feel the shift from loneliness to openness, while the Möbius geometry turns from \"inside\" to \"outside\" — echoing that emotional change. The system is easy to assemble and disassemble, so the pieces can travel anywhere in the world and be rebuilt.",
    ],
    note: "Published on Baunetz Campus: baunetz-campus.de — \"Gemeinsam bauen für die Einsamkeit: A Monument to Loneliness\".",
    video: {
      src: m("monument-to-loneliness", "video.mp4"),
      poster: m("monument-to-loneliness", "video-poster.jpg"),
      caption: "CNC-milled pieces assembled 1:1 on the TU Graz campus",
    },
    cover: {
      src: m("monument-to-loneliness", "cover.mp4"),
      poster: m("monument-to-loneliness", "cover-poster.jpg"),
    },
    hero: m("monument-to-loneliness", "hero.jpg"),
    gallery: [
      { src: m("monument-to-loneliness", "01.jpg"), caption: "The built vault arch on site" },
      { src: m("monument-to-loneliness", "02.jpg"), caption: "Interlocking joints, 1:30 prototype and CNC milling pieces" },
      { src: m("monument-to-loneliness", "03.jpg"), caption: "Digital modeling in Rhino / Grasshopper and structural optimization" },
      { src: m("monument-to-loneliness", "04.jpg"), caption: "CNC milling, polishing and on-site construction" },
    ],
  },
  {
    slug: "robotic-bamboo-weaving",
    domains: ["Robotic Fabrication", "Digital Fabrication"],
    kind: "Workshop",
    category: "selected",
    title: "Robotic Bamboo Weaving",
    subtitle: "Human-Robot Collaborated Fabrication",
    year: "2024",
    blurb: "A 3 m sphere bamboo pavilion woven by robotic arms with a custom end-effector, assisted by hand.",
    meta: {
      type: "Workshop (DigitalFUTURES 2024)",
      instructor: "Philip F. Yuan & Yige Liu",
      role: "Construction group member (with 15 participants) · material processing · form optimization · assisting robotic weaving",
    },
    tags: ["Robotic Fabrication", "Bamboo", "Pavilion", "Custom End-effector", "Human–Robot Collaboration"],
    description: [
      "How robots can cooperate with people in fabrication is an important topic today. In this workshop we worked with robotic arms to collaboratively build a three-metre-tall spherical bamboo pavilion. Humans prepared the bamboo material and built the steel base; the robotic arm positioned each bamboo raft and wove it into a spherical structure with human assistance.",
      "The robotic arms ensure high accuracy and consistency in the weaving process, enabling intricate patterns that are hard to achieve manually. The head of the robotic arm was specially designed to pull the bamboo raft.",
    ],
    video: {
      src: m("robotic-bamboo-weaving", "video.mp4"),
      poster: m("robotic-bamboo-weaving", "video-poster.jpg"),
      caption: "Robotic arms weaving the bamboo rafts into the spherical pavilion",
    },
    cover: {
      src: m("robotic-bamboo-weaving", "cover.mp4"),
      poster: m("robotic-bamboo-weaving", "cover-poster.jpg"),
    },
    hero: m("robotic-bamboo-weaving", "hero.jpg"),
    gallery: [
      { src: m("robotic-bamboo-weaving", "01.jpg"), caption: "Custom mechanical head pulling a bamboo raft" },
      { src: m("robotic-bamboo-weaving", "02.jpg"), caption: "Robotic weaving pipeline, form evolution and the mechanical head" },
      { src: m("robotic-bamboo-weaving", "03.jpg"), caption: "On-site construction and robotic arm weaving" },
    ],
  },
  {
    slug: "shape-grammar",
    domains: ["Computational Design"],
    kind: "Workshop",
    category: "selected",
    title: "Shape Grammar",
    subtitle: "Digital Heritage",
    year: "2023",
    blurb: "Regenerating Alhambra ornament by deriving the shape-grammar rules behind each pattern.",
    meta: {
      type: "Workshop (DigitalFUTURES 2023)",
      instructor: "Athanassios Economou & Yichao Shi",
      collaborators: "Shenzhou Dai, Yaluo Wang & Xiongfei Xie",
    },
    tags: ["Shape Grammar", "Digital Heritage", "Islamic Geometry", "Alhambra", "Generative Rules"],
    description: [
      "A workshop on shape grammars applied to digital heritage, taking the geometric ornament of the Alhambra as its source material. The workflow ran in three steps: abstract and simplify a pattern from the Alhambra, find the geometrical rule behind that pattern, then use a shape grammar machine to regenerate it.",
      "Four patterns were reconstructed this way. Each is documented as a chain of transformation rules — loop, subdivision, degrees, scale and angle — that together regenerate the ornament from a single starting shape, alongside the historical plate it was derived from.",
    ],
    note: "Patterns were generated individually by members of the group; the individual attributions are marked on the original sheets.",
    hero: m("shape-grammar", "hero.jpg"),
    gallery: [
      { src: m("shape-grammar", "01.jpg"), caption: "Patterns 3 and 4 — source plates and their transformation rule chains" },
    ],
  },
  {
    slug: "xiongan-wings",
    domains: ["Computational Design", "Digital Fabrication"],
    kind: "Professional Work",
    category: "selected",
    title: "Xiong'an Wings",
    subtitle: "Modelling of a 3D Printed Facade",
    year: "2024",
    blurb: "Grasshopper modelling of a cantilevered 3D-printed facade, built by on-site robotic prefabrication.",
    meta: {
      type: "Professional work",
      role: "Grasshopper modelling of the A section and its facade blocks",
    },
    tags: ["Grasshopper", "3D Printing", "Facade", "Robotic Prefabrication", "Parametric Modelling"],
    description: [
      "The Xiong'an Wings building has a five-storey structure separated into four sections — A, B, C and D — with the wings of the building cantilevered. The most distinctive feature of the project is the large cantilevered red \"wings\" on both sides.",
      "The design of this section employs digital design methods and uses modified-plastic 3D printing for the construction of the wings. By adopting an on-site prefabrication production model, based on the highly flexible characteristics of a mobile robotic platform, a modular prefabrication factory is rapidly deployed on site. This allows for the mass production of high-quality customised prefabricated components at the construction site.",
    ],
    note: "Location: Xiong'an, China · Area: 23,565.49 m². Grasshopper definition written in cooperation with Jue Zhang.",
    hero: m("xiongan-wings", "hero.jpg"),
    gallery: [
      { src: m("xiongan-wings", "01.jpg"), caption: "Grasshopper model of the A section and the resulting facade blocks" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
