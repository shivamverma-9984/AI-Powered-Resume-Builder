import React from 'react';
import { ResumeContent } from '../../types';
import { PDFGenerator } from '../../lib/pdfGenerator';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Calendar, ExternalLink, Download, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ResumePreviewProps {
  data: ResumeContent;
  templateId: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleDownloadPDF = async () => {
    try {
      await PDFGenerator.generatePDF(data, templateId);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF');
      console.error('PDF generation error:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.personalInfo.fullName}'s Resume`,
          text: 'Check out my resume created with ResumeAI',
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or sharing failed
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const ModernTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto" id="resume-preview">
      {/* Header */}
      <div className="bg-blue-600 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{data?.personalInfo?.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-blue-100">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-blue-100">
          {data.personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-2" />
              <span>LinkedIn</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-4 w-4 mr-2" />
              <span>GitHub</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span>Website</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.description.map((desc, index) => (
                      desc.trim() && <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-blue-600">{edu.institution}</p>
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(
                data.skills.reduce((groups, skill) => {
                  const category = skill.category;
                  if (!groups[category]) groups[category] = [];
                  groups[category].push(skill);
                  return groups;
                }, {} as Record<string, typeof data.skills>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <div className="flex gap-4 text-sm">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                        <Github className="h-3 w-3 mr-1" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-blue-600">{cert.issuer}</p>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Certificate
                      </a>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {formatDate(cert.date)}
                    {cert.expiryDate && (
                      <div>Expires: {formatDate(cert.expiryDate)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
          <button
            onClick={handleShare}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>
      
      <ModernTemplate />
    </div>
  );
};

export default ResumePreview;