import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Results({ data }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate('/');
    }
  }, [data, navigate]);

  if (!data) {
    return null;
  }

  const {
    typology,
    feasibilityScore,
    feasibilityLevel,
    strengths,
    challenges,
    opportunities,
    recommendedModel,
    roadmap,
    pedagogicalFramework,
    metrics,
    nextSteps,
  } = data;

  const handlePrint = () => {
    window.print();
  };

  const getFeasibilityColor = (level) => {
    const colors = {
      'High': 'text-green-600 bg-green-100',
      'Medium-High': 'text-blue-600 bg-blue-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'Medium-Low': 'text-orange-600 bg-orange-100',
      'Low': 'text-red-600 bg-red-100',
    };
    return colors[level] || colors['Medium'];
  };

  return (
    <div className="min-h-screen py-8 px-4 print:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 print:mb-6">
          <div className="inline-block p-3 bg-primary-100 rounded-full mb-4 print:hidden">
            <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your HSWC Readiness Report
          </h1>
          <p className="text-gray-600 text-lg">
            Personalized recommendations for your school's writing center journey
          </p>
        </div>

        {/* Section 1: Typology */}
        <div className="card mb-6">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your School's Typology
              </h2>
              <div className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold text-lg mb-3">
                {typology}
              </div>
              <p className="text-gray-700 leading-relaxed">
                {getTypologyDescription(typology)}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Feasibility Assessment */}
        <div className="card mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Feasibility Assessment
          </h2>

          {/* Feasibility Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">Feasibility Score</span>
              <span className={`px-4 py-1 rounded-full font-bold ${getFeasibilityColor(feasibilityLevel)}`}>
                {feasibilityLevel}
              </span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-1000"
                style={{ width: `${feasibilityScore}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">{feasibilityScore} out of 100</p>
          </div>

          {/* Strengths, Challenges, Opportunities */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Strengths
              </h3>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Challenges
              </h3>
              <ul className="space-y-2">
                {challenges.map((challenge, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-yellow-600 mr-2">⚠</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Opportunities
              </h3>
              <ul className="space-y-2">
                {opportunities.map((opportunity, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">💡</span>
                    <span>{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Recommended Model */}
        <div className="card mb-6 bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Recommended Starting Model
          </h2>

          <div className="bg-white rounded-lg p-6 mb-4">
            <h3 className="text-xl font-bold text-primary-700 mb-3">
              {recommendedModel.name}
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Why this model:</strong> {recommendedModel.why}
            </p>
            <div>
              <p className="font-semibold text-gray-900 mb-2">What you can start with:</p>
              <ul className="space-y-2">
                {recommendedModel.startWith.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <svg className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Phased Roadmap */}
        <div className="card mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Your Phased Roadmap
          </h2>

          <div className="space-y-6">
            {['phase1', 'phase2', 'phase3'].map((phase, index) => (
              <div key={phase} className="border-l-4 border-primary-500 pl-6 pb-6 relative">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Phase {index + 1}: {roadmap[phase].title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Timeline: <strong>{roadmap[phase].timeline}</strong>
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <p className="font-semibold text-gray-900 mb-2">Action Steps:</p>
                  <ul className="space-y-1">
                    {roadmap[phase].actions.map((action, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-semibold text-blue-900 mb-1">Resource Needs:</p>
                    <p className="text-blue-800">{roadmap[phase].resources}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-semibold text-green-900 mb-1">Expected Outcomes:</p>
                    <p className="text-green-800">{roadmap[phase].outcomes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Pedagogical Framework */}
        <div className="card mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Recommended Pedagogical Framework
          </h2>

          <div className="bg-primary-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-primary-900 mb-3">
              {pedagogicalFramework.name}
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {pedagogicalFramework.description}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Why it fits your context:</strong> {pedagogicalFramework.whyItFits}
            </p>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Key approach elements:</p>
              <ul className="space-y-2">
                {pedagogicalFramework.approach.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <svg className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 6: Key Metrics */}
        <div className="card mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Key Metrics to Track
          </h2>
          <p className="text-gray-600 mb-4">
            Measure these metrics to demonstrate impact and guide continuous improvement:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-gray-700">{metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Next Steps */}
        <div className="card mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Your Immediate Next Steps
          </h2>
          <p className="text-gray-700 mb-4">Start your writing center journey with these actionable steps:</p>
          <ol className="space-y-3">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  {index + 1}
                </span>
                <span className="text-gray-800 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Resources */}
        <div className="card mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Additional Resources
          </h2>
          <div className="space-y-3">
            <a
              href="https://erynms.github.io/Eryn/assets/ChooseYour.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Interactive Writing Center Guide</p>
                <p className="text-sm text-gray-600">Explore pedagogical frameworks in depth</p>
              </div>
            </a>
            <a
              href="https://www.sswca.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Secondary School Writing Centers Association</p>
                <p className="text-sm text-gray-600">Resources and community for high school writing centers</p>
              </div>
            </a>
            <a
              href="https://writingcenters.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">International Writing Centers Association</p>
                <p className="text-sm text-gray-600">Professional development and research</p>
              </div>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 print:hidden mb-8">
          <button onClick={handlePrint} className="btn-primary flex-1">
            <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Download/Print Your Report
          </button>
          <Link to="/" className="btn-secondary flex-1 text-center">
            <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t pt-6">
          <p className="mb-2">
            This assessment tool was developed by <strong>Eryn M. Spurling</strong> as part of graduate research on Florida high school writing centers.
          </p>
          <p>
            Questions or feedback? Want to share your writing center journey?{' '}
            <a href="mailto:your-email@example.com" className="text-primary-600 hover:text-primary-700 font-medium">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function to get typology descriptions
function getTypologyDescription(typology) {
  const descriptions = {
    'Resource-Rich but Uninformed': 'Your school has financial resources and space available, but needs to build knowledge about writing center pedagogy and best practices before implementation. This is actually a strong position—you can invest in doing it right from the start.',
    'Motivated but Underfunded': 'You have enthusiasm and administrative support, but limited budget. The good news: many successful writing centers started this way. Your challenge is finding creative, low-cost solutions that demonstrate value.',
    'Hostile to Non-Tested Initiatives': 'Your administration is skeptical about new programs that don\'t directly tie to standardized testing. You\'ll need to prove value through careful data collection and alignment with school priorities. Start small and measure everything.',
    'Ready for Implementation': 'Congratulations! Your school has the support, resources, and knowledge to implement a comprehensive writing center. You\'re in an excellent position to create a model program.',
    'Building Awareness': 'Writing centers are relatively new to your school community. Before requesting resources, focus on education and building buy-in among teachers and administrators.',
    'Pilot-Ready with Constraints': 'Your school context supports a focused pilot program that addresses specific needs within your constraints. Success with a targeted approach can open doors for expansion.',
  };
  return descriptions[typology] || descriptions['Pilot-Ready with Constraints'];
}

export default Results;
