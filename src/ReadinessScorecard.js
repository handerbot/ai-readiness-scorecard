import React, { useState } from 'react';

const categories = [
  {
    name: 'Data and Strategy Services',
    questions: [
      'Do you have a clear data strategy documented?',
      'Have you defined data governance policies for access, security, and quality?',
      'Are your data objectives aligned with your business objectives?',
      'Do you have well-defined processes for capturing, storing, and using data?',
    ],
    recommendation: [
      'Workshops to align objectives, create governance structures, and develop a data strategy document.',
      'Implementing data governance tools for monitoring data quality and compliance.',
      'Utilizing data analytics platforms for improved decision-making.'
    ],
    aiSolution: 'AI Profiling Engagement (AI-driven data analytics for enhanced decision-making).',
    benchmark: 'You form part of the 70% of companies that have not fully optimized their data strategy. Achieving a mature state within the next 2 years can improve operational efficiency by 50%.',
  },
  {
    name: 'Data Assessment and Integrations',
    questions: [
      'Do you have all your data sources identified and documented?',
      'Is your data clean and structured for analysis?',
      'Are your systems integrated (CRM, web analytics, media, sales, etc.)?',
      'Do you have processes for ongoing data quality assurance?',
    ],
    recommendation: [
      'Conducting a thorough data assessment and cleansing process.',
      'Implementing API-based integrations for seamless data exchange.',
      'Building ETL workflows to unify data for analysis.'
    ],
    aiSolution: 'AI Behavioral Data Collection, AI Interactive Dashboard (AI-powered data integration and visualization).',
    benchmark: 'You form part of the 60% of companies struggling with data integration. Improving integration within 2 years can enhance efficiency by up to 40%.',
  },
  {
    name: 'Strategy and Consulting for Use Case Definition',
    questions: [
      'Have you identified AI use cases that align with your business objectives?',
      'Do you have clear KPIs defined for AI solutions?',
      'Do you have a roadmap for AI adoption?',
    ],
    recommendation: [
      'Conducting workshops to identify high-value AI use cases.',
      'Defining clear KPIs to measure AI performance.',
      'Creating a roadmap for AI adoption aligned with business goals.'
    ],
    aiSolution: 'AI Campaign Hub (Identify and optimize high-value AI use cases).',
    benchmark: 'You are among the 55% of companies lacking defined AI use cases. Establishing a roadmap within 2 years will enable measurable performance improvements.',
  },
  {
    name: 'BI and Reporting Setup',
    questions: [
      'Do you have business intelligence tools implemented (e.g., Tableau, Power BI, Looker)?',
      'Are your dashboards optimized for reporting?',
      'Do you have automated reporting processes in place?',
    ],
    recommendation: [
      'Implementing AI-driven dashboards for predictive analytics and real-time insights.',
      'Setting up automated reporting workflows for consistent monitoring.',
      'Integrating data sources into a unified reporting platform.'
    ],
    aiSolution: 'AI Interactive Dashboard, Brand Consistency Auditing (Improving decision-making through real-time insights).',
    benchmark: 'You belong to the 65% of companies leveraging BI tools but only 30% are using predictive analytics. Achieving maturity in 2 years could improve decision-making efficiency by 60%.',
  },
  {
    name: 'Creative and Content',
    questions: [
      'Do you have a documented creative strategy and brand guidelines?',
      'Is your creative content consistent across all platforms?',
      'Do you have a library of marketing assets readily available?',
    ],
    recommendation: [
      'Developing a comprehensive content strategy aligned with brand objectives.',
      'Creating a repository of marketing assets for consistent messaging.',
      'Leveraging AI tools to enhance creativity and productivity.'
    ],
    aiSolution: 'AI Content Factory, AI-Powered Risk Management Tool',
    benchmark: '80% of companies have a creative strategy, but only 40% leverage AI tools for enhancing creativity. Implementing AI solutions can boost content efficiency by 50%.',
  },
  {
    name: 'User Experience Strategy',
    questions: [
      'Have you mapped user journeys for all major user interactions?',
      'Do you have clear interaction designs for chatbots or AI agents?',
      'Have you conducted UX research and testing sessions?',
    ],
    recommendation: [
      'Mapping user journeys to identify pain points and opportunities.',
      'Conducting UX research and testing to improve user experience.',
      'Implementing AI Experience Agents to enhance customer interaction and satisfaction.'
    ],
    aiSolution: 'AI Experience Agent',
    benchmark: 'Only 75% of companies conduct regular UX research. Improving this process with AI can enhance satisfaction rates by 40%.',
  },
  {
    name: 'Tech Stack and Development',
    questions: [
      'Do you have a stable digital platform for AI integrations (websites, apps, etc.)?',
      'Are your platforms optimized for collecting and processing data?',
      'Do you have established processes for deployment, testing, and maintenance?',
    ],
    recommendation: [
      'Optimizing your tech stack for better performance and scalability.',
      'Implementing processes for continuous deployment and testing.',
      'Integrating AI solutions for enhanced performance and maintenance.'
    ],
    aiSolution: 'AI Content Factory, AI Experience Agent',
    benchmark: '68% of companies struggle with tech integration. Implementing AI solutions can improve efficiency by 45% over the next two years.',
  },
  {
    name: 'Automation and Personalization',
    questions: [
      'Do you have marketing automation tools configured (e.g., HubSpot, Salesforce)?',
      'Do you use audience segmentation tools?',
      'Do you have A/B testing frameworks in place?',
    ],
    recommendation: [
      'Setting up marketing automation tools for enhanced productivity.',
      'Implementing audience segmentation for personalized marketing.',
      'Utilizing AI tools for advanced analytics and optimization.'
    ],
    aiSolution: 'AI Campaign Hub, AI Profiling Engagement',
    benchmark: '50% of companies utilize automation tools but only 30% personalize experiences effectively. Implementing AI can increase personalization efficiency by 60%.',
  }
];

const ReadinessScorecard = () => {
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState([]);

  const handleChange = (category, index, value) => {
    setResponses({
      ...responses,
      [`${category}-${index}`]: value,
    });
  };

  const handleSubmit = () => {
    const newResults = categories.map(category => {
      const totalQuestions = category.questions.length;
      let score = 0;

      category.questions.forEach((_, index) => {
        const key = `${category.name}-${index}`;
        const responseValue = parseInt(responses[key]);

        if (!isNaN(responseValue)) {
          score += responseValue;
        }
      });

      const averageScore = (score / totalQuestions).toFixed(2);
      return { ...category, score: averageScore };
    });

    setResults(newResults);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">AI Readiness Scorecard</h1>
      {categories.map((category, secIndex) => (
        <div key={secIndex} className="bg-white p-6 mb-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
          {category.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-4">
              <label className="block mb-2">{question}</label>
              <input 
                type="number"
                min="0"
                max="5"
                onChange={(e) => handleChange(category.name, qIndex, e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
          ))}
        </div>
      ))}

      <button 
        onClick={handleSubmit} 
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-8"
      >
        Submit
      </button>
      
      {results.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-3xl font-bold mb-4">Results</h2>
          {results.map((result, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-bold">{result.name}</h3>
              <p>AI Readiness Score: {result.score} / 5</p>
              <p><strong>Industry Benchmark:</strong> {result.benchmark}</p>
              <p><strong>AI Solution Recommendation:</strong> {result.aiSolution}</p>
              <p><strong>Recommended Foundational Services:</strong></p>
              <ul>
                {result.recommendation.map((rec, idx) => (
                  <li key={idx}>- {rec}</li>
                ))}
              </ul>
              <hr className="my-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadinessScorecard;