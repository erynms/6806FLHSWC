/**
 * Recommendation Engine for Florida HSWC Readiness Assessment
 *
 * This file contains all the logic for:
 * - Classifying schools into typologies
 * - Calculating feasibility scores
 * - Generating recommendations based on school context
 * - Creating phased roadmaps
 */

// Typology Classifications
export const TYPOLOGIES = {
  RESOURCE_RICH: 'Resource-Rich but Uninformed',
  MOTIVATED_UNDERFUNDED: 'Motivated but Underfunded',
  HOSTILE: 'Hostile to Non-Tested Initiatives',
  READY: 'Ready for Implementation',
  BUILDING_AWARENESS: 'Building Awareness',
  PILOT_READY: 'Pilot-Ready with Constraints',
};

// Calculate the school's typology based on assessment responses
export function calculateTypology(responses) {
  const {
    adminSupport,
    budget,
    teacherKnowledge,
    currentSupport,
    barrier,
  } = responses;

  // Check for "Hostile to Non-Tested Initiatives" first (overrides everything)
  if (adminSupport <= 2) {
    return TYPOLOGIES.HOSTILE;
  }

  // Check for "Ready for Implementation"
  if (adminSupport >= 4 && (budget === 'flexible' || budget === 'moderate') &&
      (teacherKnowledge === 'very-familiar' || teacherKnowledge === 'somewhat-familiar')) {
    return TYPOLOGIES.READY;
  }

  // Check for "Resource-Rich but Uninformed"
  if ((budget === 'flexible' || budget === 'moderate') &&
      (teacherKnowledge === 'never-heard' || teacherKnowledge === 'heard-little')) {
    return TYPOLOGIES.RESOURCE_RICH;
  }

  // Check for "Motivated but Underfunded"
  if (adminSupport >= 4 &&
      (teacherKnowledge === 'very-familiar' || teacherKnowledge === 'somewhat-familiar') &&
      (budget === 'none' || budget === 'limited')) {
    return TYPOLOGIES.MOTIVATED_UNDERFUNDED;
  }

  // Check for "Building Awareness"
  if ((teacherKnowledge === 'never-heard' || teacherKnowledge === 'heard-little') &&
      adminSupport === 3) {
    return TYPOLOGIES.BUILDING_AWARENESS;
  }

  // Default to "Pilot-Ready with Constraints"
  return TYPOLOGIES.PILOT_READY;
}

// Calculate feasibility score (0-100)
export function calculateFeasibilityScore(responses) {
  let score = 0;

  // Administrative support (40% weight)
  score += responses.adminSupport * 8;

  // Budget (25% weight)
  const budgetScores = {
    'none': 0,
    'limited': 5,
    'moderate': 15,
    'flexible': 25,
  };
  score += budgetScores[responses.budget] || 0;

  // Teacher knowledge (20% weight)
  const knowledgeScores = {
    'never-heard': 0,
    'heard-little': 5,
    'somewhat-familiar': 12,
    'very-familiar': 20,
  };
  score += knowledgeScores[responses.teacherKnowledge] || 0;

  // Current support infrastructure (10% weight)
  const supportScores = {
    'none': 0,
    'in-class': 3,
    'tutoring': 6,
    'writing-support': 10,
  };
  score += supportScores[responses.currentSupport] || 0;

  // Barrier impact (5% weight - inverse)
  const barrierImpact = {
    'dont-know': 5,
    'effectiveness': 4,
    'space': 3,
    'time': 2,
    'buy-in': 1,
    'funding': 1,
  };
  score += barrierImpact[responses.barrier] || 0;

  return Math.min(100, Math.round(score));
}

// Get feasibility level from score
export function getFeasibilityLevel(score) {
  if (score >= 80) return 'High';
  if (score >= 60) return 'Medium-High';
  if (score >= 40) return 'Medium';
  if (score >= 20) return 'Medium-Low';
  return 'Low';
}

// Generate strengths based on responses
export function generateStrengths(responses, typology) {
  const strengths = [];

  if (responses.adminSupport >= 4) {
    strengths.push('Strong administrative support for new initiatives');
  }

  if (responses.budget === 'flexible' || responses.budget === 'moderate') {
    strengths.push('Adequate budget flexibility for implementation');
  }

  if (responses.teacherKnowledge === 'very-familiar' || responses.teacherKnowledge === 'somewhat-familiar') {
    strengths.push('Existing knowledge of writing center pedagogy');
  }

  if (responses.currentSupport === 'writing-support' || responses.currentSupport === 'tutoring') {
    strengths.push('Existing support infrastructure to build upon');
  }

  if (responses.demographics && responses.demographics.length > 0) {
    strengths.push('Clear understanding of student demographic needs');
  }

  if (strengths.length === 0) {
    strengths.push('Willingness to explore new approaches to writing instruction');
  }

  return strengths.slice(0, 3); // Return top 3
}

