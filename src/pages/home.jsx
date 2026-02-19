import React, { useEffect, useMemo, useState } from "react";
import resume from "../assets/v resume.pdf";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import d1 from "../assets/dashboards/d1.png";
import d2 from "../assets/dashboards/d2.png";
import d3 from "../assets/dashboards/d3.png";
import d4 from "../assets/dashboards/d4.png";
import d5 from "../assets/dashboards/d5.png";
import d6 from "../assets/dashboards/d6.png";
import gemmaDbVideo from "../assets/gemma db.mp4";
import myselfImage from "../assets/myself.jpg";
import BlogCarousel from "../components/BlogCarousel";
import personalBiBattle from "../personal/BI battle 1st prize.png";
import personalHost1 from "../personal/host1.jpeg";
import personalHost2 from "../personal/host2.jpeg";
import personalLabx1 from "../personal/labx.png";
import personalLabx2 from "../personal/labx2.jpeg";
import personalLabx3 from "../personal/labx3.jpeg";
import personalNgl1 from "../personal/ngl1.png";
import personalNgl2 from "../personal/ngl2.png";
import personalTejas1 from "../personal/tejas 1.png";
import personalTejas2 from "../personal/Tejas 2.png";
import personalTejasAward from "../personal/tejas best project award.png";
import personalScAward from "../personal/sc award.png";
import personalV4g1 from "../personal/v4g1.jpeg";
import personalV4g2 from "../personal/v4g2.jpeg";
import personalV4g3 from "../personal/v4g3.jpeg";
import personalV4g4 from "../personal/v4g4.jpeg";
import personalV4g5 from "../personal/v4g5.jpeg";

const col = {
  ink: "#000000",
  ink2: "#101B38",
  card: "rgba(255,247,230,0.06)",
  border: "rgba(255,247,230,0.2)",
  txt: "#FFF7E6",
  txt2: "rgba(255,247,230,0.88)",
  txt3: "rgba(255,247,230,0.66)",
  a: "#5B88B2",
  ah: "#6D9AC4",
  as: "rgba(91,136,178,0.16)",
};

const NAVS = {
  professional: [
    { id: "work", l: "Work" },
    { id: "projects", l: "Projects" },
    { id: "dashboards", l: "Dashboards" },
    { id: "skills", l: "Skills" },
    { id: "education", l: "Education" },
    { id: "certifications", l: "Certifications" },
  ],
  personal: [
    { id: "personal-experience", l: "Experience" },
    { id: "events", l: "Events" },
    { id: "volunteering", l: "Volunteering" },
    { id: "blog", l: "Blog" },
  ],
};

const IDS = {
  professional: ["home", "work", "projects", "dashboards", "skills", "education", "certifications", "contact"],
  personal: ["home", "personal-experience", "events", "volunteering", "blog", "contact"],
};

const skills = {
  analytical: ["Risk Analysis", "SLA Monitoring (Study & Tracking)", "Control Monitoring", "Process Review", "Gap Identification", "KPI Design", "Documentation & Reporting"],
  technical: ["Python", "SQL", "Excel", "PowerPoint", "Power BI", "React"],
  business: ["Stakeholder Communication", "Requirement Gathering", "SOP Writing", "QA Oversight", "Time Management"],
};

const inferIssuer = (fileName) => {
  const n = fileName.toLowerCase();
  if (/\bdc\b|datacamp/.test(n)) return "DataCamp";
  if (/hp/.test(n)) return "HP LIFE";
  if (/open university/.test(n)) return "The Open University";
  if (/infosys|python/.test(n)) return "Infosys Springboard";
  if (/linkedin|certificateofcompletion|foundations/.test(n)) return "LinkedIn Learning";
  return "Certificate Provider";
};

const inferTitle = (fileName) => {
  const noExt = fileName.replace(/\.[^/.]+$/, "");
  const cleaned = noExt
    .replace(/certificateofcompletion[_\-\s]*/i, "")
    .replace(/\bdatacamp\b/gi, "")
    .replace(/\bdc\b/gi, "")
    .replace(/\s+/g, " ")
    .replace(/[_-]+/g, " ")
    .trim();
  const raw = cleaned
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return raw
    .replace(/\bSql\b/g, "SQL")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bPowerbi\b/g, "Power BI")
    .replace(/\bIntroduction To R\b/g, "Introduction to R")
    .replace(/\bIntroduction To Power BI\b/g, "Introduction to Power BI")
    .replace(/\bUnderstanding Artificial Intelligence\b/g, "Understanding Artificial Intelligence")
    .replace(/\bIntermediate Sql\b/g, "Intermediate SQL");
};

