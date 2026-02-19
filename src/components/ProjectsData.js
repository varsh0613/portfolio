const projectsData = [
  {
    id: 1,
    title: "Chemotherapy Survival Analysis",
    thumbnail: require("../assets/amongus.png"),
    fullDescription:
      "An academic project analyzing chemotherapy treatment efficacy and patient survival outcomes using statistical methods and data visualization techniques.",
    details: [
      {
        title: "Methodology",
        points: [
          "Conducted survival analysis using Kaplan-Meier estimators",
          "Performed cox proportional hazards regression",
          "Analyzed treatment effectiveness across patient demographics",
        ],
      },
      {
        title: "Key Findings",
        points: [
          "Identified significant survival differences between treatment groups",
          "Discovered key prognostic factors affecting patient outcomes",
          "Generated insights for treatment optimization",
        ],
      },
    ],
    github: "https://github.com/varsh0613",
    images: [],
    video: null,
  },
  {
    id: 2,
    title: "Credit Risk Analysis",
    thumbnail: require("../assets/another-character.png"),
    fullDescription:
      "A comprehensive analysis of credit risk assessment using machine learning techniques and financial data modeling.",
    details: [
      {
        title: "Approach",
        points: [
          "Built predictive models for credit default risk",
          "Implemented logistic regression and tree-based models",
          "Developed risk scoring frameworks",
        ],
      },
      {
        title: "Results",
        points: [
          "Achieved 85% prediction accuracy",
          "Identified key risk factors in loan portfolios",
          "Created actionable credit risk metrics",
        ],
      },
    ],
    github: "https://github.com/varsh0613",
    images: [],
    video: null,
  },
];

export default projectsData;