// Generate challenges based on responses
export function generateChallenges(responses, typology) {
  const challenges = [];

  if (responses.adminSupport <= 2) {
    challenges.push('Limited administrative support requiring evidence-based advocacy');
  }

  if (responses.budget === 'none' || responses.budget === 'limited') {
    challenges.push('Budget constraints requiring creative, low-cost solutions');
  }

  if (responses.teacherKnowledge === 'never-heard' || responses.teacherKnowledge === 'heard-little') {
    challenges.push('Need for foundational education about writing center pedagogy');
  }

  if (responses.barrier === 'space') {
    challenges.push('Physical space limitations requiring flexible location strategies');
  }

  if (responses.barrier === 'time') {
    challenges.push('Staff time constraints requiring efficient operational models');
  }

  if (responses.currentSupport === 'none') {
    challenges.push('Lack of existing support infrastructure to build upon');
  }

  return challenges.slice(0, 3); // Return top 3
}

// Generate opportunities based on responses
export function generateOpportunities(responses, typology) {
  const opportunities = [];

  if (responses.aiPriority === 'critical' || responses.aiPriority === 'very-important') {
    opportunities.push('Address AI literacy as a differentiator and value proposition');
  }

  if (responses.schoolSize === 'large') {
    opportunities.push('Scale impact across large student population');
  }

  if (responses.demographics && responses.demographics.includes('diverse-abilities')) {
    opportunities.push('Serve diverse learning needs through differentiated support');
  }

  if (responses.demographics && responses.demographics.includes('ell')) {
    opportunities.push('Support multilingual writers with specialized resources');
  }

  if (responses.currentSupport === 'tutoring') {
    opportunities.push('Expand existing tutoring program with writing-specific focus');
  }

  if (typology === TYPOLOGIES.RESOURCE_RICH) {
    opportunities.push('Leverage available resources to create model program');
  }

  return opportunities.slice(0, 2); // Return top 2
}

// Get recommended starting model based on typology
export function getRecommendedModel(typology, responses) {
  const models = {
    [TYPOLOGIES.MOTIVATED_UNDERFUNDED]: {
      name: 'Drop-In Drafting Lab with Collaborative Agency',
      why: 'This model requires minimal resources while maximizing impact. It leverages peer collaboration and can be run by dedicated teachers without significant budget.',
      startWith: [
        'Designate a classroom or library space during lunch or after school',
        'Recruit a small group of strong student writers as peer tutors',
        'Create simple signup sheet and drop-in hours',
        'Focus on process-based, collaborative writing support',
      ],
    },
    [TYPOLOGIES.RESOURCE_RICH]: {
      name: 'Skills-Based Center with Professional Development Focus',
      why: 'Your available resources allow for comprehensive implementation, but success requires proper training. Invest in learning before launching to avoid common pitfalls.',
      startWith: [
        'Partner with a local university writing center for guidance',
        'Attend writing center conferences or workshops',
        'Develop clear learning objectives and metrics',
        'Hire or train staff with proper writing center pedagogy',
      ],
    },
    [TYPOLOGIES.READY]: {
      name: 'Full-Service Writing Center with Multiple Frameworks',
      why: 'Your school has the resources, support, and knowledge to implement a comprehensive writing center. You can offer diverse services addressing varied student needs.',
      startWith: [
        'Establish dedicated physical space with appropriate technology',
        'Hire coordinator and train peer tutors using best practices',
        'Implement appointment system and walk-in hours',
        'Offer workshops, one-on-one sessions, and classroom partnerships',
      ],
    },
    [TYPOLOGIES.HOSTILE]: {
      name: 'Pilot Program with Data Collection Focus',
      why: 'Given skepticism about new initiatives, you must prove value through measurable outcomes. Start small, collect rigorous data, and build support through evidence.',
      startWith: [
        'Propose a limited pilot (one semester, one grade level)',
        'Establish clear, measurable objectives aligned with school priorities',
        'Implement pre/post assessment of writing quality',
        'Document all metrics: visits, satisfaction, grade improvements',
      ],
    },
    [TYPOLOGIES.BUILDING_AWARENESS]: {
      name: 'Educational Workshops First, Then Pilot',
      why: 'Building knowledge and buy-in is prerequisite to implementation. Focus on education and advocacy before requesting resources or commitment.',
      startWith: [
        'Present at faculty meetings about writing center benefits',
        'Share research on writing center effectiveness',
        'Visit successful high school writing centers',
        'Build coalition of interested teachers and administrators',
      ],
    },
    [TYPOLOGIES.PILOT_READY]: {
      name: 'Targeted Pilot Program',
      why: 'Your context supports a focused pilot that addresses specific needs. Match your approach to your identified priorities and available resources.',
      startWith: [
        'Define clear scope based on your identified constraints',
        'Start with target population (e.g., one grade, AP students, ELL)',
        'Use pedagogical approach matching your preferences',
        'Plan for scaling if pilot succeeds',
      ],
    },
  };

  return models[typology] || models[TYPOLOGIES.PILOT_READY];
}

// Generate phased roadmap based on typology and context
export function generateRoadmap(typology, responses) {
  const baseRoadmaps = {
    [TYPOLOGIES.MOTIVATED_UNDERFUNDED]: {
      phase1: {
        title: 'Grassroots Launch',
        timeline: '1-3 months',
        actions: [
          'Secure permission for space use (classroom, library corner, etc.)',
          'Recruit 3-5 strong student writers as initial peer tutors',
          'Create basic training materials (or use free online resources)',
          'Set up simple scheduling system (Google Form + signup sheet)',
          'Launch with 2-3 hours per week of drop-in availability',
        ],
        resources: 'Under $100 (printing, basic supplies)',
        outcomes: 'Establish proof of concept, serve 10-20 students, gather testimonials',
      },
      phase2: {
        title: 'Build Momentum',
        timeline: '4-6 months',
        actions: [
          'Expand hours based on demand patterns',
          'Develop peer tutor training program',
          'Create feedback system for continuous improvement',
          'Document success stories and collect data',
          'Seek mini-grant or PTA funding for supplies',
        ],
        resources: '$200-500 (training materials, promotional items)',
        outcomes: 'Serve 30-50 students regularly, establish reputation, demonstrate impact',
      },
      phase3: {
        title: 'Formalize & Expand',
        timeline: '1-2 years',
        actions: [
          'Propose dedicated line item in school budget',
          'Develop partnership with English department',
          'Create for-credit peer tutor course',
          'Expand services (workshops, classroom visits)',
          'Join regional/national writing center associations',
        ],
        resources: '$1000-2000 annually',
        outcomes: 'Sustainable program serving 100+ students, institutional recognition',
      },
    },
    [TYPOLOGIES.RESOURCE_RICH]: {
      phase1: {
        title: 'Education & Planning',
        timeline: '1-3 months',
        actions: [
          'Tour successful high school writing centers',
          'Consult with university writing center directors',
          'Attend professional development on writing center pedagogy',
          'Form planning committee with diverse stakeholders',
          'Develop mission statement and learning objectives',
        ],
        resources: '$500-1000 (conference fees, consultation costs)',
        outcomes: 'Comprehensive understanding of best practices, clear vision statement',
      },
      phase2: {
        title: 'Infrastructure Development',
        timeline: '4-6 months',
        actions: [
          'Secure and outfit dedicated physical space',
          'Hire writing center coordinator (stipend or course release)',
          'Purchase furniture, technology, and materials',
          'Develop training curriculum for peer tutors',
          'Create policies, procedures, and assessment tools',
        ],
        resources: '$5000-10000 (space, technology, coordinator stipend)',
        outcomes: 'Professional space, trained staff, operational systems ready',
      },
      phase3: {
        title: 'Full Launch & Integration',
        timeline: '1-2 years',
        actions: [
          'Official opening with community event',
          'Offer full range of services (appointments, walk-in, workshops)',
          'Integrate with curriculum through teacher partnerships',
          'Conduct ongoing assessment and program improvement',
          'Present at conferences, become model for other schools',
        ],
        resources: '$3000-5000 annually (ongoing operations)',
        outcomes: 'Comprehensive, sustainable program recognized as institutional asset',
      },
    },
    [TYPOLOGIES.READY]: {
      phase1: {
        title: 'Rapid Planning',
        timeline: '1-3 months',
        actions: [
          'Formalize planning committee and assign roles',
          'Finalize space allocation and begin setup',
          'Post position for writing center coordinator',
          'Order necessary furniture, technology, materials',
          'Develop comprehensive training program for tutors',
        ],
        resources: '$8000-12000 (initial setup)',
        outcomes: 'All logistics in place, staff hired, space ready',
      },
      phase2: {
        title: 'Soft Launch & Refinement',
        timeline: '4-6 months',
        actions: [
          'Begin with limited hours and scale up',
          'Train initial cohort of peer tutors',
          'Implement appointment and walk-in systems',
          'Gather continuous feedback from users',
          'Adjust services based on demand and feedback',
        ],
        resources: '$2000-3000 (operational costs)',
        outcomes: 'Smooth operations, satisfied users, data-driven improvements',
      },
      phase3: {
        title: 'Full Operation & Excellence',
        timeline: '1-2 years',
        actions: [
          'Expand to full service menu (workshops, consultations, etc.)',
          'Develop advanced training for returning tutors',
          'Create partnerships across all departments',
          'Publish outcomes and share best practices',
          'Apply for grants or awards recognizing excellence',
        ],
        resources: '$5000-8000 annually',
        outcomes: 'Premier program serving all students, model for regional schools',
      },
    },
    [TYPOLOGIES.HOSTILE]: {
      phase1: {
        title: 'Research & Proposal',
        timeline: '1-3 months',
        actions: [
          'Research writing center effectiveness literature',
          'Identify measurable outcomes aligned with school goals',
          'Draft detailed pilot proposal with assessment plan',
          'Present to administration with data from similar schools',
          'Secure approval for limited pilot program',
        ],
        resources: 'Minimal (your time + research)',
        outcomes: 'Approved pilot with clear metrics and timeline',
      },
      phase2: {
        title: 'Pilot Implementation',
        timeline: '4-6 months',
        actions: [
          'Implement small-scale pilot (one class, one semester)',
          'Collect rigorous data: attendance, satisfaction, writing quality',
          'Document every success and address challenges immediately',
          'Maintain communication with administration about progress',
          'Conduct pre/post assessment using validated rubrics',
        ],
        resources: '$200-500 (assessment tools, basic materials)',
        outcomes: 'Quantifiable evidence of impact, user testimonials, refined model',
      },
      phase3: {
        title: 'Advocacy & Expansion',
        timeline: '1-2 years',
        actions: [
          'Present pilot results with compelling data visualization',
          'Share student and teacher testimonials',
          'Propose expanded program with proven ROI',
          'Address administrative concerns with evidence',
          'Secure buy-in for sustained, scaled implementation',
        ],
        resources: '$1000-2000 (scale pilot to broader population)',
        outcomes: 'Institutional support, allocated budget, permission to expand',
      },
    },
    [TYPOLOGIES.BUILDING_AWARENESS]: {
      phase1: {
        title: 'Education Campaign',
        timeline: '1-3 months',
        actions: [
          'Schedule presentations at faculty and administrative meetings',
          'Share articles and research on writing center benefits',
          'Organize field trip to visit successful writing center',
          'Identify and recruit allies among teachers and admin',
          'Create informal discussion groups about writing instruction',
        ],
        resources: 'Minimal (materials + transportation)',
        outcomes: 'Increased awareness, interest from key stakeholders',
      },
      phase2: {
        title: 'Build Coalition',
        timeline: '4-6 months',
        actions: [
          'Form exploratory committee with interested parties',
          'Conduct needs assessment with students and teachers',
          'Research funding opportunities (grants, PTA, etc.)',
          'Visit multiple successful programs for comparison',
          'Draft vision document with committee input',
        ],
        resources: '$300-500 (visits, materials)',
        outcomes: 'Committed team, shared vision, understanding of options',
      },
      phase3: {
        title: 'Proposal & Pilot',
        timeline: '1-2 years',
        actions: [
          'Develop formal proposal for administration',
          'Secure resources for pilot implementation',
          'Launch small pilot program with assessment plan',
          'Document outcomes and refine approach',
          'Propose full implementation based on pilot success',
        ],
        resources: '$500-1000 (pilot program)',
        outcomes: 'Approved pilot, demonstrated viability, path to full program',
      },
    },
    [TYPOLOGIES.PILOT_READY]: {
      phase1: {
        title: 'Targeted Planning',
        timeline: '1-3 months',
        actions: [
          'Define specific pilot scope based on your constraints',
          'Identify target student population for initial focus',
          'Secure space and basic resources',
          'Recruit small group of peer tutors',
          'Develop training aligned with your pedagogical preference',
        ],
        resources: '$300-800 (depends on scope)',
        outcomes: 'Clear plan, secured resources, trained initial tutors',
      },
      phase2: {
        title: 'Pilot Launch',
        timeline: '4-6 months',
        actions: [
          'Begin services with defined hours and population',
          'Implement feedback mechanisms for continuous improvement',
          'Collect data on usage, satisfaction, and outcomes',
          'Adjust services based on observed needs',
          'Build relationships with English department',
        ],
        resources: '$500-1000 (ongoing operations)',
        outcomes: 'Functional pilot, positive user feedback, documented impact',
      },
      phase3: {
        title: 'Evaluate & Scale',
        timeline: '1-2 years',
        actions: [
          'Analyze pilot data and identify successes/challenges',
          'Propose expansion based on demonstrated need and success',
          'Seek additional funding for scaled implementation',
          'Expand hours, services, or target population',
          'Develop sustainability plan for long-term operation',
        ],
        resources: '$1500-3000 (expanded program)',
        outcomes: 'Sustainable program serving broader population, institutional support',
      },
    },
  };

  return baseRoadmaps[typology] || baseRoadmaps[TYPOLOGIES.PILOT_READY];
}