const certificatesCtx = require.context("../certificates", true, /\.(pdf|png|jpe?g)$/i);
const certifications = certificatesCtx
  .keys()
  .map((k) => {
    const name = k.replace("./", "");
    return {
      name: inferTitle(name),
      issuer: inferIssuer(name),
      url: certificatesCtx(k),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const education = [
  {
    degree: "MBA - Business Analytics",
    school: "Anurag University",
    period: "Expected Aug 2026",
    focus: "CGPA: 9.12 | Risk analytics, operations analytics, reporting, decision support",
  },
  {
    degree: "BSc - Biotechnology, Genetics & Chemistry",
    school: "Loyola Academy",
    period: "2021 - 2024",
    focus: "CGPA: 9.55 | Analytical thinking, scientific method, structured documentation",
  },
  {
    degree: "Intermediate",
    school: "Sri Gayathri Junior College",
    period: "2021",
    focus: "Marks: 970 / 1000",
  },
  {
    degree: "High School (10th)",
    school: "St Francis De Sales High School",
    period: "2019",
    focus: "GPA: 9.7",
  },
];

const works = [
  {
    id: "access",
    featured: true,
    r: "Project Consultant (Freelance)",
    c: "Access Healthcare International",
    ctx: "Client: Government of Odisha",
    d: "Dec 2025 - Present",
    b: [
      "Led EMS data analysis and quality review for accuracy, integrity, and benchmark alignment.",
      "Identified risk gaps through response-time, workflow delays, and SLA adherence patterns.",
      "Built control metrics for critical windows and high-risk geographies.",
      "Delivered dashboards and management reports for risk mitigation and quality improvement.",
    ],
    t: ["Python", "SQL", "Excel", "Controls", "SLA", "Healthcare Ops"],
  },
  {
    id: "neelima",
    r: "Business Analytics Intern / Project Contributor",
    c: "Neelima Hospitals",
    ctx: "Healthcare operations analytics",
    d: "Jan 2026 - Feb 2026",
    b: [
      "Built operations and quality dashboards for footfall, billing accuracy, and revenue trends.",
      "Defined KPIs for patient flow, billing controls, and service utilization.",
      "Supported requirements, documentation, and validation for usability and accuracy.",
    ],
    t: ["Excel", "SQL", "Power BI", "Documentation"],
  },
  {
    id: "tech",
    r: "Tech Support Intern",
    c: "Tech Mahindra - NGS",
    ctx: "AI initiative support",
    d: "Oct 2025 - Dec 2025",
    b: [
      "Studied AI process architecture and automation control points.",
      "Tested dependencies, installation, and runtime risks; documented fixes.",
      "Supported repeatability and stability checks in automated pipelines.",
    ],
    t: ["Python", "Debugging", "Documentation"],
  },
];

const projects = [
  {
    id: "gemma",
    t: "GEMMA - EMS Risk Analysis (2025)",
    o: "Built an AI-assisted EMS analytics system to surface SLA-risk patterns, operational delays, and district-level dispatch trends for faster decisions.",
    d: [
      "Integrated Gemma 7B Instruct with hybrid ML workflows for risk-oriented EMS analysis.",
      "Designed dashboard views for response-time KPIs, delay buckets, and geospatial incident patterns.",
      "Applied TF-IDF + K-means clustering on medical text to group repeat issue themes.",
    ],
    tags: ["EMS Analytics", "SLA Risk", "Gemma 7B", "K-Means", "Dashboards"],
    g: "https://github.com/varsh0613",
    cs: {
      p: "EMS operations had growing incident complexity, with response delays and uneven SLA adherence that were hard to monitor through manual reporting alone.",
      m: "Built a combined analytics workflow: delay segmentation, hourly/temporal trend analysis, district risk mapping, medical-text clustering, and interactive dashboards with natural-language query support.",
      ds: [
        "Domain: Emergency Medical Services (EMS) operations and dispatch workflows.",
        "Data scope: Incident timestamps, response-time components, location-level dispatch data, and medical incident text.",
        "Analytical views: Time-of-day trends, district/zone-level comparisons, SLA delay buckets, cluster-level issue themes.",
      ],
      st: ["Python", "Pandas", "TF-IDF", "K-Means", "Gemma 7B Instruct", "Dashboarding (React + BI visuals)"],
      q: "Validated timestamp consistency, checked SLA bucket logic, standardized operational fields, and reviewed missing/incomplete entries before deriving risk metrics.",
      i: [
        "Delay concentration was not uniform; specific time windows and locations repeatedly drove SLA breaches.",
        "Text-clustered incident categories exposed recurring operational bottlenecks beyond raw numeric trends.",
        "Interactive KPI and map views improved visibility for dispatch prioritization and escalation planning.",
        "Combining structured KPIs with text-derived clusters produced clearer operational narratives for stakeholders.",
      ],
      o: [
        "Produced a decision-ready dashboard layer with operational KPIs, geospatial risk views, and delay segmentation.",
        "Enabled faster identification of high-risk zones and critical time windows for intervention planning.",
        "Created a reusable framework for ongoing SLA-risk monitoring and weekly control reviews.",
      ],
      r: [
        "Prioritize resource planning for high-risk time/district combinations with recurring breach patterns.",
        "Use weekly SLA-control reviews tied to delay buckets and escalation thresholds.",
        "Expand quality checks and data standardization to improve risk-score reliability over time.",
        "Add advanced routing/resource-optimization logic to convert risk signals into direct dispatch actions.",
      ],
    },
  },
  {
    id: "credit",
    t: "Credit Risk Analysis (2025)",
    o: "Developed a borrower default-risk modeling workflow using demographic and financial behavior features to support safer lending decisions.",
    d: [
      "Analyzed 30,000 credit-card client records from the UCI Default of Credit Card Clients dataset.",
      "Engineered risk features such as credit-utilization ratio, payment consistency, late-payment counts, and bill-growth behavior.",
      "Compared model performance and finalized a gradient boosting (XGBoost) classifier for stronger nonlinear prediction.",
    ],
    tags: ["Credit Risk", "XGBoost", "AUC", "Feature Engineering", "Classification"],
    g: "https://github.com/varsh0613",
    cs: {
      p: "Lending workflows based on limited rule checks were missing behavior-level signals, causing avoidable misclassification risk in loan decisions.",
      m: "Performed EDA on demographic and repayment behavior segments, engineered default-sensitive features, and trained/evaluated classification models with ROC/AUC and confusion-matrix based validation.",
      ds: [
        "Dataset: UCI Default of Credit Card Clients (Taiwan), ~30,000 customer records.",
        "Core variables: Credit limit, bill amounts, repayment status history, payment amounts, demographic attributes.",
        "Target: Binary default indicator for next-cycle default-risk prediction.",
      ],
      st: ["Python", "Pandas", "Scikit-learn", "XGBoost", "EDA", "Classification Evaluation"],
      q: "Ran data cleaning and encoding checks, reviewed leakage risk, monitored class behavior, and validated model quality through classification report, confusion matrix, and ROC-AUC (~0.79).",
      i: [
        "Repayment history, utilization patterns, and payment consistency emerged as top default predictors.",
        "Default patterns varied across education and marital segments, supporting segment-wise risk communication.",
        "AUC near 0.79 showed meaningful separation power for practical risk-tiering use cases.",
        "Behavioral features outperformed simple static attributes when distinguishing low-vs-high default risk.",
      ],
      o: [
        "Delivered a model-backed risk-tiering framework suitable for pre-screening and review workflows.",
        "Created interpretive visuals showing demographic, repayment, and trend-level risk behavior.",
        "Provided an evaluation baseline that can be extended into monitored production scoring pipelines.",
      ],
      r: [
        "Use calibrated cutoffs for approve/review/reject bands rather than a single hard threshold.",
        "Track monthly drift in payment behavior features and refresh model monitoring dashboards.",
        "Add policy-level guardrails so predictive scores support, not replace, credit governance checks.",
        "Introduce periodic challenger-model comparison to retain predictive quality over changing portfolios.",
      ],
    },
  },
  {
    id: "chemo",
    t: "Chemotherapy Survival Analysis (2025)",
    o: "Evaluated treatment and survival patterns in oncology data to identify clinical risk signals and support evidence-based care planning.",
    d: [
      "Studied patient-level factors including age, tumor size, mutation status, chemotherapy regimen, and tumor response.",
      "Used statistical analysis and Kaplan-Meier survival views to compare outcome behavior across groups.",
      "Trained a Random Forest model to estimate overall survival months and built dashboard-ready outputs for interpretation.",
    ],
    tags: ["Healthcare Analytics", "Survival Analysis", "Kaplan-Meier", "Random Forest", "Power BI"],
    g: "https://github.com/varsh0613",
    cs: {
      p: "Clinical teams needed clearer visibility into which treatment and tumor factors were most associated with survival variation across cancer cohorts.",
      m: "Combined statistical profiling, treatment-response comparisons, and survival-curve analysis with a Random Forest prediction model for overall survival months.",
      ds: [
        "Domain: Oncology treatment and outcome analytics for comparative survival understanding.",
        "Key factors analyzed: Age, tumor size, mutation status, chemotherapy regimen, tumor response, and cohort splits.",
        "Outputs: Survival-focused visuals, risk-comparison views, and model-based survival-month estimates.",
      ],
      st: ["Python", "Pandas", "Kaplan-Meier", "Random Forest", "Model Error Metrics", "Power BI"],
      q: "Reviewed data consistency for treatment/outcome fields, validated feature selection logic, and checked model output quality using MAE, R-squared, and RMSE based evaluation.",
      i: [
        "Survival outcomes showed strong variation by mutation profile, tumor characteristics, and treatment response patterns.",
        "Kaplan-Meier views made risk separation across cohorts easier to communicate to non-technical stakeholders.",
        "Model and dashboard outputs together supported both exploratory and decision-facing interpretation.",
        "Treatment-regimen and response segments provided practical structure for cohort-level review discussions.",
      ],
      o: [
        "Delivered an analytics narrative linking clinical factors to survival trends in a structured, visual format.",
        "Improved interpretability for mixed audiences by combining statistical survival curves with model outputs.",
        "Established groundwork for periodic oncology outcome tracking using repeatable metrics and dashboards.",
      ],
      r: [
        "Use risk-bucket dashboards for treatment review discussions and follow-up planning.",
        "Extend the model with additional clinical history variables to improve survival estimation robustness.",
        "Operationalize a recurring analytics pipeline for periodic oncology outcome monitoring.",
        "Add subgroup fairness and data-completeness checks before scaling the model for wider clinical use.",
      ],
    },
  },
];

const dashboards = [
  { id: "d1", type: "image", src: d1, title: "Patient Demographics", tool: "Power BI" },
  { id: "d2", type: "image", src: d2, title: "Treatment & Dosage", tool: "Power BI" },
  { id: "d3", type: "image", src: d3, title: "Risk Analysis", tool: "Power BI" },
  { id: "d4", type: "image", src: d4, title: "Critical Window Monitoring", tool: "Power BI" },
  { id: "d5", type: "image", src: d5, title: "Tumor Analysis", tool: "Power BI" },
  { id: "d6", type: "image", src: d6, title: "Survival & Outcome", tool: "Power BI" },
  { id: "gemma-video", type: "video", src: gemmaDbVideo, title: "GEMMA Dashboard Walkthrough", tool: "React" },
];

const personalExperiences = [
  {
    title: "Tutoring and Academic Mentoring",
    org: "Independent",
    period: "Part-time",
    points: [
      "Tutored school students up to 8th grade with structured study plans and weekly progress tracking.",
      "Simplified complex topics into clear, practical learning modules to improve understanding and confidence.",
      "Guided learners on exam strategy, consistency, and communication skills alongside academics.",
    ],
    images: [],
  },
  {
    title: "Content Writing Intern",
    org: "Aadox Writing Company",
    period: "Internship",
    points: [
      "Created clear, audience-focused content for promotional and informational use cases.",
      "Worked on structure, tone, and readability to align writing with brand voice and engagement goals.",
      "Coordinated revisions and delivered content assets with quality and deadline consistency.",
    ],
    images: [],
  },
  {
    title: "Brand Design and Positioning Gig - Indah Drapes",
    org: "Freelance Creative Project",
    period: "Project-based",
    points: [
      "Designed a brand logo for Indah Drapes aligned to the business tone and visual identity goals.",
      "Prepared a promotional brand-positioning pitch with tagline direction and messaging concepts.",
      "Supported early-stage branding decisions through creative + communication-focused recommendations.",
    ],
    images: [],
  },
];

const personalEvents = [
  {
    title: "Student Council - Documentation Head Award",
    detail: "At Loyola Academy, served as Student Council Documentation Head and received recognition for documentation quality, event records, and execution support.",
    images: [personalScAward],
  },
  {
    title: "BI Battle - First Prize",
    detail: "Won first prize in BI Battle for analytical problem solving, insight presentation, and business communication.",
    images: [personalBiBattle],
  },
  {
    title: "LABX - International Biotechnology Innovation Conference",
    detail: "Organized and coordinated LABX, an international conference focused on biotechnology innovation, with support across planning, coordination, and execution tracks.",
    images: [personalLabx1, personalLabx2, personalLabx3],
  },
  {
    title: "MBA Event Hosting and Public Speaking",
    detail: "At Anurag University, hosted and spoke at multiple events including orientation programs, induction sessions, and fresher-day events, managing both stage flow and audience engagement.",
    images: [personalHost1, personalHost2],
  },
  {
    title: "mgmt.exe Club Lead and NGL Podcast",
    detail: "Leading the mgmt.exe social media club and driving the podcast series NGL - Where Nothing Gets Left, including planning, content flow, and episode coordination.",
    images: [personalNgl1, personalNgl2],
  },
  {
    title: "Best Project Award - Tejas Expo (SmartBin Go)",
    detail: "Received Best Project Award for SmartBin Go: an AI-powered waste classification and segregation system that runs on solar power, stores cloud-synced classification data, and uses reinforcement learning to improve sorting over time.",
    images: [personalTejasAward, personalTejas1, personalTejas2],
  },
];

const volunteering = [
  {
    title: "Camp Counsellor Internship - Voice 4 Girls",
    detail: "Worked with marginalized adolescent girls on physical and mental health education, including menstruation awareness, confidence building, career direction, and practical life lessons. NGO photos can be added here as you upload them.",
    images: [personalV4g1, personalV4g2, personalV4g3, personalV4g4, personalV4g5],
  },
];

export default function Home() {
  const [mode, setMode] = useState("professional");
  const [active, setActive] = useState("home");
  const [p, setP] = useState(0);
  const [top, setTop] = useState(false);
  const [sc, setSc] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const [dashId, setDashId] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [comment, setComment] = useState("");

  const cs = useMemo(() => projects.find((x) => x.id === caseId) || null, [caseId]);
  const selectedDash = useMemo(() => dashboards.find((x) => x.id === dashId) || null, [dashId]);
  const currentNav = useMemo(() => NAVS[mode], [mode]);
  const currentIds = useMemo(() => IDS[mode], [mode]);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      const d = document.documentElement;
      const t = d.scrollHeight - d.clientHeight;
      setP(t > 0 ? (y / t) * 100 : 0);
      setTop(y > 600);
      setSc(y > 30);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
    );
    currentIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
  }, [currentIds]);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
  };

  const send = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setToastMsg("Comment submitted.");
    setComment("");
    setTimeout(() => setToastMsg(""), 2200);
  };

  return (
    <div style={{ background: mode === "professional" ? "#000000" : "#122C4F", color: col.txt, minHeight: "100vh" }}>
      <style>{`
        *{box-sizing:border-box}
        .r{font-family:Cambria,Georgia,"Times New Roman",serif;position:relative;overflow:hidden;isolation:isolate;background:${col.ink};transition:background .28s ease}
        .r:before{content:none}
        .r:after{content:none}
        .r.professional{background:#000000}
        .r.personal{background:#122C4F}
        .r.personal:before{content:none}
        .r.personal:after{content:none}
        .s{max-width:1120px;margin:0 auto;padding:0 24px}
        @media(min-width:960px){.s{padding:0 48px}}
        section{padding:92px 0}
        @media(max-width:960px){section{padding:64px 0}}
        .r.personal section{padding:56px 0}
        @media(max-width:960px){.r.personal section{padding:40px 0}}
        .r.personal #home{padding-bottom:42px}
        .r.personal #personal-experience{padding-top:42px}
        .skip{position:absolute;left:12px;top:-48px;background:${col.a};color:#0A122A;padding:8px 12px;border-radius:10px;text-decoration:none;z-index:1100;transition:top .18s;font-weight:700}
        .skip:focus{top:12px;outline:none;box-shadow:0 0 0 6px rgba(255,247,230,.2)}
        .bar{position:fixed;top:0;left:0;height:2px;background:${col.a};z-index:1200}
        .nw{position:sticky;top:0;z-index:1000;border-bottom:1px solid transparent;transition:.2s}
        .nw.sc{background:rgba(0,0,0,.9);border-bottom-color:${col.border};backdrop-filter:blur(12px)}
        .r.personal .nw.sc{background:rgba(18,44,79,.88);border-bottom-color:rgba(91,136,178,.45)}
        .n{min-height:84px;padding:8px 0;display:flex;align-items:center;justify-content:flex-start;gap:14px}
        .head-left{display:flex;align-items:center;gap:8px;margin-left:78px}
        .brand-block{display:grid;gap:2px;min-width:0;max-width:none}
        .bt{font-family:Cambria,Georgia,"Times New Roman",serif;font-size:22px;font-weight:700;letter-spacing:0;line-height:1.08;min-height:26px}
        .bs{font-size:13px;color:${col.txt3};line-height:1.25;min-height:34px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .ln{display:none;gap:16px;margin-left:24px}
        @media(min-width:980px){.ln{display:flex}}
        .head-right{display:flex;align-items:center;gap:10px;margin-left:auto}
        @media(max-width:760px){
          .n{align-items:flex-start}
          .head-left{flex-direction:column;align-items:flex-start;gap:8px}
          .brand-block{min-width:0;max-width:none}
        }
        .mode-switch{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;min-width:232px;background:rgba(255,247,230,.06);border:1px solid rgba(91,136,178,.55);border-radius:999px;padding:4px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,247,230,.06),0 8px 18px rgba(0,0,0,.2)}
        .mode-thumb{position:absolute;top:4px;left:4px;height:calc(100% - 8px);width:calc(50% - 4px);border-radius:999px;background:linear-gradient(135deg,${col.a},#48779d);transition:transform .34s cubic-bezier(.22,.61,.36,1),background-color .28s ease;will-change:transform;pointer-events:none;transform:translate3d(0,0,0)}
        .mode-switch.personal .mode-thumb{transform:translate3d(100%,0,0);background:#000000}
        .mode-btn{position:relative;z-index:2;border:0;background:transparent;color:${col.txt3};padding:8px 12px;border-radius:999px;font-size:12px;letter-spacing:.02em;cursor:pointer;text-align:center}
        .mode-btn.active{color:${col.txt};font-weight:700}
        .mode-btn:hover{color:${col.txt}}
        @media(max-width:760px){
          .mode-switch{min-width:208px}
        }
        .nb{border:0;background:transparent;color:${col.txt2};font-size:15px;padding:8px 0;cursor:pointer;border-bottom:1px solid transparent}
        .nb:hover,.nb.a{color:${col.txt};border-bottom-color:${col.a}}
        .b{border-radius:14px;padding:10px 14px;font-size:14px;letter-spacing:0;text-decoration:none;border:1px solid ${col.border};color:${col.txt};background:transparent;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
        .b:hover,.b:focus-visible{border-color:${col.a};box-shadow:0 0 0 6px rgba(255,247,230,.16);outline:none}
        .ba{background:${col.a};border-color:${col.a};color:${col.txt};font-weight:700}
        .ba:hover{background:${col.ah};border-color:${col.ah}}
        .bo{border-color:rgba(91,136,178,.7)}

        .hero-shell{position:relative;border:1px solid ${col.border};background:rgba(255,247,230,.08);border-radius:28px;padding:24px;box-shadow:0 22px 58px rgba(6,8,16,.34)}
        .r.personal .hero-shell{
          background:rgba(255,247,230,.12);
          border-color:rgba(91,136,178,.5);
          box-shadow:0 14px 36px rgba(8,12,24,.18);
          display:grid;
          grid-template-columns:1fr auto;
          column-gap:24px;
          align-items:start;
          padding-right:28px;
        }
        .mode-avatar{position:absolute;right:28px;top:24px;width:170px;height:170px;border-radius:999px;overflow:hidden;border:2px solid rgba(91,136,178,.65);box-shadow:0 12px 28px rgba(0,0,0,.24);background:rgba(255,247,230,.12);display:grid;place-items:center}
        .mode-avatar img{width:100%;height:100%;object-fit:cover}
        .r.personal .h{grid-column:1}
        .r.personal .mode-avatar{position:static;right:auto;top:auto;grid-column:2;grid-row:1;place-self:start end}
        @media(max-width:980px){
          .hero-shell{padding-right:28px}
          .r.personal .hero-shell{grid-template-columns:1fr;row-gap:14px}
          .mode-avatar{position:static;margin-top:14px;width:140px;height:140px}
          .r.personal .h{grid-column:1}
          .r.personal .mode-avatar{grid-column:1;grid-row:1;margin-top:0;justify-self:end;align-self:start}
        }
        .hero-kicker{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:rgba(240,231,213,.09);border:1px solid ${col.border};font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${col.txt2};font-weight:700}
        .h{margin-top:16px;display:grid;grid-template-columns:1fr;gap:24px}
        .h1{font-family:Cambria,Georgia,"Times New Roman",serif;font-size:clamp(40px,6.7vw,62px);line-height:1.06;margin:10px 0 0;letter-spacing:0}
        .h2{margin:10px 0 0;font-size:24px;line-height:1.2;color:${col.txt2};font-family:Cambria,Georgia,"Times New Roman",serif}
        .lead{margin:16px 0 0;color:${col.txt2};line-height:1.68;font-size:18px;max-width:64ch}
        .personal-note{margin-top:14px;padding:12px 14px;border-radius:14px;background:rgba(91,136,178,.16);border:1px solid rgba(91,136,178,.45);color:${col.txt2};max-width:62ch}
        .chips{margin-top:20px;display:flex;flex-wrap:wrap;gap:10px}
        .chip{font-size:14px;padding:8px 11px;border-radius:999px;border:1px solid ${col.border};color:${col.txt2};background:rgba(240,231,213,.05)}
        .cta{margin-top:22px;display:flex;gap:12px;flex-wrap:wrap}
        .sla-box{margin-top:16px;padding:12px 14px;border:1px solid rgba(91,136,178,.45);background:rgba(91,136,178,.12);border-radius:14px}
        .sla-box strong{display:block;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:${col.a};margin-bottom:4px}
        .sla-box p{margin:0;color:${col.txt2};line-height:1.56;font-size:17px}
        .socbtn{position:relative;display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(91,136,178,.5);border-radius:14px;padding:11px 16px;color:${col.txt};text-decoration:none;background:rgba(91,136,178,.16);font-weight:700;font-size:16px;letter-spacing:0;box-shadow:0 10px 24px rgba(0,0,0,.18);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease}
        .socbtn img{width:16px;height:16px;filter:brightness(0) invert(1);opacity:1}
        .socbtn:hover{transform:translateY(-2px);border-color:${col.a};background:rgba(91,136,178,.24);box-shadow:0 14px 30px rgba(0,0,0,.24)}
        .socbtn:focus-visible{outline:none;box-shadow:0 0 0 5px rgba(91,136,178,.22),0 14px 30px rgba(0,0,0,.24)}

        .t{margin:0 0 16px;font-family:Cambria,Georgia,"Times New Roman",serif;font-size:clamp(30px,4.2vw,38px);line-height:1.15;letter-spacing:0}
        .timeline{position:relative;padding-left:26px;display:grid;gap:16px}
        .timeline:before{content:"";position:absolute;left:8px;top:0;bottom:0;width:1px;background:rgba(91,136,178,.6)}
        .w{position:relative;background:${col.card};border:1px solid ${col.border};border-radius:20px;padding:20px 20px 18px}
        .r.personal .w,.r.personal .pr,.r.personal .skill-card,.r.personal .edu,.r.personal .cert,.r.personal .personal-card,.r.personal .pn{background:rgba(240,231,213,.06);border-color:rgba(240,231,213,.2)}
        .w:before{content:"";position:absolute;left:-22px;top:24px;width:10px;height:10px;border-radius:50%;background:${col.a}}
        .w:hover{border-color:rgba(91,136,178,.48)}
        .w.featured{border-color:rgba(91,136,178,.72);box-shadow:0 0 0 1px rgba(91,136,178,.3),0 18px 40px rgba(0,0,0,.16)}
        .flag{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:rgba(91,136,178,.16);border:1px solid rgba(91,136,178,.55);color:${col.txt};font-size:13px;font-weight:500;margin-bottom:12px}
        .flag.sla{margin-left:8px;background:rgba(240,231,213,.1);border-color:${col.border}}
        .wh{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:start}
        .wco{margin:0;color:${col.a};font-weight:700;font-size:23px}
        .wr{margin:2px 0 0;font-size:19px;line-height:1.2;font-family:Cambria,Georgia,"Times New Roman",serif;color:${col.txt}}
        .wd{margin:0;display:inline-flex;width:max-content;padding:4px 9px;border-radius:999px;background:rgba(240,231,213,.08);border:1px solid ${col.border};color:${col.txt3};font-size:12px}
        .wx{margin:2px 0 10px;color:${col.txt3};font-size:14px}
        .ls{margin:0;padding-left:20px;color:${col.txt2};line-height:1.7;font-size:16px}
        .ls li{margin-bottom:8px}
        .w .chips{margin-top:12px}
        .w .chip{font-size:12px;padding:7px 10px}

        .pg{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
        @media(max-width:900px){.pg{grid-template-columns:1fr}}
        .pr{background:${col.card};border:1px solid ${col.border};border-radius:18px;padding:18px}
        .pr:hover{border-color:rgba(91,136,178,.48)}

        .dash-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        @media(max-width:980px){.dash-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:680px){.dash-grid{grid-template-columns:1fr}}
        .dash{position:relative;overflow:hidden;border-radius:16px;border:1px solid ${col.border};background:${col.card};cursor:pointer}
        .dash img,.dash video{width:100%;height:220px;object-fit:cover;display:block;transition:transform .35s ease}
        .dash:hover img,.dash:hover video{transform:scale(1.03)}
        .dash-overlay{position:absolute;left:10px;right:10px;bottom:10px;display:flex;align-items:center;gap:10px}
        .dash-title{padding:7px 10px;border-radius:10px;background:rgba(12,16,28,.86);border:1px solid rgba(240,231,213,.34);font-size:12px;line-height:1.3;flex:1;min-width:0}
        .dash-tag{padding:7px 10px;border-radius:10px;background:rgba(12,16,28,.86);border:1px solid rgba(91,136,178,.7);font-size:11px;font-weight:600;color:${col.txt};letter-spacing:.01em;white-space:nowrap;line-height:1.2}
        .dash-note{margin:-6px 0 14px;color:${col.txt3};font-size:12px;letter-spacing:.02em}
        .media-lg{width:100%;max-height:66vh;object-fit:contain;border-radius:12px;border:1px solid ${col.border};background:#131a2c}

        .skill-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        @media(max-width:980px){.skill-grid{grid-template-columns:1fr}}
        .skill-card{background:${col.card};border:1px solid ${col.border};border-radius:18px;padding:18px}
        .skill-card h3{margin:0 0 12px;font-family:Cambria,Georgia,"Times New Roman",serif;font-size:24px}
        .pillwrap{display:flex;flex-wrap:wrap;gap:10px}
        .pill{font-size:12px;padding:8px 10px;border-radius:999px;border:1px solid ${col.border};background:rgba(240,231,213,.06);color:${col.txt2}}
        .personal-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
        @media(max-width:980px){.personal-grid{grid-template-columns:1fr}}
        .personal-card{background:rgba(255,247,230,.1);border:1px solid rgba(91,136,178,.45);border-radius:18px;padding:18px}
        .personal-card h3{margin:0 0 6px;font-size:22px}
        .personal-card .meta{margin:0 0 10px;color:#8FB1D0;font-size:14px}
        .blog-intro{font-size:18px !important;line-height:1.7;color:${col.txt2} !important;margin-bottom:14px !important}
        .personal-media{margin-top:14px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
        @media(max-width:980px){.personal-media{grid-template-columns:repeat(2,minmax(0,1fr))}}
        .personal-media img{width:100%;height:150px;object-fit:cover;border-radius:12px;border:1px solid rgba(240,231,213,.22);background:rgba(10,18,42,.2)}
        .ngo-card{grid-column:1/-1}
        .ngo-media{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;max-width:860px}
        .ngo-media img{height:145px;aspect-ratio:auto}
        @media(max-width:980px){.ngo-media{grid-template-columns:repeat(2,minmax(0,1fr));max-width:100%}}
        @media(max-width:760px){.ngo-media{grid-template-columns:1fr}}
        .personal-empty{margin-top:12px;padding:10px 12px;border:1px dashed rgba(91,136,178,.55);border-radius:12px;color:${col.txt3};font-size:14px}
        .edu-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
        @media(max-width:980px){.edu-grid{grid-template-columns:1fr}}
        .edu{background:rgba(255,247,230,.08);border:1px solid ${col.border};border-radius:16px;padding:16px}
        .edu h3{margin:0 0 6px;font-size:19px;color:${col.txt}}
        .edu .meta{margin:0;color:${col.a};font-weight:700}
        .edu .muted{margin:6px 0 10px;color:${col.txt2};font-size:12px;display:inline-flex;padding:4px 9px;border-radius:999px;background:rgba(240,231,213,.08);border:1px solid ${col.border}}
        .edu .focus{margin:0;color:${col.txt2}}

        .cert-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
        @media(max-width:980px){.cert-grid{grid-template-columns:1fr}}
        .cert{background:${col.card};border:1px solid ${col.border};border-radius:16px;padding:16px;display:grid;gap:8px}
        .cert h3{margin:0;font-size:18px;line-height:1.3}
        .issuer{display:inline-flex;width:max-content;padding:4px 8px;border-radius:999px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:${col.a};border:1px solid rgba(91,136,178,.5);background:rgba(91,136,178,.12)}
        .cert .b{width:max-content;margin-top:4px}

        .ct{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        @media(max-width:980px){.ct{grid-template-columns:1fr}}
        .pn{background:${col.card};border:1px solid ${col.border};border-radius:18px;padding:18px}
        .contact-title{margin:0 0 14px;text-align:center;line-height:1;font-family:Cambria,Georgia,"Times New Roman",serif}
        .contact-title-main{display:block;font-size:54px;font-weight:700;color:${col.txt};letter-spacing:.01em}
        .contact-title-sub{display:block;margin-top:4px;font-size:28px;font-weight:500;color:rgba(173,198,222,.92)}
        @media(max-width:980px){
          .contact-title-main{font-size:46px}
          .contact-title-sub{font-size:24px}
        }
        .comment-row{display:flex;gap:10px;align-items:stretch;flex-direction:column}
        .comment-row .in{flex:1}
        .comment-row .b{width:100%;justify-content:center}
        .copy{display:inline-flex;align-items:center;gap:8px;border:1px solid ${col.border};border-radius:999px;padding:10px 14px;background:rgba(240,231,213,.05);color:${col.txt};cursor:pointer;transition:border-color .18s ease,background .18s ease,transform .18s ease}
        .copy:hover{border-color:${col.a};background:${col.as};transform:translateY(-1px)}
        .copy-msg{margin-left:10px;font-size:12px;color:${col.a};font-weight:700}
        .in,.ta{width:100%;background:${col.card};color:${col.txt};border:1px solid ${col.border};border-radius:14px;padding:11px 12px;font:inherit}
        .ta{min-height:110px;resize:vertical}
        .in:focus-visible,.ta:focus-visible{outline:none;border-color:${col.a};box-shadow:0 0 0 6px rgba(91,136,178,.2)}

        .ft{border-top:1px solid rgba(255,255,255,.08);padding:22px 0 34px;margin-top:22px}
        .fr{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;color:${col.txt3};font-size:13px}

        .dots{position:fixed;left:16px;top:50%;transform:translateY(-50%);display:none;flex-direction:column;gap:10px;z-index:700}
        @media(min-width:1200px){.dots{display:flex}}
        .dot{width:8px;height:8px;border-radius:999px;border:1px solid rgba(255,255,255,.3);background:transparent;cursor:pointer}
        .dot.a{background:${col.a};border-color:${col.a}}

        .md{position:fixed;inset:0;background:rgba(11,18,32,.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;z-index:1300}
        .mc{width:min(860px,100%);max-height:85vh;overflow:auto;background:${col.ink2};border:1px solid ${col.border};border-radius:18px;padding:18px}
        .ts{position:fixed;right:18px;bottom:18px;padding:12px 14px;border-radius:12px;background:${col.a};color:${col.txt};z-index:1400;font-weight:700}
        .tb{position:fixed;right:16px;bottom:16px;z-index:900}
        .mode-pane{animation:modeFade .28s ease}
        @keyframes modeFade{from{opacity:.2;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div className={`r ${mode}`}>
        <a className="skip" href="#main">Skip to content</a>
        <div className="bar" style={{ width: `${p}%` }} />

        <div className={`nw${sc ? " sc" : ""}`}>
          <div className="s n">
            <div className="head-left">
              <div className="brand-block">
                <div className="bt">{mode === "professional" ? "Portfolio" : "Picky Yapper"}</div>
                <div className="bs">
                  {mode === "professional" ? "Business Analyst | Risk Analysis" : "My20's | stories & restarts"}
                </div>
              </div>
              <div className={`mode-switch ${mode}`} role="tablist" aria-label="Profile mode">
                <span className="mode-thumb" aria-hidden="true" />
                <button className={`mode-btn${mode === "professional" ? " active" : ""}`} onClick={() => setMode("professional")}>Professional</button>
                <button className={`mode-btn${mode === "personal" ? " active" : ""}`} onClick={() => setMode("personal")}>Personal</button>
              </div>
            </div>
            <nav className="ln" aria-label="Primary">
              {currentNav.map((i) => (
                <button key={i.id} className={`nb${active === i.id ? " a" : ""}`} onClick={() => go(i.id)}>
                  {i.l}
                </button>
              ))}
            </nav>
            <div className="head-right">
              <button className="b ba" onClick={() => go("contact")}>Contact</button>
            </div>
          </div>
        </div>

        <div className="dots" aria-hidden="true">
          {currentIds.map((id) => (
            <button key={id} className={`dot${active === id ? " a" : ""}`} onClick={() => go(id)} />
          ))}
        </div>

        <main id="main" className="s">
          <section id="home">
            <div className="hero-shell">
              {mode === "professional" && <span className="hero-kicker">Risk, quality, and controls</span>}
              {mode === "personal" && (
                <div className="mode-avatar">
                  <img src={myselfImage} alt="Varshitha" />
                </div>
              )}
              <div className="h">
                <div>
                  <h1 className="h1">Varshitha Sirigiri</h1>
                  <p className="h2">{mode === "professional" ? "Business Analyst | Risk Analysis in Operations & Finance | Healthcare" : "Campus Leadership, Creative Work, and Social Impact"}</p>
                  <p className="lead">
                    {mode === "professional"
                      ? "MBA Business Analytics candidate with hands-on experience in risk analysis for operations and finance, mostly across healthcare workflows, with controls-focused reporting, SOP documentation, dashboards, and SLA monitoring studies."
                      : "People-first learner and leader who enjoys mentoring, speaking, writing, and building ideas that blend creativity with impact, from campus initiatives to social work and storytelling."}
                  </p>
                  {mode === "personal" && (
                    <div className="personal-note">
                      Personal mode highlights communication, leadership, mentoring, and social-impact work across academics, events, and community engagement.
                    </div>
                  )}
                  {mode === "personal" && <div className="cta">
                    <button className="b" onClick={() => go("blog")}>Read My Blog</button>
                  </div>}
                  {mode === "professional" && <div className="sla-box">
                    <strong>SLA Monitoring Focus</strong>
                    <p>Experience-first profile with response-time compliance studies, delay-window analysis, and service-level adherence monitoring to surface operational risks early.</p>
                  </div>}
                  {mode === "professional" && <div className="cta" style={{ marginTop: 12 }}>
                    <a className="socbtn" href="https://www.linkedin.com/in/s-varshitha-8962a6229/" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} alt="LinkedIn"/>LinkedIn</a>
                    <a className="socbtn" href="https://github.com/varsh0613" target="_blank" rel="noopener noreferrer"><img src={githubIcon} alt="GitHub"/>GitHub</a>
                    <a className="socbtn" href={resume} download="Varshitha_Resume.pdf">Download CV</a>
                  </div>}
                </div>
              </div>
            </div>
          </section>

          <div key={mode} className="mode-pane">
          {mode === "professional" && <section id="work">
            <h2 className="t">Work Experience</h2>
            <div className="timeline">
              {works.map((w) => (
                <article key={w.id} className={`w${w.featured ? " featured" : ""}`}>
                  {w.featured && <><span className="flag">Flagship Govt Project</span><span className="flag sla">SLA Monitoring Study</span></>}
                  <div className="wh">
                    <div>
                      <p className="wco">{w.c}</p>
                      <h3 className="wr">{w.r}</h3>
                      <p className="wx">{w.ctx}</p>
                    </div>
                    <p className="wd">{w.d}</p>
                  </div>
                  <ul className="ls">{w.b.map((x) => <li key={x}>{x}</li>)}</ul>
                  <div className="chips" style={{ marginTop: 12 }}>{w.t.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
                </article>
              ))}
            </div>
          </section>}

          {mode === "professional" && <section id="projects">
            <h2 className="t">Projects</h2>
            <div className="pg">
              {projects.map((pr) => (
                <article key={pr.id} className="pr">
                  <h3 style={{ margin: "0 0 8px", fontSize: 19, fontFamily: "\"Segoe UI\",Inter,Roboto,Arial,sans-serif" }}>{pr.t}</h3>
                  <p style={{ margin: "0 0 10px", color: col.txt2, fontSize: 15 }}>{pr.o}</p>
                  <ul className="ls" style={{ margin: "0 0 12px" }}>{pr.d.map((x) => <li key={x}>{x}</li>)}</ul>
                  <div className="chips">{pr.tags.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
                  <div className="cta" style={{ marginTop: 12 }}><button className="b ba" onClick={() => setCaseId(pr.id)}>Case Study</button></div>
                </article>
              ))}
              <article
                className="pr"
                style={{
                  borderColor: "rgba(91,136,178,.88)",
                  boxShadow: "0 0 0 1px rgba(91,136,178,.36), 0 16px 30px rgba(0,0,0,.2)",
                  background: "linear-gradient(180deg, rgba(91,136,178,.14), rgba(255,247,230,.05))",
                  display: "grid",
                  placeItems: "center",
                  minHeight: 230,
                  textAlign: "center",
                }}
              >
                <h3 style={{ margin: 0, fontSize: 28, color: col.txt, fontFamily: "Cambria,Georgia,\"Times New Roman\",serif" }}>
                  Major Project Coming Soon
                </h3>
              </article>
            </div>
          </section>}

          {mode === "professional" && <section id="dashboards">
            <h2 className="t">Dashboards</h2>
            <p className="dash-note">Click any dashboard to expand.</p>
            <div className="dash-grid">
              {dashboards.map((d) => (
                <article key={d.id} className="dash" onClick={() => setDashId(d.id)}>
                  {d.type === "video" ? (
                    <video src={d.src} muted loop playsInline preload="metadata" />
                  ) : (
                    <img src={d.src} alt={d.title} />
                  )}
                  <div className="dash-overlay">
                    <span className="dash-title">{d.title}</span>
                    <span className="dash-tag">{d.tool}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>}

          {mode === "professional" && <section id="skills">
            <h2 className="t">Skills</h2>
            <div className="skill-grid">
              <article className="skill-card">
                <h3>Analytical & QA</h3>
                <div className="pillwrap">{skills.analytical.map((x) => <span key={x} className="pill">{x}</span>)}</div>
              </article>
              <article className="skill-card">
                <h3>Technical Stack</h3>
                <div className="pillwrap">{skills.technical.map((x) => <span key={x} className="pill">{x}</span>)}</div>
              </article>
              <article className="skill-card">
                <h3>Business & Delivery</h3>
                <div className="pillwrap">{skills.business.map((x) => <span key={x} className="pill">{x}</span>)}</div>
              </article>
            </div>
          </section>}

          {mode === "professional" && <section id="education">
            <h2 className="t">Education</h2>
            <div className="edu-grid">
              {education.map((e) => (
                <article className="edu" key={e.degree}>
                  <h3>{e.degree}</h3>
                  <p className="meta">{e.school}</p>
                  <p className="muted">{e.period}</p>
                  <p className="focus">{e.focus}</p>
                </article>
              ))}
            </div>
          </section>}

          {mode === "professional" && <section id="certifications">
            <h2 className="t">Certifications</h2>
            <div className="cert-grid">
              {certifications.map((c) => (
                <article className="cert" key={c.name}>
                  <span className="issuer">{c.issuer}</span>
                  <h3>{c.name}</h3>
                  {c.url ? (
                    <a className="b" href={c.url} target="_blank" rel="noopener noreferrer">View Certificate</a>
                  ) : (
                    <button className="b" type="button" disabled title="Upload pending">View Certificate</button>
                  )}
                </article>
              ))}
            </div>
          </section>}

          {mode === "personal" && <>
            <section id="personal-experience">
              <h2 className="t">Personal Experience</h2>
              <div className="personal-grid">
                {personalExperiences.map((item) => (
                  <article key={item.title} className="personal-card">
                    <h3>{item.title}</h3>
                    <p className="meta">{item.org} | {item.period}</p>
                    <ul className="ls">{item.points.map((pnt) => <li key={pnt}>{pnt}</li>)}</ul>
                    {Array.isArray(item.images) && item.images.length > 0 ? (
                      <div className="personal-media">
                        {item.images.map((img, idx) => <img key={`${item.title}-${idx}`} src={img} alt={`${item.title} ${idx + 1}`} />)}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section id="events">
              <h2 className="t">Highlights of College Life</h2>
              <div className="personal-grid">
                {personalEvents.map((item) => (
                  <article key={item.title} className="personal-card">
                    <h3>{item.title}</h3>
                    <p className="meta">Leadership & Coordination</p>
                    <p>{item.detail}</p>
                    {Array.isArray(item.images) && item.images.length > 0 ? (
                      <div className="personal-media">
                        {item.images.map((img, idx) => <img key={`${item.title}-${idx}`} src={img} alt={`${item.title} ${idx + 1}`} />)}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section id="volunteering">
              <h2 className="t">NGO Volunteering</h2>
              <div className="personal-grid">
                {volunteering.map((item) => (
                  <article key={item.title} className="personal-card ngo-card">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    {Array.isArray(item.images) && item.images.length > 0 ? (
                      <div className="personal-media ngo-media">
                        {item.images.map((img, idx) => <img key={`${item.title}-${idx}`} src={img} alt={`${item.title} ${idx + 1}`} />)}
                      </div>
                    ) : (
                      <div className="personal-empty">Photos pending upload.</div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section id="blog">
              <h2 className="t">Blog</h2>
              <article className="personal-card">
                <p className="meta blog-intro">
                  Started this blog about a year ago to document my 20s, the so-called golden phase of life. The
                  inconsistency in posts is honestly part of the story: I overthink, go silent, reset, and come back.
                  Perfect streaks are not the goal here. Showing up again, writing something real, and feeling good
                  about it is.
                </p>
                <BlogCarousel />
              </article>
            </section>
          </>}

          <section id="contact">
            <h2 className="t">Contact</h2>
            <div className="ct">
              <article className="pn">
                <h3 className="contact-title">
                  <span className="contact-title-main">Let&apos;s</span>
                  <span className="contact-title-sub">connect</span>
                </h3>
                <button className="copy" onClick={() => { navigator.clipboard.writeText("sirigirivarshitha@gmail.com"); setToastMsg("Email copied."); setEmailCopied(true); setTimeout(() => setToastMsg(""), 2200); setTimeout(() => setEmailCopied(false), 2200); }}>
                  sirigirivarshitha@gmail.com | Copy
                </button>
                {emailCopied && <span className="copy-msg">Copied to clipboard</span>}
                <p style={{ margin: "10px 0 0", color: col.txt2 }}>Phone: +91 8688132287</p>
              </article>
              <article className="pn">
                <form onSubmit={send}>
                  <div style={{ display: "grid", gap: 10 }}>
                    <h3 className="contact-title">
                      <span className="contact-title-main">Share</span>
                      <span className="contact-title-sub">comments</span>
                    </h3>
                    <div className="comment-row">
                      <input
                        className="in"
                        placeholder="Type your message"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button className="b ba" type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </article>
            </div>
          </section>

          <footer className="ft">
            <div className="fr">
              <span>Copyright 2026 Varshitha Sirigiri</span>
              <span>Risk | Controls | Documentation | Dashboards</span>
            </div>
          </footer>
          </div>
        </main>

        {cs && (
          <div className="md" onClick={() => setCaseId(null)}>
            <article className="mc" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                <button className="b" onClick={() => setCaseId(null)}>Back</button>
                <a className="b" href={cs.g} target="_blank" rel="noopener noreferrer">Project Repo</a>
              </div>
              <h3 style={{ margin: "14px 0 8px", fontSize: 26, fontFamily: "\"Segoe UI\",Inter,Roboto,Arial,sans-serif" }}>{cs.t}</h3>
              <div className="chips">{cs.tags.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
              <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
                <article className="pn"><h3>Problem</h3><p>{cs.cs.p}</p></article>
                <article className="pn"><h3>Approach</h3><p>{cs.cs.m}</p></article>
                {Array.isArray(cs.cs.ds) && cs.cs.ds.length > 0 && (
                  <article className="pn">
                    <h3>Data Scope</h3>
                    <ul className="ls">{cs.cs.ds.map((x) => <li key={x}>{x}</li>)}</ul>
                  </article>
                )}
                {Array.isArray(cs.cs.st) && cs.cs.st.length > 0 && (
                  <article className="pn">
                    <h3>Tech Stack</h3>
                    <div className="chips">{cs.cs.st.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
                  </article>
                )}
                <article className="pn"><h3>Controls / Quality checks</h3><p>{cs.cs.q}</p></article>
                <article className="pn"><h3>Insights</h3><ul className="ls">{cs.cs.i.map((x) => <li key={x}>{x}</li>)}</ul></article>
                {Array.isArray(cs.cs.o) && cs.cs.o.length > 0 && (
                  <article className="pn">
                    <h3>Outputs</h3>
                    <ul className="ls">{cs.cs.o.map((x) => <li key={x}>{x}</li>)}</ul>
                  </article>
                )}
                <article className="pn"><h3>Recommendations</h3><ul className="ls">{cs.cs.r.map((x) => <li key={x}>{x}</li>)}</ul></article>
              </div>
            </article>
          </div>
        )}

        {selectedDash && (
          <div className="md" onClick={() => setDashId(null)}>
            <article className="mc" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <button className="b" onClick={() => setDashId(null)}>Back</button>
                <div className="chips" style={{ marginTop: 0 }}>
                  <span className="chip">{selectedDash.tool}</span>
                  <span className="chip">Dashboard</span>
                </div>
              </div>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, fontFamily: "\"Segoe UI\",Inter,Roboto,Arial,sans-serif" }}>{selectedDash.title}</h3>
              {selectedDash.type === "video" ? (
                <video className="media-lg" src={selectedDash.src} controls autoPlay muted playsInline />
              ) : (
                <img className="media-lg" src={selectedDash.src} alt={selectedDash.title} />
              )}
            </article>
          </div>
        )}

        {toastMsg && <div className="ts">{toastMsg}</div>}
        {top && <button className="b tb" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top</button>}
      </div>
    </div>
  );
}

