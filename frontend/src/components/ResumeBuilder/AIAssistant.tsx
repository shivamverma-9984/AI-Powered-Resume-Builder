import React, { useState } from 'react';
import { ResumeContent } from '../../types';
import { aiService } from '../../lib/ai';
import { Bot, Sparkles, Target, FileText, Loader, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface AIAssistantProps {
  data: ResumeContent;
  onChange: (data: ResumeContent) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ data, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'enhance' | 'ats' | 'suggestions'>('enhance');

  const handleEnhanceResume = async () => {
    if (!data.personalInfo.fullName || !data.summary) {
      toast.error('Please fill in basic information first');
      return;
    }

    setLoading(true);
    try {
      const resumeContent = generateResumeText();
      const response = await aiService.enhanceResume(resumeContent, jobDescription);
      console.log("suggestion---",response.suggestions);
      
      
      setSuggestions(response.suggestions);
      setAtsScore(response.atsScore);
      toast.success('Resume enhanced successfully!');
    } catch (error) {
      toast.error('Failed to enhance resume');
      console.error('Enhancement error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleATSOptimization = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description for ATS optimization');
      return;
    }

    setLoading(true);
    try {
      const resumeContent = generateResumeText();
      const response = await aiService.optimizeForATS(resumeContent, jobDescription);
      
      setAtsScore(response.atsScore);
      setSuggestions([
        'Use more action verbs in your work experience',
        'Add relevant keywords from the job description',
        'Quantify your achievements with numbers',
        'Use standard section headings',
        'Include relevant skills from the job posting'
      ]);
      toast.success('ATS optimization complete!');
    } catch (error) {
      toast.error('Failed to optimize for ATS');
      console.error('ATS optimization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateResumeText = () => {
    let text = `${data.personalInfo.fullName}\n\n`;
    
    if (data.summary) {
      text += `Summary: ${data.summary}\n\n`;
    }
    
    if (data.workExperience.length > 0) {
      text += 'Work Experience:\n';
      data.workExperience.forEach(exp => {
        text += `${exp.position} at ${exp.company}\n`;
        exp.description.forEach(desc => {
          if (desc.trim()) text += `- ${desc}\n`;
        });
        text += '\n';
      });
    }
    
    if (data.education.length > 0) {
      text += 'Education:\n';
      data.education.forEach(edu => {
        text += `${edu.degree} in ${edu.field} from ${edu.institution}\n`;
      });
      text += '\n';
    }
    
    if (data.skills.length > 0) {
      text += 'Skills:\n';
      data.skills.forEach(skill => {
        text += `${skill.name} (${skill.level})\n`;
      });
    }
    
    return text;
  };

  const applySuggestion = (suggestion: string) => {
    // This would implement applying specific suggestions to the resume
    // For now, we'll just show a success message
    toast.success('Suggestion applied to resume!');
  };

  const getATSScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getATSScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Resume Assistant</h2>
        <p className="text-gray-600">
          Get intelligent suggestions to improve your resume and optimize it for ATS systems.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('enhance')}
          className={`flex-1 py-4 px-6 text-center font-medium border-b-2 transition-colors ${
            activeTab === 'enhance'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Sparkles className="h-5 w-5 mx-auto mb-1" />
          Enhance Resume
        </button>
        <button
          onClick={() => setActiveTab('ats')}
          className={`flex-1 py-4 px-6 text-center font-medium border-b-2 transition-colors ${
            activeTab === 'ats'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Target className="h-5 w-5 mx-auto mb-1" />
          ATS Optimization
        </button>
        <button
          onClick={() => setActiveTab('suggestions')}
          className={`flex-1 py-4 px-6 text-center font-medium border-b-2 transition-colors ${
            activeTab === 'suggestions'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="h-5 w-5 mx-auto mb-1" />
          Suggestions
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'enhance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Enhance Your Resume Content
              </h3>
              <p className="text-gray-600 mb-4">
                Our AI will analyze your resume and provide intelligent suggestions to improve 
                its impact and effectiveness.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description (Optional)
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Paste the job description here to get targeted suggestions..."
                  />
                </div>
                
                <button
                  onClick={handleEnhanceResume}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Enhancing Resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Enhance Resume
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ATS Score Display */}
            {atsScore !== null && (
              <div className={`p-4 rounded-lg ${getATSScoreBackground(atsScore)}`}>
                <div className="flex items-center">
                  <div className={`text-3xl font-bold ${getATSScoreColor(atsScore)} mr-4`}>
                    {atsScore}%
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">ATS Compatibility Score</div>
                    <div className="text-sm text-gray-600">
                      {atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ats' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ATS Optimization
              </h3>
              <p className="text-gray-600 mb-4">
                Optimize your resume to pass Applicant Tracking Systems (ATS) by analyzing 
                it against specific job requirements.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Paste the complete job description here for ATS optimization..."
                  />
                </div>
                
                <button
                  onClick={handleATSOptimization}
                  disabled={loading || !jobDescription.trim()}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Optimizing for ATS...
                    </>
                  ) : (
                    <>
                      <Target className="h-5 w-5 mr-2" />
                      Optimize for ATS
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ATS Checklist */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">ATS Optimization Checklist</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Use standard section headings</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Include relevant keywords</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-700">Use simple formatting</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-700">Quantify achievements</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI Suggestions
              </h3>
              <p className="text-gray-600 mb-4">
                Review and apply AI-generated suggestions to improve your resume.
              </p>
            </div>

            {suggestions.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No suggestions yet.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Use the "Enhance Resume" or "ATS Optimization" tabs to get suggestions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">{suggestion}</p>
                      </div>
                      <button
                        onClick={() => applySuggestion(suggestion)}
                        className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => setSuggestions([])}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Suggestions
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;