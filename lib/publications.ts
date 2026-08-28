export type Author = {
  name: string;
  /** Marks a first author. Rendered with an asterisk and a footnote. */
  first?: boolean;
};

export type Publication = {
  title: string;
  subtitle?: string;
  /** Full author list, in order. The site owner's name is emphasised on render. */
  authors: Author[];
  venue: string;
  year: string;
  /** Canonical landing page for the paper */
  url?: string;
  /** Direct PDF link — external, or a file served from /public/papers */
  pdf?: string;
  doi?: string;
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
