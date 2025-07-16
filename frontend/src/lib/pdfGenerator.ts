import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeContent } from '../types';

export class PDFGenerator {
  static async generatePDF(resumeData: ResumeContent, templateId: string = 'modern'): Promise<void> {
    try {
      // Create a temporary container for the resume
      const container = document.createElement('div');
      container.innerHTML = this.generateResumeHTML(resumeData, templateId);
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '8.5in';
      container.style.backgroundColor = 'white';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.fontSize = '12px';
      container.style.lineHeight = '1.4';
      container.style.color = '#333';
      
      document.body.appendChild(container);

      // Convert to canvas
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 816, // 8.5 inches at 96 DPI
        height: 1056, // 11 inches at 96 DPI
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter',
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 8.5;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Clean up
      document.body.removeChild(container);

      // Download the PDF
      const fileName = `${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  private static generateResumeHTML(data: ResumeContent, templateId: string): string {
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return `
      <div style="max-width: 8.5in; margin: 0 auto; padding: 0.5in; background: white;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 1in; border-bottom: 2px solid #3B82F6; padding-bottom: 0.5in;">
          <h1 style="font-size: 28px; font-weight: bold; margin: 0 0 0.2in 0; color: #1F2937;">
            ${data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div style="font-size: 14px; color: #6B7280; margin-bottom: 0.1in;">
            ${[
              data.personalInfo.email,
              data.personalInfo.phone,
              data.personalInfo.location
            ].filter(Boolean).join(' • ')}
          </div>
          <div style="font-size: 14px; color: #6B7280;">
            ${[
              data.personalInfo.linkedin ? 'LinkedIn' : '',
              data.personalInfo.github ? 'GitHub' : '',
              data.personalInfo.website ? 'Website' : ''
            ].filter(Boolean).join(' • ')}
          </div>
        </div>

        <!-- Summary -->
        ${data.summary ? `
          <div style="margin-bottom: 0.5in;">
            <h2 style="font-size: 16px; font-weight: bold; color: #1F2937; margin: 0 0 0.2in 0; border-bottom: 1px solid #3B82F6; padding-bottom: 0.1in;">
              Professional Summary
            </h2>
            <p style="margin: 0; line-height: 1.5; color: #374151;">${data.summary}</p>
          </div>
        ` : ''}

        <!-- Work Experience -->
        ${data.workExperience.length > 0 ? `
          <div style="margin-bottom: 0.5in;">
            <h2 style="font-size: 16px; font-weight: bold; color: #1F2937; margin: 0 0 0.2in 0; border-bottom: 1px solid #3B82F6; padding-bottom: 0.1in;">
              Work Experience
            </h2>
            ${data.workExperience.map(exp => `
              <div style="margin-bottom: 0.3in;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.1in;">
                  <div>
                    <h3 style="font-size: 14px; font-weight: 600; margin: 0; color: #1F2937;">${exp.position}</h3>
                    <p style="font-size: 14px; color: #3B82F6; margin: 0; font-weight: 500;">${exp.company}</p>
                    ${exp.location ? `<p style="font-size: 12px; color: #6B7280; margin: 0;">${exp.location}</p>` : ''}
                  </div>
                  <div style="text-align: right; font-size: 12px; color: #6B7280;">
                    ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <ul style="margin: 0; padding-left: 1in; font-size: 12px; color: #374151;">
                  ${exp.description.map(desc => desc.trim() ? `<li style="margin-bottom: 0.05in;">${desc}</li>` : '').join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Education -->
        ${data.education.length > 0 ? `
          <div style="margin-bottom: 0.5in;">
            <h2 style="font-size: 16px; font-weight: bold; color: #1F2937; margin: 0 0 0.2in 0; border-bottom: 1px solid #3B82F6; padding-bottom: 0.1in;">
              Education
            </h2>
            ${data.education.map(edu => `
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.2in;">
                <div>
                  <h3 style="font-size: 14px; font-weight: 600; margin: 0; color: #1F2937;">${edu.degree} in ${edu.field}</h3>
                  <p style="font-size: 14px; color: #3B82F6; margin: 0;">${edu.institution}</p>
                  ${edu.gpa ? `<p style="font-size: 12px; color: #6B7280; margin: 0;">GPA: ${edu.gpa}</p>` : ''}
                </div>
                <div style="text-align: right; font-size: 12px; color: #6B7280;">
                  ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Skills -->
        ${data.skills.length > 0 ? `
          <div style="margin-bottom: 0.5in;">
            <h2 style="font-size: 16px; font-weight: bold; color: #1F2937; margin: 0 0 0.2in 0; border-bottom: 1px solid #3B82F6; padding-bottom: 0.1in;">
              Skills
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 0.1in;">
              ${data.skills.map(skill => `
                <span style="background: #EFF6FF; color: #1E40AF; padding: 0.05in 0.1in; border-radius: 0.05in; font-size: 12px; margin-right: 0.1in; margin-bottom: 0.05in;">
                  ${skill.name}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Projects -->
        ${data.projects.length > 0 ? `
          <div style="margin-bottom: 0.5in;">
            <h2 style="font-size: 16px; font-weight: bold; color: #1F2937; margin: 0 0 0.2in 0; border-bottom: 1px solid #3B82F6; padding-bottom: 0.1in;">
              Projects
            </h2>
            ${data.projects.map(project => `
              <div style="margin-bottom: 0.3in;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.1in;">
                  <div>
                    <h3 style="font-size: 14px; font-weight: 600; margin: 0; color: #1F2937;">${project.name}</h3>
                    <div style="margin-top: 0.05in;">
                      ${project.technologies.map(tech => `
                        <span style="background: #F3F4F6; color: #374151; padding: 0.02in 0.05in; border-radius: 0.02in; font-size: 10px; margin-right: 0.05in;">
                          ${tech}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                  <div style="text-align: right; font-size: 12px; color: #6B7280;">
                    ${formatDate(project.startDate)} - ${formatDate(project.endDate)}
                  </div>
                </div>
                <p style="margin: 0; font-size: 12px; color: #374151; line-height: 1.4;">${project.description}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Certifications -->
        ${data.certifications.length > 0 ? `
          <div style="margin-bottom: 0.5in;">
            <h2 style="font-size: 16px; font-weight: bold; color: #1F2937; margin: 0 0 0.2in 0; border-bottom: 1px solid #3B82F6; padding-bottom: 0.1in;">
              Certifications
            </h2>
            ${data.certifications.map(cert => `
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.2in;">
                <div>
                  <h3 style="font-size: 14px; font-weight: 600; margin: 0; color: #1F2937;">${cert.name}</h3>
                  <p style="font-size: 14px; color: #3B82F6; margin: 0;">${cert.issuer}</p>
                </div>
                <div style="text-align: right; font-size: 12px; color: #6B7280;">
                  ${formatDate(cert.date)}
                  ${cert.expiryDate ? `<br>Expires: ${formatDate(cert.expiryDate)}` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }
}