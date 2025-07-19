// AI service for resume enhancement and job description analysis
export class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD1jF4zbfdfMXFcKWiewoBqq7cMZ9zNzjo';
  }

  async enhanceResume(content: string, jobDescription?: string) {
    try {
      console.log("kkk--", this.baseUrl);

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a professional resume writer. Help improve resumes by making them more compelling and ATS-friendly.',
            },
            {
              role: 'user',
              content: `Please enhance this resume content and provide suggestions for improvement. ${jobDescription ? `Job description: ${jobDescription}` : ''}\n\nResume content: ${content}`,
            },
          ],
          max_tokens: 1500,
        }),
      });

      const data = await response.json();
      console.log("data---", data);
      
      return {
        suggestions: data.choices[0].message.content.split('\n').filter(Boolean),
        optimizedContent: data.choices[0].message.content,
        atsScore: Math.floor(Math.random() * 20) + 80, // Mock score
        improvements: ['Use more action verbs', 'Add quantifiable results', 'Include relevant keywords'],
      };
    } catch (error) {
      console.error('AI enhancement error:', error);
      return {
        suggestions: ['Unable to get AI suggestions at this time'],
        optimizedContent: content,
        atsScore: 75,
        improvements: ['Please try again later'],
      };
    }
  }

  async optimizeForATS(content: string, jobDescription: string) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an ATS (Applicant Tracking System) expert. Optimize resumes for better ATS scanning.',
            },
            {
              role: 'user',
              content: `Optimize this resume for ATS scanning based on this job description:\n\nJob: ${jobDescription}\n\nResume: ${content}`,
            },
          ],
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      return {
        optimizedContent: data.choices[0].message.content,
        keywords: ['React', 'JavaScript', 'TypeScript', 'Node.js'], // Mock keywords
        atsScore: Math.floor(Math.random() * 15) + 85,
      };
    } catch (error) {
      console.error('ATS optimization error:', error);
      return {
        optimizedContent: content,
        keywords: [],
        atsScore: 75,
      };
    }
  }

  async extractTechnologies(jobDescription: string) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a tech stack analyzer. Extract all technologies mentioned in the job description and return them as a JavaScript array. Only return the array, nothing else.',
            },
            {
              role: 'user',
              content: `Extract technologies from this job description in array format:\n\n${jobDescription}`,
            },
          ],
          max_tokens: 500,
          temperature: 0.3, // Lower temperature for more deterministic output
        }),
      });

      const data = await response.json();
      
      const content = data.choices[0].message.content;
      
      // Try to parse the response as an array
      try {
        // Handle cases where the response might be a string representation of an array
        const techArray = content.startsWith('[') ? JSON.parse(content) : content.split('\n').map(item => item.trim()).filter(Boolean);
        return techArray;
      } catch (e) {
        console.warn('Failed to parse technologies array, returning raw content');
        return [content];
      }
    } catch (error) {
      console.error('Technology extraction error:', error);
      return [];
    }
  }


}

export const aiService = new AIService();