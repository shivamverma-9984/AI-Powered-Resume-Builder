import React, { useState } from 'react';
import { FileText, Lightbulb, Sparkles, Copy, Check, Wand2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}
const SummaryForm :React.FC<SummaryFormProps>  = ({ data, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateAISuggestions = async () => {
    if (!data.trim()) {
      toast.error('Please enter some initial summary to generate suggestions');
      return;
    }

    setLoading(true);
    setAiSuggestions([]); // Clear previous suggestions
    try {
      const prompt = `Generate 3 concise professional summary variations as a bulleted list based on: "${data}". 
      Each bullet point should be a complete 2-3 sentence summary. Format exactly like:
      - First summary suggestion...
      - Second summary suggestion...
      - Third summary suggestion...`;

      const payload = {
        "contents": [{
          "parts": [{
            "text": prompt
          }]
        }]
      };

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD1jF4zbfdfMXFcKWiewoBqq7cMZ9zNzjo', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();
      const textResponse = responseData.candidates[0].content.parts[0].text;
      
      // Extract bullet points from the response
      const suggestions = textResponse
        .split('\n')
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(2).trim());
      
      setAiSuggestions(suggestions.length > 0 ? suggestions : [textResponse]);
      setShowSuggestions(true);
      toast.success('AI suggestions generated successfully!');
    } catch (error) {
      toast.error('Failed to generate AI suggestions');
      console.error('AI suggestion error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to split suggestion into 3 paragraphs
  const splitIntoThreeParagraphs = (text:string) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length <= 3) {
      // If 3 or fewer sentences, each gets its own paragraph
      return sentences.map(s => s.trim() + '.').filter(s => s.length > 1);
    } else {
      // Distribute sentences across 3 paragraphs
      const paragraphs = [];
      const sentencesPerParagraph = Math.ceil(sentences.length / 3);
      
      for (let i = 0; i < 3; i++) {
        const start = i * sentencesPerParagraph;
        const end = Math.min(start + sentencesPerParagraph, sentences.length);
        const paragraphSentences = sentences.slice(start, end);
        
        if (paragraphSentences.length > 0) {
          paragraphs.push(paragraphSentences.map(s => s.trim()).join('. ') + '.');
        }
      }
      
      return paragraphs.filter(p => p.length > 1);
    }
  };

  const handleSuggestionClick = (suggestion:string) => {
    onChange(suggestion);
    toast.success('Summary updated!');
  };

  const copySuggestion = async (suggestion:string, index:number) => {
    try {
      await navigator.clipboard.writeText(suggestion);
      setCopiedIndex(index);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const wordCount = data.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = data.length;
  const isOptimalLength = wordCount >= 30 && wordCount <= 80;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg mr-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>
            <p className="text-gray-600 mt-1">Craft a compelling overview of your professional background</p>
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Writing Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Highlight your key achievements and years of experience</li>
                <li>• Include relevant skills and technologies</li>
                <li>• Keep it concise (30-80 words recommended)</li>
                <li>• Use action words and quantify results when possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Professional Summary *
            </label>
            <div className="flex items-center space-x-4">
              <span className={`text-xs px-2 py-1 rounded-full ${
                isOptimalLength 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {wordCount} words
              </span>
              <span className="text-xs text-gray-500">{charCount} characters</span>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={data}
              onChange={(e) => onChange(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
              placeholder="Example: Experienced software developer with 5+ years of expertise in full-stack development. Proficient in React, Node.js, and cloud technologies. Successfully led teams of 3-5 developers and delivered 15+ projects on time, resulting in 30% improved user engagement..."
            />
            
            {/* AI Generate Button */}
            <div className="absolute bottom-3 right-3">
              <button
                onClick={generateAISuggestions}
                disabled={loading || !data.trim()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  loading || !data.trim()
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    AI Enhance
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Character/Word Guidelines */}
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>
              {isOptimalLength ? (
                <span className="text-green-600 font-medium">✓ Optimal length</span>
              ) : wordCount < 30 ? (
                <span className="text-yellow-600">Consider adding more details</span>
              ) : (
                <span className="text-yellow-600">Consider making it more concise</span>
              )}
            </span>
            <span>Recommended: 30-80 words</span>
          </div>
        </div>

        {/* AI Suggestions Section */}
        {showSuggestions && aiSuggestions.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg mr-3">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI-Generated Suggestions</h4>
                  <p className="text-sm text-gray-600">Click any suggestion to use it, or copy to customize</p>
                </div>
              </div>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => {
                return (
                  <div
                    key={`ai-${index}`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200 group cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          Suggestion {index + 1}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copySuggestion(suggestion, index);
                        }}
                        className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-700 leading-relaxed mb-3 group-hover:text-gray-900 transition-colors duration-200">
                      {suggestion}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {suggestion.trim().split(/\s+/).length} words
                      </span>
                      <span className="text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Click to use →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 text-center">
              <button
                onClick={generateAISuggestions}
                disabled={loading}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2 mx-auto px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
              >
                <RefreshCw className="h-4 w-4" />
                Generate new suggestions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryForm;