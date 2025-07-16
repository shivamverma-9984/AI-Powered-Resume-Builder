// AI service for resume enhancement
export class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async enhanceResume(content: string, jobDescription?: string) {
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
}

export const aiService = new AIService();