// Get recommended pedagogical framework
export function getPedagogicalFramework(responses) {
  const { studentNeed, tutoringApproach } = responses;

  // Direct Instruction / Skills-Based
  if (studentNeed === 'loc' && tutoringApproach <= 2) {
    return {
      name: 'Direct Instruction / Skills-Based Framework',
      description: 'This approach emphasizes explicit teaching of grammar, mechanics, and writing conventions. Tutors provide direct instruction on specific skills and offer structured guidance.',
      whyItFits: 'Your students need support with writing mechanics, and your pedagogical preference leans toward structured teaching. This framework provides clear skill development.',
      approach: [
        'Focus on Lower-Order Concerns (grammar, punctuation, citation)',
        'Use explicit instruction and modeling',
        'Provide worksheets and skill-building exercises',
        'Offer mini-lessons on specific topics',
      ],
    };
  }

  // Minimalist
  if (studentNeed === 'hoc' && tutoringApproach >= 4) {
    return {
      name: 'Minimalist Framework',
      description: 'The minimalist approach empowers students to solve their own writing problems through careful questioning and student-led discussion. Tutors serve as facilitators rather than instructors.',
      whyItFits: 'Your students need help with higher-order concerns like thesis and organization, and you prefer student-driven learning. This framework supports independent writer development.',
      approach: [
        'Ask open-ended questions to help students think through issues',
        'Let students identify their own concerns first',
        'Focus on Higher-Order Concerns (thesis, organization, development)',
        'Avoid taking over the paper or providing answers',
      ],
    };
  }

  // Collaborative Agency
  if (studentNeed === 'both' || (tutoringApproach === 3)) {
    return {
      name: 'Collaborative Agency Framework',
      description: 'This balanced approach views tutoring as a collaborative partnership. Tutor and student work together to address writing concerns, sharing responsibility for the session.',
      whyItFits: 'Your students have diverse needs, and you value a balanced approach. This framework adapts to individual situations while maintaining student agency.',
      approach: [
        'Negotiate session agenda collaboratively',
        'Address both Higher-Order and Lower-Order Concerns as needed',
        'Balance student discovery with tutor expertise',
        'Build relationship and shared ownership of improvement',
      ],
    };
  }

  // Synthesis/Balanced Approach (default)
  return {
    name: 'Synthesis / Balanced Framework',
    description: 'A flexible approach that draws from multiple pedagogies based on student needs, assignment stage, and learning context. Tutors adapt their approach to each unique situation.',
    whyItFits: 'Your school context suggests students need varied support. This framework allows tutors to adjust their approach based on individual writer needs and assignment stages.',
    approach: [
      'Assess each student\'s needs and adjust approach accordingly',
      'Use minimalist questioning for experienced writers',
      'Provide more structure for developing writers',
      'Balance skill instruction with writer independence',
    ],
  };
}

