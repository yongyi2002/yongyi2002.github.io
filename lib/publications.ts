export type Author = {
  name: string;
  /** Marks a first author. Rendered with an asterisk and a footnote. */
  first?: boolean;
};

export type Publication = {
  title: string;
  subtitle?: string;
  /**
   * The authors to print, in order. For a paper with hundreds of names this is
   * only the leading few; set `totalAuthors` and the rest are counted instead.
   * The site owner's name is emphasised on render.
   */
  authors: Author[];
  /**
   * Size of the full author list, when `authors` above is only its head. Past
   * the lead authors these lists run alphabetically, so a position in them says
   * nothing about contribution and is deliberately never shown.
   */
  totalAuthors?: number;
  /**
   * The paper is still taking co-authors, so the count above is a floor rather
   * than a figure. Rendered as a rounded "N+", which stays true as the list
   * grows instead of going quietly stale.
   */
  authorsOpen?: boolean;
  venue: string;
  year: string;
  /** Canonical landing page for the paper */
  url?: string;
  /** Direct PDF link — external, or a file served from /public/papers */
  pdf?: string;
  doi?: string;
  /**
   * The paper's own site, when it has one. Distinct from `project` below, which
   * points at a page on this site rather than away from it.
   */
  homepage?: string;
  /** Source repository */
  code?: string;
  /** Released dataset or benchmark */
  dataset?: string;
  /**
   * What the site owner did, for a paper whose author line cannot say it. On a
   * list of hundreds the position carries no information, so the role has to be
   * stated outright or it is simply not there.
   */
  contribution?: string;
  /** Slug of the related project page, if there is one */
  project?: string;
  status?: string;
};

/** Terse author constructor: `a("Name")`, or `a("Name", true)` for a first author. */
const a = (name: string, first = false): Author => ({ name, first });

export const publications: Publication[] = [
  {
    title: "JanusMM",
    subtitle:
      "A Benchmark for Self-Deprecation Understanding in Real-World Multimodal Conversations",
    authors: [
      a("Xinyi Xu", true),
      a("Bingguang Hao", true),
      a("Yongyi Xiong", true),
      a("Zimo Chen"),
      a("Xinchen Liu"),
      a("Hongxin Guo"),
      a("Xuelong Wang"),
      a("Silin Zhou"),
      a("Shihan Dou"),
    ],
    venue:
      "Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pp. 24324–24343. ACL",
    year: "2026",
    url: "https://aclanthology.org/2026.acl-long.1116/",
    pdf: "https://aclanthology.org/2026.acl-long.1116.pdf",
    doi: "10.18653/v1/2026.acl-long.1116",
    project: "janusmm",
    status: "Long paper",
  },
  {
    title: "Agents' Last Exam",
    subtitle:
      "A benchmark of long-horizon, economically valuable real-world tasks for computer-use agents",
    authors: [a("Yiyou Sun"), a("Xinyang Han"), a("Weichen Zhang")],
    totalAuthors: 357,
    authorsOpen: true,
    venue: "NeurIPS 2026 Evaluations and Datasets Track",
    year: "2026",
    url: "https://arxiv.org/abs/2606.05405",
    pdf: "https://arxiv.org/pdf/2606.05405",
    homepage: "https://agents-last-exam.org/",
    code: "https://github.com/rdi-berkeley/agents-last-exam",
    dataset: "https://huggingface.co/datasets/agents-last-exam/agents-last-exam",
    status: "Poster",
    contribution: "Data contribution & testing",
  },
  {
    title: "Placing Nature",
    subtitle:
      "Interactive form-finding using computer vision and robotic arm collaboration for natural timber structure",
    authors: [a("Yongyi Xiong", true), a("Yiqing Wang")],
    venue:
      "Architectural Informatics — Proceedings of the 30th CAADRIA Conference, Vol. 2, pp. 295–304. The University of Tokyo, Tokyo, Japan",
    year: "2025",
    pdf: "/papers/placing-nature-caadria-2025.pdf",
    project: "placing-nature",
    status: "Full paper",
  },
];
