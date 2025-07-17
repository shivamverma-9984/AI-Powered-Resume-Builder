import React from 'react';
import { FileText, Lightbulb } from 'lucide-react';
import { aiAPI } from '../../../lib/ai';

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange }) => {
  const exampleSummaries = [
    "Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams to success.",
    "Results-driven marketing professional with 7+ years of experience in digital marketing, brand management, and growth strategies. Skilled in SEO, content marketing, and data analytics with a passion for driving business growth.",
    "Dedicated healthcare professional with 8+ years of experience in patient care, medical administration, and healthcare technology. Committed to improving patient outcomes through innovative solutions and compassionate care."
  ];

  const handleExampleClick = (example: string) => {
    onChange(example);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Summary</h3>
        <p className="text-sm text-gray-600 mb-4">
          Write a brief overview of your professional background, key skills, and career objectives. 
          Keep it concise and impactful (2-3 sentences).
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary *
            </label>
            <textarea
              value={data}
              onChange={(e) => onChange(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your professional summary here..."
            />
          </div>

          {/* Example Summaries */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-900">Example Summaries</h4>
            </div>
            <div className="space-y-3">
              {exampleSummaries.map((example, index) => (
                <div key={index} className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-700 mb-2">{example}</p>
                  <button
                    onClick={() => handleExampleClick(example)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Use this example
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;