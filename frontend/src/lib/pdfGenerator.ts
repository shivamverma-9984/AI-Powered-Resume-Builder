import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeContent } from "../types"


export class PDFGenerator {
  static async generatePDF(resumeData: ResumeContent, templateId: string = 'modern'): Promise<void> {
    try {
      const container = document.createElement('div');
      container.innerHTML = this.generateResumeHTML(resumeData);
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '794px';
      container.style.backgroundColor = 'white';
      container.style.padding = '20px';
      document.body.appendChild(container);

      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, 1123]
      }) as jsPDF;

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123);

      document.body.removeChild(container);

      const fileName = `${resumeData.personalInfo?.fullName || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  private static generateResumeHTML(data: ResumeContent): string {
    const formatDate = (dateString: string | undefined): string => {
      if (!dateString) return '';
      const date = new Date(dateString + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const personalInfo = data.personalInfo || {};
    const workExperience = data.workExperience || [];
    const education = data.education || [];
    const skills = data.skills || [];
    const projects = data.projects || [];
    const certifications = data.certifications || [];

    return `
      <div style="font-family: 'Arial', sans-serif; font-size: 9px; color: #111; max-width: 794px; margin: auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 6px;">
          <h1 style="font-size: 16px; font-weight: bold; margin: 0;">${personalInfo.fullName || `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`}</h1>
          <div style="font-size: 8px; color: #444;">
            ${[personalInfo.location, personalInfo.email, personalInfo.phone, personalInfo.portfolio].filter(Boolean).join(' • ')}
          </div>
          <div style="font-size: 8px; color: #666;">
            ${[personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' • ')}
          </div>
        </div>

        ${data.summary ? `
          <div style="margin: 6px 0;">
            <div style="font-weight: bold; border-bottom: 1px solid #000; font-size: 10px;">Summary</div>
            <p style="margin: 2px 0; text-align: justify; font-size: 8px;">${data.summary}</p>
          </div>
        ` : ''}

        ${workExperience.length > 0 ? `
          <div style="margin-top: 8px;">
            <div style="font-weight: bold; border-bottom: 1px solid #000; font-size: 10px;">Experience</div>
            ${workExperience.map(exp => `
              <div style="margin: 4px 0;">
                <div style="display: flex; justify-content: space-between;">
                  <div>
                    <b>${exp.position}</b>, ${exp.company}
                    ${exp.location ? ` – <span style="color: #444;">${exp.location}</span>` : ''}
                  </div>
                  <div style="font-size: 7px; color: #666;">
                    ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                ${exp.description?.length ? `
                  <ul style="margin: 2px 0 0 15px; padding: 0; font-size: 8px;">
                    ${exp.description.filter(Boolean).map(d => `<li>${d}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${projects.length > 0 ? `
          <div style="margin-top: 8px;">
            <div style="font-weight: bold; border-bottom: 1px solid #000; font-size: 10px;">Projects</div>
            ${projects.map(project => `
              <div style="margin: 4px 0;">
                <div style="display: flex; justify-content: space-between;">
                  <b>${project.name}</b>
                  ${project.github ? `<a href="${project.github}" style="font-size: 7px; color: #1D4ED8;">GitHub</a>` : ''}
                </div>
                <div style="font-size: 8px; margin-top: 2px;">${project.description || ''}</div>
                ${project.technologies?.length ? `
                  <div style="margin-top: 2px; font-size: 7px; color: #555;">
                    Tools: ${project.technologies.join(', ')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div style="display: flex; gap: 20px; margin-top: 10px;">
          <div style="flex: 1;">
            ${education.length > 0 ? `
              <div>
                <div style="font-weight: bold; border-bottom: 1px solid #000; font-size: 10px;">Education</div>
                ${education.map(edu => `
                  <div style="margin-top: 4px;">
                    <b style="font-size: 9px;">${edu.degree}</b> ${edu.field ? `in ${edu.field}` : ''}<br/>
                    <span style="font-size: 8px; color: #444;">${edu.institution}</span><br/>
                    <span style="font-size: 7px; color: #666;">${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          <div style="flex: 1;">
            ${skills.length > 0 ? `
              <div>
                <div style="font-weight: bold; border-bottom: 1px solid #000; font-size: 10px;">Skills</div>
                <div style="font-size: 7.5px; margin-top: 4px;">
                  ${skills.map(skill => `
                    <span style="background: #eee; padding: 1px 3px; border-radius: 2px; margin-right: 2px;">
                      ${typeof skill === 'string' ? skill : skill.name}
                    </span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${certifications.length > 0 ? `
              <div style="margin-top: 8px;">
                <div style="font-weight: bold; border-bottom: 1px solid #000; font-size: 10px;">Certifications</div>
                ${certifications.map(cert => `
                  <div style="margin-top: 4px;">
                    <b style="font-size: 9px;">${cert.name}</b><br/>
                    <span style="font-size: 8px; color: #444;">${cert.issuer}</span><br/>
                    <span style="font-size: 7px; color: #666;">${formatDate(cert.date)}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
}