// Generate recommended metrics to track
export function getRecommendedMetrics(typology, responses) {
  const baseMetrics = [
    'Number of student visits per week/month',
    'Student satisfaction ratings (survey after each visit)',
    'Repeat visit rate (indicates value to students)',
  ];

  const typologySpecificMetrics = {
    [TYPOLOGIES.MOTIVATED_UNDERFUNDED]: [
      'Cost per student served (demonstrate efficiency)',
      'Student testimonials and success stories',
    ],
    [TYPOLOGIES.RESOURCE_RICH]: [
      'Tutor training hours completed',
      'Faculty satisfaction with writing center partnership',
    ],
    [TYPOLOGIES.READY]: [
      'Service diversity (workshops, appointments, walk-ins)',
      'Cross-departmental usage (beyond English)',
    ],
    [TYPOLOGIES.HOSTILE]: [
      'Pre/post writing quality scores using validated rubric',
      'Grade improvement in writing assignments',
      'Standardized test score changes (if applicable)',
    ],
    [TYPOLOGIES.BUILDING_AWARENESS]: [
      'Awareness metrics (who knows about the center)',
      'Referral sources (how students hear about services)',
    ],
    [TYPOLOGIES.PILOT_READY]: [
      'Target population reach percentage',
      'Documented learning outcomes',
    ],
  };

  const metrics = [...baseMetrics];

  if (typologySpecificMetrics[typology]) {
    metrics.push(...typologySpecificMetrics[typology]);
  }

  // Add AI-specific metric if AI is a priority
  if (responses.aiPriority === 'critical' || responses.aiPriority === 'very-important') {
    metrics.push('Number of consultations addressing AI literacy and ethical use');
  }

  return metrics;
}

