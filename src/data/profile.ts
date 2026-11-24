export interface BilingualText {
  en: string;
  de: string;
}

export interface ExperienceItem {
  role: BilingualText;
  organization: string;
  subtitle?: BilingualText;
  location: BilingualText;
  period: BilingualText;
  highlights: { label: BilingualText; text: BilingualText }[];
}

export interface EducationItem {
  degree: BilingualText;
  institution: string;
  location: BilingualText;
  period: BilingualText;
  focus: BilingualText;
}

export interface SkillGroup {
  category: BilingualText;
  items: string[];
}

export const SITE = {
  title: 'Xusheng Guo',
  tagline: 'AI Engineer & M.Sc. AI Student',
  description:
    'Personal website and technical blog of Xusheng Guo — M.Sc. Artificial Intelligence student at OTH Amberg-Weiden and Master thesis researcher at NXP Semiconductors focusing on LLM Quantization, Speculative Decoding (EAGLE-3), RAG, and Edge Robotics.',
  url: 'https://guohere.github.io',
  author: 'Xusheng Guo',
  email: 'x.guo@oth-aw.de',
  location: { en: 'Germany', de: 'Deutschland' },
  languages: {
    en: 'English: Fluent (C1) · German: Intermediate (B1)',
    de: 'Englisch: Fließend (C1) · Deutsch: Gute Grundkenntnisse (B1)',
  },
  github: 'https://github.com/guohere',
  linkedin: 'https://linkedin.com/in/xusheng-guo-964373307/',
} as const;

export const ABOUT = {
  greeting: {
    en: 'Welcome to my main page.',
    de: 'Willkommen auf meiner Hauptseite.',
  },
  summary: {
    en: 'I am an M.Sc. Artificial Intelligence student at OTH Amberg-Weiden, currently finishing my Master’s thesis at NXP Semiconductors on quantization and speculative decoding (EAGLE-3) for edge LLMs. Here I share my projects, thesis knowledge summaries, and engineering notes.',
    de: 'Ich studiere Künstliche Intelligenz (M.Sc.) an der OTH Amberg-Weiden und schreibe derzeit meine Masterarbeit bei NXP Semiconductors über Quantisierung und Speculative Decoding (EAGLE-3) für Edge-LLMs. Hier teile ich meine Projekte, Wissenszusammenfassungen zur Masterarbeit und technische Notizen.',
  },
} as const;

export const CATEGORY_LABELS: Record<string, BilingualText> = {
  All: { en: 'All', de: 'Alle' },
  'Master Thesis': { en: 'Master Thesis', de: 'Masterarbeit' },
  Projects: { en: 'Projects', de: 'Projekte' },
  'AI & LLMs': { en: 'AI & LLMs', de: 'KI & LLMs' },
  Robotics: { en: 'Robotics', de: 'Robotik' },
  Engineering: { en: 'Engineering', de: 'Engineering' },
};

