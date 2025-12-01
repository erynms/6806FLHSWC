import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRecommendations } from '../utils/recommendationEngine';
import { saveAssessmentResponse } from '../config/firebase';

function Assessment({ onComplete }) {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({
    schoolSize: '',
    demographics: [],
    currentSupport: '',
    adminSupport: 3,
    budget: '',
    teacherKnowledge: '',
    barrier: '',
    studentNeed: '',
    tutoringApproach: 3,
    aiPriority: '',
    optionalEmail: '',
  });

  const [errors, setErrors] = useState({});

  // Question sections
  const sections = [
    {
      title: 'Context Assessment',
      description: 'Help us understand your school environment',
      questions: [
        {
          id: 'schoolSize',
          label: '1. School Size',
          type: 'radio',
          required: true,
          options: [
            { value: 'small', label: 'Small (fewer than 500 students)' },
            { value: 'medium', label: 'Medium (500-1,500 students)' },
            { value: 'large', label: 'Large (more than 1,500 students)' },
          ],
        },
        {
          id: 'demographics',
          label: '2. Student Demographics (select all that apply)',
          type: 'checkbox',
          required: true,
          options: [
            { value: 'ell', label: 'High percentage of ELL (English Language Learner) students' },
            { value: 'frl', label: 'High percentage of free/reduced lunch students' },
            { value: 'diverse-abilities', label: 'Diverse range of academic abilities' },
            { value: 'college-prep', label: 'Strong college-prep focus' },
          ],
        },
        {
          id: 'currentSupport',
          label: '3. Current Writing Support',
          type: 'select',
          required: true,
          options: [
            { value: 'none', label: 'None' },
            { value: 'in-class', label: 'In-class only' },
            { value: 'tutoring', label: 'Tutoring but not writing-specific' },
            { value: 'writing-support', label: 'Some writing support exists' },
          ],
        },
        {
          id: 'adminSupport',
          label: '4. Administrative Support for New Initiatives',
          type: 'slider',
          required: true,
          min: 1,
          max: 5,
          labels: {
            1: 'Hostile/Skeptical',
            3: 'Neutral',
            5: 'Very Supportive',
          },
        },
        {
          id: 'budget',
          label: '5. Budget Flexibility',
          type: 'radio',
          required: true,
          options: [
            { value: 'none', label: 'No budget available' },
            { value: 'limited', label: 'Very limited (less than $500)' },
            { value: 'moderate', label: 'Moderate ($500-$2,000)' },
            { value: 'flexible', label: 'Flexible (more than $2,000)' },
          ],
        },
        {
          id: 'teacherKnowledge',
          label: '6. Teacher Knowledge of Writing Centers',
          type: 'radio',
          required: true,
          options: [
            { value: 'never-heard', label: 'Never heard of them' },
            { value: 'heard-little', label: "Heard of them but don't know much" },
            { value: 'somewhat-familiar', label: 'Somewhat familiar' },
            { value: 'very-familiar', label: 'Very familiar' },
          ],
        },
        {
          id: 'barrier',
          label: '7. Biggest Perceived Barrier',
          type: 'select',
          required: true,
          options: [
            { value: 'funding', label: 'Funding' },
            { value: 'space', label: 'Physical space' },
            { value: 'time', label: 'Staff time' },
            { value: 'buy-in', label: 'Administrative buy-in' },
            { value: 'dont-know', label: "Don't know where to start" },
            { value: 'effectiveness', label: 'Concerns about effectiveness' },
          ],
        },
      ],
    },
    {
      title: 'Pedagogical Preferences',
      description: 'Help us match the right approach to your needs',
      questions: [
        {
          id: 'studentNeed',
          label: '8. Primary Student Need',
          type: 'radio',
          required: true,
          options: [
            { value: 'loc', label: 'Grammar and basic writing mechanics (Lower-Order Concerns)' },
            { value: 'hoc', label: 'Organization and thesis development (Higher-Order Concerns)' },
            { value: 'both', label: 'Both equally' },
            { value: 'unsure', label: 'Not sure' },
          ],
        },
        {
          id: 'tutoringApproach',
          label: '9. Preferred Approach to Tutoring',
          type: 'slider',
          required: true,
          min: 1,
          max: 5,
          labels: {
            1: 'Direct instruction/teaching',
            3: 'Balanced approach',
            5: 'Student-driven/minimal intervention',
          },
        },
        {
          id: 'aiPriority',
          label: '10. AI Integration Priority',
          type: 'radio',
          required: true,
          options: [
            { value: 'not-priority', label: 'Not a priority' },
            { value: 'somewhat', label: 'Somewhat important' },
            { value: 'very-important', label: 'Very important' },
            { value: 'critical', label: 'Critical concern' },
          ],
        },
      ],
    },
  ];

  const handleInputChange = (questionId, value, isCheckbox = false) => {
    if (isCheckbox) {
      const currentValues = responses[questionId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      setResponses({ ...responses, [questionId]: newValues });
    } else {
      setResponses({ ...responses, [questionId]: value });
    }
    // Clear error for this field
    if (errors[questionId]) {
      const newErrors = { ...errors };
      delete newErrors[questionId];
      setErrors(newErrors);
    }
  };

  const validateSection = () => {
    const newErrors = {};
    const currentQuestions = sections[currentSection].questions;

    currentQuestions.forEach((question) => {
      if (question.required) {
        const value = responses[question.id];
        if (
          value === '' ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length === 0)
        ) {
          newErrors[question.id] = 'This field is required';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!validateSection()) return;

    try {
      // Generate recommendations
      const recommendations = generateRecommendations(responses);

      // Save to Firebase (with fallback to localStorage)
      try {
        await saveAssessmentResponse({
          responses,
          recommendations: {
            typology: recommendations.typology,
            feasibilityScore: recommendations.feasibilityScore,
            feasibilityLevel: recommendations.feasibilityLevel,
            recommendedModel: recommendations.recommendedModel.name,
            pedagogicalFramework: recommendations.pedagogicalFramework.name,
          },
        });
      } catch (error) {
        console.error('Error saving to Firebase, data saved locally:', error);
      }

      // Pass recommendations to parent and navigate
      onComplete(recommendations);
      navigate('/results');
    } catch (error) {
      console.error('Error processing assessment:', error);
      alert('There was an error processing your assessment. Please try again.');
    }
  };

  const renderQuestion = (question) => {
    const value = responses[question.id];
    const error = errors[question.id];

    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.value}
                className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary-300 hover:bg-primary-50"
                style={{
                  borderColor: value === option.value ? '#2563eb' : '#e5e7eb',
                  backgroundColor: value === option.value ? '#eff6ff' : 'white',
                }}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="mt-1 mr-3 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.value}
                className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary-300 hover:bg-primary-50"
                style={{
                  borderColor: (value || []).includes(option.value) ? '#2563eb' : '#e5e7eb',
                  backgroundColor: (value || []).includes(option.value) ? '#eff6ff' : 'white',
                }}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={(value || []).includes(option.value)}
                  onChange={(e) => handleInputChange(question.id, e.target.value, true)}
                  className="mt-1 mr-3 text-primary-600 focus:ring-primary-500 rounded"
                />
                <span className="text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="input-field text-lg"
          >
            <option value="">-- Select an option --</option>
            {question.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'slider':
        return (
          <div className="py-4">
            <div className="mb-6">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={value}
                onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - question.min) / (question.max - question.min)) * 100}%, #e5e7eb ${((value - question.min) / (question.max - question.min)) * 100}%, #e5e7eb 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-sm">
              {Object.entries(question.labels).map(([val, label]) => (
                <div
                  key={val}
                  className={`text-center ${parseInt(val) === value ? 'font-bold text-primary-600' : 'text-gray-500'}`}
                  style={{ flex: 1 }}
                >
                  <div className="font-semibold text-lg mb-1">{val}</div>
                  <div className="text-xs">{label}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold">
                Selected: {value}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            HSWC Readiness Assessment
          </h1>
          <p className="text-gray-600">
            Section {currentSection + 1} of {sections.length}:{' '}
            {currentSectionData.title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Section Card */}
        <div className="card mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentSectionData.title}
          </h2>
          <p className="text-gray-600 mb-8">{currentSectionData.description}</p>

          {/* Questions */}
          <div className="space-y-8">
            {currentSectionData.questions.map((question) => (
              <div key={question.id}>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  {question.label}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderQuestion(question)}
                {errors[question.id] && (
                  <p className="mt-2 text-sm text-red-600">{errors[question.id]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentSection === 0}
            className={`btn-secondary ${currentSection === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button onClick={handleNext} className="btn-primary">
            {currentSection === sections.length - 1 ? (
              <>
                Get My Recommendations
                <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </>
            ) : (
              <>
                Next Section
                <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