// Generate immediate next steps
export function getNextSteps(typology, responses) {
  const nextStepsMap = {
    [TYPOLOGIES.MOTIVATED_UNDERFUNDED]: [
      'Identify and secure permission for a free space (classroom, library corner)',
      'Recruit 3-5 strong student writers interested in peer tutoring',
      'Review free training resources (IWCA, SSWCA websites)',
      'Set up simple Google Form for appointment requests',
      'Schedule your first 2-hour weekly drop-in session',
    ],
    [TYPOLOGIES.RESOURCE_RICH]: [
      'Contact local university writing centers to schedule visits',
      'Register for upcoming writing center conferences or webinars',
      'Form planning committee with English teachers and administrators',
      'Research writing center director positions and compensation models',
      'Review Chapter 5 of this assessment for pedagogical framework options',
    ],
    [TYPOLOGIES.READY]: [
      'Finalize budget allocation and space designation',
      'Post job opening for writing center coordinator position',
      'Order essential furniture and technology',
      'Set timeline for fall or spring semester launch',
      'Begin recruiting interested students for peer tutor training',
    ],
    [TYPOLOGIES.HOSTILE]: [
      'Compile research on writing center effectiveness (contact me for resources)',
      'Identify measurable outcomes aligned with school improvement plan',
      'Draft pilot proposal with clear timeline and assessment plan',
      'Request meeting with administration to present proposal',
      'Find peer schools with data on writing center impact',
    ],
    [TYPOLOGIES.BUILDING_AWARENESS]: [
      'Request 15 minutes at next faculty meeting to present concept',
      'Share this assessment tool with colleagues',
      'Identify 2-3 teachers interested in exploring idea together',
      'Find nearby high school writing center to visit',
      'Join SSWCA email list for secondary school writing center resources',
    ],
    [TYPOLOGIES.PILOT_READY]: [
      'Define specific pilot scope and target population',
      'Secure permission and space for pilot program',
      'Recruit small initial group of peer tutors',
      'Develop simple training based on recommended framework',
      'Set start date and communicate opportunity to students',
    ],
  };

  return nextStepsMap[typology] || nextStepsMap[TYPOLOGIES.PILOT_READY];
}

// Generate complete recommendation report
export function generateRecommendations(responses) {
  const typology = calculateTypology(responses);
  const feasibilityScore = calculateFeasibilityScore(responses);
  const feasibilityLevel = getFeasibilityLevel(feasibilityScore);

  return {
    typology,
    feasibilityScore,
    feasibilityLevel,
    strengths: generateStrengths(responses, typology),
    challenges: generateChallenges(responses, typology),
    opportunities: generateOpportunities(responses, typology),
    recommendedModel: getRecommendedModel(typology, responses),
    roadmap: generateRoadmap(typology, responses),
    pedagogicalFramework: getPedagogicalFramework(responses),
    metrics: getRecommendedMetrics(typology, responses),
    nextSteps: getNextSteps(typology, responses),
    responses, // Include original responses for data collection
  };
}