export const STATUS_LABELS: Record<string, BilingualText> = {
  Completed: { en: 'Completed', de: 'Abgeschlossen' },
  'In Progress': { en: 'In Progress', de: 'In Arbeit' },
  Research: { en: 'Research', de: 'Forschung' },
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: { en: 'Model Optimization & Deployment', de: 'Modelloptimierung & Deployment' },
    items: [
      'Quantization (RTN, GPTQ, QAT)',
      'Speculative Decoding (EAGLE-3)',
      'LoRA Adapters',
      'Model Pruning',
      'ONNX Runtime',
      'Olive',
      'vLLM',
    ],
  },
  {
    category: { en: 'AI & NLP', de: 'KI & NLP' },
    items: ['LLMs', 'RAG', 'HuggingFace', 'Transformers'],
  },
  {
    category: { en: 'Frameworks & Libraries', de: 'Frameworks & Bibliotheken' },
    items: ['PyTorch', 'Scikit-learn', 'OpenCV', 'Optuna'],
  },
  {
    category: { en: 'Engineering & Robotics', de: 'Engineering & Robotik' },
    items: ['ROS2', 'Linux', 'Docker', 'NVIDIA Jetson (AGX / Orin Nano)', 'Git'],
  },
  {
    category: { en: 'Data Science', de: 'Data Science' },
    items: ['Python', 'SQL'],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: {
      en: "Master's Thesis — Edge AI Research",
      de: 'Masterarbeit — Edge-AI-Forschung',
    },
    organization: 'NXP Semiconductors',
    subtitle: {
      en: 'Quantization & Speculative Decoding Synergies for Edge AI',
      de: 'Synergien von Quantisierung und Speculative Decoding für Edge AI',
    },
    location: { en: 'Germany', de: 'Deutschland' },
    period: { en: 'May 2026 – Nov 2026', de: 'Mai 2026 – Nov. 2026' },
    highlights: [
      {
        label: { en: 'Research Scope', de: 'Forschungsschwerpunkt' },
        text: {
          en: 'Studied how quantization and speculative decoding interact for small LLMs (Qwen3-1.7B, Llama-3.2-1B) with EAGLE-3 draft models on ONNX Runtime, quantizing target (FP32 to 2-bit) and draft (FP32 to 1-bit) independently across a full precision matrix.',
          de: 'Untersuchte das Zusammenspiel von Quantisierung und Speculative Decoding für kompakte LLMs (Qwen3-1.7B, Llama-3.2-1B) mit EAGLE-3-Draft-Modellen auf ONNX Runtime – mit unabhängiger Quantisierung von Ziel- (FP32 bis 2-Bit) und Draft-Modell (FP32 bis 1-Bit) über eine vollständige Präzisionsmatrix.',
        },
      },
      {
        label: { en: 'Quantization-Aware Training', de: 'Quantization-Aware Training (QAT)' },
        text: {
          en: 'Extended the vLLM Speculators framework with QAT (fake quantization, straight-through estimator) and trained EAGLE-3 drafts down to 1-bit, recovering the acceptance rate of FP32 drafts where post-training quantization loses up to 80%.',
          de: 'Erweiterte das vLLM-Speculators-Framework um QAT (Fake Quantization, Straight-Through Estimator) und trainierte EAGLE-3-Drafts bis auf 1-Bit – wodurch die Akzeptanzrate von FP32-Drafts wiederhergestellt wurde, wo Post-Training-Quantisierung bis zu 80 % verliert.',
        },
      },
      {
        label: { en: 'Edge Inference Optimization', de: 'Edge-Inferenzoptimierung' },
        text: {
          en: 'Quantized models to W8A8/W4A8 with RTN and GPTQ via Olive, pruned the draft’s LM head from 128k to 32k tokens, turning a slowdown on quantized targets into a 1.10–1.33× speed-up and reaching up to 6.6× end-to-end throughput over FP32 on CPU.',
          de: 'Quantisierte Modelle mit RTN und GPTQ über Olive auf W8A8/W4A8, prunte den Draft-LM-Head von 128k auf 32k Tokens und wandelte eine Verlangsamung auf quantisierten Zielmodellen in eine 1,10–1,33× Beschleunigung um – bis zu 6,6× End-to-End-Durchsatz gegenüber FP32 auf der CPU.',
        },
      },
    ],
  },
  {
    role: {
      en: 'Student Assistant — Automobile Team',
      de: 'Studentische Hilfskraft — Automobile Team',
    },
    organization: 'OTH Amberg-Weiden',
    location: { en: 'Germany', de: 'Deutschland' },
    period: { en: 'Sep 2024 – Feb 2026', de: 'Sep. 2024 – Feb. 2026' },
    highlights: [
      {
        label: { en: 'Edge AI Infrastructure', de: 'Edge-AI-Infrastruktur' },
        text: {
          en: 'Configured and deployed NVIDIA Jetson AGX and Orin Nano platforms for real-time robotic perception; implemented ROS2 nodes bridging hardware GPIO with software daemons.',
          de: 'Konfiguration und Deployment von NVIDIA Jetson AGX und Orin Nano für Echtzeit-Robotik-Wahrnehmung; Entwicklung von ROS2-Nodes zur Anbindung von Hardware-GPIO an Software-Daemons.',
        },
      },
      {
        label: { en: 'Industrial Data Pipelines', de: 'Industrielle Datenpipelines' },
        text: {
          en: 'Developed automated processing pipelines for Ouster OS1 LiDAR reflectivity data with UDP packet and Region of Interest (ROI) filtering and material signal-strength analysis for automotive safety.',
          de: 'Entwicklung automatisierter Verarbeitungspipelines für Ouster OS1 LiDAR-Reflektivitätsdaten mit UDP-Paket- und ROI-Filterung sowie Material-Signalstärkeanalyse für die Fahrzeugsicherheit.',
        },
      },
      {
        label: { en: 'Distributed Communication', de: 'Verteilte Kommunikation' },
        text: {
          en: 'Engineered custom ROS2 message types for decentralized communication via LoRa and dual-band WiFi; monitored Quality of Service (QoS) to ensure data integrity in low-bandwidth environments.',
          de: 'Entwurf eigener ROS2-Nachrichtentypen für dezentrale Kommunikation über LoRa und Dual-Band-WLAN inkl. QoS-Überwachung zur Sicherstellung der Datenintegrität bei geringer Bandbreite.',
        },
      },
      {
        label: { en: 'Hardware Signaling', de: 'Hardware-Signalisierung' },
        text: {
          en: 'Designed a robotic “drop-off” mechanism using Jetson GPIO, controlled via background ROS2 topics and optimized for boot-ready execution.',
          de: 'Entwicklung eines robotischen „Drop-off“-Mechanismus über Jetson-GPIO, gesteuert über Hintergrund-ROS2-Topics und optimiert für den direkten Systemstart.',
        },
      },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: {
      en: 'Master of Science in Artificial Intelligence',
      de: 'Master of Science in Künstlicher Intelligenz',
    },
    institution: 'OTH Amberg-Weiden',
    location: { en: 'Germany', de: 'Deutschland' },
    period: { en: 'Mar 2024 – Dec 2026', de: 'März 2024 – Dez. 2026' },
    focus: {
      en: 'Key courses: Machine Learning (1.3), NLP (1.3), Computer Vision (1.3), Autonomous Robots (1.7).',
      de: 'Schwerpunktkurse: Machine Learning (1,3), NLP (1,3), Computer Vision (1,3), Autonome Roboter (1,7).',
    },
  },
  {
    degree: {
      en: 'Bachelor of Computer Science',
      de: 'Bachelor of Computer Science (Informatik)',
    },
    institution: "Xi'an University of Posts and Telecommunications",
    location: { en: 'China', de: 'China' },
    period: { en: 'Sep 2018 – Jul 2022', de: 'Sep. 2018 – Juli 2022' },
    focus: {
      en: 'Software engineering, algorithms, data structures, and computer systems.',
      de: 'Software Engineering, Algorithmen, Datenstrukturen und Rechnersysteme.',
    },
  },
];

export const INTERESTS = [
  {
    title: { en: 'Basketball', de: 'Basketball' },
    description: {
      en: 'Playing competitive basketball sharpens teamwork, communication, and quick decision-making under pressure.',
      de: 'Wettkampforientiertes Basketballspielen stärkt Teamarbeit, Kommunikation und schnelle Entscheidungen unter Druck.',
    },
  },
  {
    title: { en: 'Fitness & Gym', de: 'Fitness & Krafttraining' },
    description: {
      en: 'Consistent strength training maintains the focus, discipline, and resilience behind long-term engineering work.',
      de: 'Regelmäßiges Krafttraining fördert Fokus, Disziplin und Ausdauer für anspruchsvolle Entwicklungsprojekte.',
    },
  },
] as const;
