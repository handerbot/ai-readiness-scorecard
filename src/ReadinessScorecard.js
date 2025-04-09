import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Define categories and their questions, benchmarks, and recommendations
const categories = [
  {
    name: 'Data and Strategy Services',
    questions: [
      'Do you have a clear data strategy documented?',
      'Have you defined data governance policies for access, security, and quality?',
      'Are your data objectives aligned with your business objectives?',
      'Do you have well-defined processes for capturing, storing, and using data?',
    ],
    benchmark: '70% of companies struggle with aligning their data strategy with business objectives. Achieving maturity within 2 years can significantly boost efficiency by 50%.',
    recommendations: {
      low: [
        'Develop a clear data strategy that aligns with your business objectives.',
        'Implement basic data governance policies for security and quality.',
        'Consider using AI tools for basic analytics and decision-making.'
      ],
      medium: [
        'Refine your data governance policies for enhanced security and quality.',
        'Optimize data analytics platforms to provide better insights.',
        'Increase collaboration across departments to improve data strategy.'
      ],
      high: [
        'Leverage advanced AI tools for predictive analytics and optimization.',
        'Expand your data governance framework to ensure consistency and compliance.',
        'Consider implementing AI-driven decision-making processes across all departments.'
      ]
    }
  },
  {
    name: 'Data Assessment and Integrations',
    questions: [
      'Do you have all your data sources identified and documented?',
      'Is your data clean and structured for analysis?',
      'Are your systems integrated (CRM, web analytics, media, sales, etc.)?',
      'Do you have processes for ongoing data quality assurance?',
    ],
    benchmark: '60% of companies struggle with data integration. Improving integration within 2 years can enhance efficiency by up to 40%.',
    recommendations: {
      low: [
        'Conduct a data audit to identify all available sources.',
        'Implement data cleansing processes to improve data quality.',
        'Start integrating systems using basic API connections.'
      ],
      medium: [
        'Optimize data integration processes for better accuracy and consistency.',
        'Implement automated data quality assurance processes.',
        'Ensure all systems are well-integrated for seamless data exchange.'
      ],
      high: [
        'Use AI tools for real-time data integration and quality assessment.',
        'Continuously optimize data systems to enhance performance.',
        'Implement predictive analytics for improved decision-making.'
      ]
    }
  },
  {
    name: 'Strategy and Consulting for Use Case Definition',
    questions: [
      'Have you identified AI use cases that align with your business objectives?',
      'Do you have clear KPIs defined for AI solutions?',
      'Do you have a roadmap for AI adoption?',
    ],
    benchmark: '55% of companies lack clear AI use cases. Proper use case definition can enhance AI adoption by 30%.',
    recommendations: {
      low: [
        'Identify and document relevant AI use cases aligned with your objectives.',
        'Define KPIs to measure success effectively.',
        'Create a clear roadmap for AI adoption.'
      ],
      medium: [
        'Refine existing AI use cases to improve performance.',
        'Adjust KPIs based on recent performance metrics.',
        'Ensure your roadmap is adaptable to changing business needs.'
      ],
      high: [
        'Expand AI use cases to cover more business functions.',
        'Regularly update KPIs to stay aligned with business goals.',
        'Optimize your roadmap to incorporate the latest AI technologies.'
      ]
    }
  },
  {
    name: 'BI and Reporting Setup',
    questions: [
      'Do you have business intelligence tools implemented (e.g., Tableau, Power BI, Looker)?',
      'Are your dashboards optimized for reporting?',
      'Do you have automated reporting processes in place?',
    ],
    benchmark: '45% of companies rely on outdated reporting systems. Automating reports can improve accuracy by 35%.',
    recommendations: {
      low: [
        'Implement BI tools to improve decision-making processes.',
        'Create dashboards for better visualization of key metrics.',
        'Automate reporting processes for higher efficiency.'
      ],
      medium: [
        'Optimize existing dashboards for better insights.',
        'Refine automated reporting processes for accuracy.',
        'Ensure reporting tools are up-to-date and integrated.'
      ],
      high: [
        'Leverage predictive analytics for more powerful reporting.',
        'Optimize existing systems with AI-powered tools.',
        'Regularly review and improve reporting processes.'
      ]
    }
  },
  {
    name: 'Creative and Content',
    questions: [
      'Do you have a documented creative strategy and brand guidelines?',
      'Is your creative content consistent across all platforms?',
      'Do you have a library of marketing assets readily available?',
    ],
    benchmark: '80% of companies have a creative strategy, but only 40% leverage AI tools. Implementing AI can boost efficiency by 50%.',
    recommendations: {
      low: [
        'Develop a comprehensive content strategy aligned with brand objectives.',
        'Create a repository of marketing assets for consistent messaging.',
        'Implement AI tools for creative automation and scaling.'
      ],
      medium: [
        'Optimize your creative strategy by aligning it with business objectives.',
        'Leverage AI tools to enhance content production efficiency.',
        'Ensure consistency across all platforms through automated processes.'
      ],
      high: [
        'Expand AI usage for creativity enhancement and personalization.',
        'Continuously optimize creative strategies based on performance insights.',
        'Leverage advanced AI tools for predictive creative strategies.'
      ]
    }
  },
  {
    name: 'User Experience Strategy',
    questions: [
      'Have you mapped user journeys for all major user interactions?',
      'Do you have clear interaction designs for chatbots or AI agents?',
      'Have you conducted UX research and testing sessions?',
    ],
    benchmark: '75% of companies conduct regular UX research. Improving this process with AI can enhance satisfaction by 40%.',
    recommendations: {
      low: [
        'Start mapping user journeys to identify pain points and opportunities.',
        'Conduct UX research to understand user needs.',
        'Implement foundational interaction designs for AI agents.'
      ],
      medium: [
        'Refine user journeys to optimize user experience.',
        'Improve interaction designs through usability testing.',
        'Leverage AI tools for deeper user insights and analytics.'
      ],
      high: [
        'Continuously enhance UX designs with AI-driven insights.',
        'Optimize interaction designs to improve engagement and satisfaction.',
        'Implement predictive AI tools for proactive user experience improvements.'
      ]
    }
  },
  {
    name: 'Tech Stack and Development',
    questions: [
      'Do you have a stable digital platform for AI integrations (websites, apps, etc.)?',
      'Are your platforms optimized for collecting and processing data?',
      'Do you have established processes for deployment, testing, and maintenance?',
    ],
    benchmark: '68% of companies struggle with tech integration. Implementing AI solutions can improve efficiency by 45% over the next two years.',
    recommendations: {
      low: [
        'Implement foundational technologies for better scalability.',
        'Optimize platforms for improved data collection and processing.',
        'Create processes for consistent deployment and testing.'
      ],
      medium: [
        'Refine your tech stack to improve integration and efficiency.',
        'Leverage AI tools for enhanced platform optimization.',
        'Improve deployment processes for faster iteration and testing.'
      ],
      high: [
        'Expand AI integrations across all digital platforms.',
        'Continuously optimize platforms for high performance and scalability.',
        'Implement cutting-edge AI technologies for enhanced efficiency.'
      ]
    }
  },
  {
    name: 'Automation and Personalization',
    questions: [
      'Do you have marketing automation tools configured (e.g., HubSpot, Salesforce)?',
      'Do you use audience segmentation tools?',
      'Do you have A/B testing frameworks in place?',
    ],
    benchmark: '50% of companies utilize automation tools but only 30% personalize experiences effectively. Implementing AI can increase personalization efficiency by 60%.',
    recommendations: {
      low: [
        'Implement basic marketing automation tools for efficiency.',
        'Begin segmenting audiences to personalize messaging.',
        'Use A/B testing frameworks to optimize marketing strategies.'
      ],
      medium: [
        'Optimize existing automation tools for better performance.',
        'Leverage AI for more precise audience segmentation.',
        'Improve A/B testing methodologies to enhance conversion rates.'
      ],
      high: [
        'Expand automation capabilities with AI-driven personalization tools.',
        'Implement predictive AI tools for hyper-personalization.',
        'Continuously improve marketing automation systems for better results.'
      ]
    }
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
        const calculateGlobalSummary = (results) => {
            let totalScore = 0;
            let totalQuestions = 0;
          
            results.forEach(result => {
              totalScore += parseFloat(result.score) * result.questions.length;
              totalQuestions += result.questions.length;
            });
          
            const overallAverageScore = (totalScore / totalQuestions).toFixed(2);
            let overallSummary = '';
            let overallGrade = '';
          
            if (overallAverageScore <= 2) {
              overallSummary = 'Your overall readiness is low. There are foundational aspects that require immediate attention to enhance your performance.';
              overallGrade = 'Low';
            } else if (overallAverageScore <= 4) {
              overallSummary = 'Your overall readiness is moderate. You are performing well, but there are areas that need improvement to reach optimal performance.';
              overallGrade = 'Medium';
            } else {
              overallSummary = 'Your overall readiness is high. Your practices are well-aligned with industry standards and are functioning effectively.';
              overallGrade = 'High';
            }
          
            return { overallAverageScore, overallSummary, overallGrade };
          };          
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
        let summary = '';
        let recommendation = [];
  
        if (averageScore <= 2) {
          summary = 'There is significant room for improvement. Implementing foundational practices would enhance your performance.';
          recommendation = category.recommendations.low;
        } else if (averageScore <= 4) {
          summary = 'You are performing well but there are areas for improvement. Consider optimizing certain processes.';
          recommendation = category.recommendations.medium;
        } else {
          summary = 'Your performance in this area is excellent. Your current practices are well-aligned with industry standards.';
          recommendation = category.recommendations.high;
        }
  
        return { 
          ...category, 
          score: averageScore, 
          summary, 
          recommendation 
        };
      });
  
      setResults(newResults);
    };

    const exportToPDF = () => {
        const input = document.getElementById('report');
        html2canvas(input).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
          pdf.save('AI_Readiness_Scorecard_Report.pdf');
        });
      };
    
      return (
        <div className="p-8 bg-gray-100 min-h-screen font-sans">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">AI Readiness Scorecard</h1>
          
          {categories.map((category, secIndex) => (
            <div key={secIndex} className="bg-white p-6 mb-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">{category.name}</h2>
              {category.questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-4">
                  <label className="block mb-2 text-gray-700">{question}</label>
                  <input 
                    type="number"
                    min="0"
                    max="5"
                    onChange={(e) => handleChange(category.name, qIndex, e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-300"
                  />
                </div>
              ))}
            </div>
          ))}
    
          <div className="text-center">
            <button 
              onClick={handleSubmit} 
              className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition"
            >
              Submit
            </button>
          </div>
          
          {results.length > 0 && (
            <div id="report" className="bg-white p-6 mt-10 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-blue-700 mb-6">Results</h2>
              {results.map((result, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-bold text-blue-600">{result.name}</h3>
                  <p><strong>Score:</strong> {result.score} / 5</p>
                  <p><strong>Summary:</strong> {result.summary}</p>
                  <p><strong>Industry Benchmark:</strong> {result.benchmark}</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {result.recommendation.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                  <hr className="my-4" />
                </div>
              ))}
              <button 
                onClick={exportToPDF} 
                className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition mt-4"
              >
                Export to PDF
              </button>
            </div>
          )}
        </div>
      );
    };
    
    export default ReadinessScorecard;