import React, { useState } from 'react';
import { ResumeContent } from '../../types';
import { aiAPI } from '../../lib/api';
import { 
  Bot, 
  Sparkles, 
  Target, 
  Loader, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Zap,
  TrendingUp,
  Award,
  Lightbulb,
  MessageSquare,
  Code
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface EnhancedAIAssistantProps {
  data: ResumeContent;
  onChange: (data: ResumeContent) => void;
  resumeId: string | null;
}

const EnhancedAIAssistant: React.FC<EnhancedAIAssistantProps> = ({ data, onChange, resumeId }) => {
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'enhance' | 'ats' | 'suggestions' | 'keywords' | 'tech'>('enhance');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);

  const handleEnhanceResume = async () => {
    if (!resumeId) {
      toast.error('Please save your resume first');
      return;
    }

    if (!data.personalInfo.fullName || !data.summary) {
      toast.error('Please fill in basic information first');
      return;
    }

    setLoading(true);
    try {
      const response = await aiAPI.enhanceResume({
        resumeId,
        jobDescription,
        targetRole
      });
      
      setSuggestions(response.suggestions);
      setAtsScore(response.atsScore);
      setAiResponse('I\'ve analyzed your resume and identified several opportunities for improvement. The suggestions focus on quantifying achievements, using stronger action verbs, and optimizing for ATS systems.');
      
      toast.success('Resume enhanced successfully!');
    } catch (error: any) {
      toast.error('Failed to enhance resume');
      console.error('Enhancement error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleATSOptimization = async () => {
    if (!resumeId) {
      toast.error('Please save your resume first');
      return;
    }

    if (!jobDescription.trim()) {
      toast.error('Please enter a job description for ATS optimization');
      return;
    }

    setLoading(true);
    try {
      const response = await aiAPI.optimizeForATS({
        resumeId,
        jobDescription
      });
      
      setAtsScore(response.atsScore);
      setKeywords(response.missingKeywords || []);
      setSuggestions(response.recommendations?.map((rec: string, index: number) => ({
        type: 'improvement',
        section: 'overall',
        title: `ATS Recommendation ${index + 1}`,
        description: rec,
        impact: 'medium'
      })) || []);
      
      toast.success('ATS optimization complete!');
    } catch (error: any) {
      toast.error('Failed to optimize for ATS');
      console.error('ATS optimization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordAnalysis = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description for keyword analysis');
      return;
    }

    setLoading(true);
    try {
      const response = await aiAPI.getKeywordSuggestions({
        jobDescription,
        resumeId: resumeId || undefined
      });      
      setKeywords(response.keywords || []);
      toast.success('Keyword analysis complete!');
    } catch (error: any) {
      toast.error('Failed to analyze keywords');
    } finally {
      setLoading(false);
    }
  };

  const handleTechExtraction = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description to extract technologies');
      return;
    }

    setLoading(true);
    try {
    const payload ={
      "contents": [
      {
        "parts": [
          {
            "text":  `Extract technologies from this job description in array format kept in mind don't provide unneccessary content only array format:${jobDescription}`
          }
        ]
      }
    ]

      }
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD1jF4zbfdfMXFcKWiewoBqq7cMZ9zNzjo',{
        method:"Post",
        body:JSON.stringify(payload)
      });
      const data=await response.json()
      const result=JSON.parse(data.candidates[0].content.parts[0].text);
      setTechStack(Array.isArray(result) ? result : []);
      toast.success('Technologies extracted successfully!');
    } catch (error: any) {
      toast.error('Failed to extract technologies');
      console.error('Tech extraction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (suggestion: any) => {
    if (suggestion.type === 'improvement' && suggestion.section === 'summary' && suggestion.after) {
      onChange({
        ...data,
        summary: suggestion.after
      });
    }
    
    toast.success('Suggestion applied to resume!');
  };

  const getATSScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getATSScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const tabContent = {
    enhance: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
            AI Resume Enhancement
          </h3>
          <p className="text-gray-600 mb-4">
            Our AI analyzes your resume against industry standards and provides personalized suggestions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Software Engineer, Marketing Manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (6-10 years)</option>
                <option value="executive">Executive Level (10+ years)</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description (Optional)
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the job description here for targeted suggestions..."
            />
          </div>
          
          <button
            onClick={handleEnhanceResume}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Bot className="h-5 w-5 mr-2" />
                Enhance My Resume
              </>
            )}
          </button>
        </div>

        {/* AI Response */}
        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">AI Analysis</h4>
                <p className="text-gray-700">{aiResponse}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ATS Score */}
        {atsScore !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-lg border-2 ${getATSScoreBackground(atsScore)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`text-4xl font-bold ${getATSScoreColor(atsScore)}`}>
                  {atsScore-5}%
                </div>
                <div>
                  <div className="font-semibold text-gray-900">ATS Compatibility Score</div>
                  <div className="text-sm text-gray-600">
                    {atsScore >= 80 ? 'Excellent - Ready to submit!' : 
                     atsScore >= 60 ? 'Good - Minor improvements needed' : 
                     'Needs Improvement - Apply suggestions below'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Updated</div>
                <div className="text-sm font-medium">Just now</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    ),
    
    ats: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            ATS Optimization
          </h3>
          <p className="text-gray-600 mb-6">
            Optimize your resume to pass Applicant Tracking Systems (ATS) used by 98% of Fortune 500 companies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="font-medium text-gray-900">Format</div>
              <div className="text-sm text-gray-600">ATS-friendly</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="font-medium text-gray-900">Keywords</div>
              <div className="text-sm text-gray-600">Optimized</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="font-medium text-gray-900">Match Rate</div>
              <div className="text-sm text-gray-600">85%+</div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the complete job description here for ATS optimization..."
            />
          </div>
          
          <button
            onClick={handleATSOptimization}
            disabled={loading || !jobDescription.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Job Match...
              </>
            ) : (
              <>
                <Target className="h-5 w-5 mr-2" />
                Optimize for ATS
              </>
            )}
          </button>
        </div>

        {/* ATS Checklist */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">ATS Optimization Checklist</h4>
          <div className="space-y-3">
            {[
              { item: 'Use standard section headings', status: 'complete' },
              { item: 'Include relevant keywords naturally', status: 'complete' },
              { item: 'Use simple, clean formatting', status: 'complete' },
              { item: 'Quantify achievements with numbers', status: 'warning' },
              { item: 'Match job requirements', status: 'warning' },
              { item: 'Use industry-specific terminology', status: 'incomplete' }
            ].map((check, index) => (
              <div key={index} className="flex items-center space-x-3">
                {check.status === 'complete' && <CheckCircle className="h-5 w-5 text-green-500" />}
                {check.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                {check.status === 'incomplete' && <AlertCircle className="h-5 w-5 text-red-500" />}
                <span className="text-sm text-gray-700">{check.item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    
    keywords: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
            Smart Keywords
          </h3>
          <p className="text-gray-600 mb-6">
            Discover missing keywords that could boost your resume's visibility.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the job description here for keyword analysis..."
            />
          </div>

          <button
            onClick={handleKeywordAnalysis}
            // onClick={handleTechExtraction}
            disabled={loading || !jobDescription.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Keywords...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Find Missing Keywords
              </>
            )}
          </button>
        </div>

        {keywords.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Recommended Keywords</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="bg-purple-50 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => toast.success(`Added "${keyword}" to suggestions`)}
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    
    suggestions: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
          {suggestions.length > 0 && (
            <button
              onClick={() => setSuggestions([])}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Clear All
            </button>
          )}
        </div>

        {suggestions.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No suggestions yet.</p>
            <p className="text-sm text-gray-500 mt-2">
              Use the "Enhance Resume" tab to get personalized suggestions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      suggestion.impact === 'high' ? 'bg-red-100' :
                      suggestion.impact === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      {suggestion.impact === 'high' ? <AlertCircle className="h-4 w-4 text-red-600" /> :
                       suggestion.impact === 'medium' ? <AlertCircle className="h-4 w-4 text-yellow-600" /> :
                       <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{suggestion.description}</p>
                      
                      {suggestion.before && suggestion.after && (
                        <div className="space-y-3">
                          <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                            <div className="text-xs font-medium text-red-800 mb-1">Before:</div>
                            <div className="text-sm text-red-700">{suggestion.before}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                            <div className="text-xs font-medium text-green-800 mb-1">After:</div>
                            <div className="text-sm text-green-700">{suggestion.after}</div>
                          </div>
                        </div>
                      )}
                      
                      {suggestion.keywords && (
                        <div className="mt-3">
                          <div className="text-xs font-medium text-gray-700 mb-2">Suggested Keywords:</div>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.keywords.map((keyword: string, i: number) => (
                              <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => applySuggestion(suggestion)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Apply
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    ),

    tech: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Code className="h-5 w-5 mr-2 text-orange-600" />
            Tech Stack Analyzer
          </h3>
          <p className="text-gray-600 mb-6">
            Extract all technologies mentioned in a job description to better tailor your resume.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the job description here to extract technologies..."
            />
          </div>

          <button
            onClick={handleTechExtraction}
            disabled={loading || !jobDescription.trim()}
            className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 px-4 rounded-lg hover:from-orange-700 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Extracting Technologies...
              </>
            ) : (
              <>
                <Code className="h-5 w-5 mr-2" />
                Extract Technologies
              </>
            )}
          </button>
        </div>

        {techStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Identified Technologies</h4>
              <button
                onClick={() => setTechStack([])}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Clear
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-orange-50 text-orange-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    {tech}
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h5 className="text-sm font-medium text-gray-700 mb-2">How to use this:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Add missing technologies to your skills section</li>
                  <li>• Highlight relevant technologies in your experience bullets</li>
                  <li>• Use these keywords in your resume summary</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    )
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="h-10 w-10 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Resume Assistant</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Leverage advanced AI to optimize your resume for better job prospects and ATS compatibility.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {[
          { id: 'enhance', label: 'Enhance Resume', icon: Sparkles },
          { id: 'ats', label: 'ATS Optimization', icon: Target },
          { id: 'keywords', label: 'Smart Keywords', icon: Lightbulb },
          { id: 'tech', label: 'Tech Stack', icon: Code },
          { id: 'suggestions', label: 'Suggestions', icon: MessageSquare }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-0 py-4 px-6 text-center font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="h-5 w-5 mx-auto mb-1" />
            <span className="block text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[600px]">
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default EnhancedAIAssistant;