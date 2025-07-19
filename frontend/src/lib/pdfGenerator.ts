import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ResumeContent } from "../types";

export class PDFGenerator {
  static async generatePDF(
    resumeData: ResumeContent,
    templateId: string = "modern"
  ): Promise<void> {
    try {
      const container = document.createElement("div");
      container.innerHTML = this.generateResumeHTML(resumeData);
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "-9999px";
      container.style.width = "210mm"; // A4 width
      container.style.minHeight = "297mm"; // A4 height
      container.style.backgroundColor = "white";
      container.style.padding = "0";
      container.style.margin = "0";
      container.style.boxSizing = "border-box";
      document.body.appendChild(container);

      // Wait for fonts and layout to load
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: container.offsetWidth,
        height: container.offsetHeight,
        logging: false,
      });

      // A4 dimensions in points (72 DPI)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Scale content to fit on single page if needed
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;

      if (imgHeight > pageHeight) {
        // Scale down to fit on one page
        const scale = pageHeight / imgHeight;
        finalWidth = imgWidth * scale;
        finalHeight = pageHeight;
      }

      // Center the content on the page
      const xOffset = (imgWidth - finalWidth) / 2;
      const yOffset = (pageHeight - finalHeight) / 2;

      // Add single page with scaled content
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        xOffset,
        yOffset,
        finalWidth,
        finalHeight
      );

      document.body.removeChild(container);

      const fileName = `${
        resumeData.personalInfo?.fullName || "Resume"
      }_Resume.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error("Failed to generate PDF");
    }
  }

  private static generateResumeHTML(data: ResumeContent): string {
    const formatDate = (dateString: string | undefined): string => {
      if (!dateString) return "";
      const date = new Date(dateString + "-01");
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    };

    const personalInfo = data.personalInfo || {};
    const workExperience = data.workExperience || [];
    const education = data.education || [];
    const skills = data.skills || [];
    const projects = data.projects || [];
    const certifications = data.certifications || [];

    return `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        font-size: 11px; 
        line-height: 1.3; 
        color: #2d3748; 
        max-width: 210mm; 
        min-height: 297mm;
        margin: 0; 
        padding: 15mm;
        box-sizing: border-box;
        background: white;
      ">
        <!-- Header Section -->
        <div style="text-align: center; margin-bottom: 15px; border-bottom: 2px solid #2d3748; padding-bottom: 10px;">
          <h1 style="
            font-size: 24px; 
            font-weight: 700; 
            margin: -10px 0 5px 0; 
            color: #1a202c;
            letter-spacing: 0.5px;
          ">${
            personalInfo.fullName ||
            `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`
          }</h1>
          
          <div style="font-size: 11px; color: #4a5568; margin-bottom: 3px;">
            ${[personalInfo.email, personalInfo.phone, personalInfo.location]
              .filter(Boolean)
              .join(" • ")}
          </div>
          
          ${
            [
              personalInfo.linkedin,
              personalInfo.github,
              personalInfo.portfolio,
            ].filter(Boolean).length > 0
              ? `
            <div style="font-size: 10px; color: #718096;">
              ${[
                personalInfo.linkedin,
                personalInfo.github,
                personalInfo.portfolio,
              ]
                .filter(Boolean)
                .join(" • ")}
            </div>
          `
              : ""
          }
        </div>

        ${
          data.summary
            ? `
          <div style="margin-bottom: 18px;">
            <h2 style="
              font-size: 14px; 
              font-weight: 600; 
              margin: -10px 0 8px 0; 
              color: #2d3748;
              border-bottom: 1px solid black;
              padding-bottom: 10px;
            ">PROFESSIONAL SUMMARY</h2>
            <p style="
              margin-top: -10px; 
              text-align: justify; 
              font-size: 11px; 
              line-height: 1.4;
              color: #4a5568;
            ">${data.summary}</p>
          </div>
        `
            : ""
        }

        ${
          workExperience.length > 0
            ? `
          <div style="margin-bottom: 18px;">
            <h2 style="
              font-size: 14px; 
              font-weight: 600; 
              margin: -10px 0 10px 0; 
              color: #2d3748;
              border-bottom: 1px solid black;
              padding-bottom: 10px;
            ">PROFESSIONAL EXPERIENCE</h2>
            
            ${workExperience
              .map(
                (exp, index) => `
              <div style="margin-bottom: ${
                index === workExperience.length - 1 ? "0" : "14px"
              };">
                <div style="
                  display: flex; 
                  justify-content: space-between; 
                  align-items: flex-start;
                  margin: -10px 0 4px 0;
                ">
                  <div style="flex: 1;">
                    <div style="
                      font-weight: 600; 
                      font-size: 12px; 
                      color: #2d3748;
                      margin: -3px 0 2px 0;
                    ">${exp.position}</div>
                    <div style="
                      font-size: 11px; 
                      color: #4a5568;
                      font-style: italic;
                    ">
                      ${exp.company}${exp.location ? ` • ${exp.location}` : ""}
                    </div>
                  </div>
                  <div style="
                    font-size: 10px; 
                    color: #718096;
                    text-align: right;
                    white-space: nowrap;
                    margin-left: 10px;
                  ">
                    ${formatDate(exp.startDate)} - ${
                  exp.current ? "Present" : formatDate(exp.endDate)
                }
                  </div>
                </div>
                
                ${
                  exp.description?.length
                    ? `
                  <ul style="
                    margin: 4px 0 0 0; 
                     padding-left: 10px; 
                    font-size: 10px;
                    line-height: 1.4;
                    
                  ">
                    ${exp.description
                      .filter(Boolean)
                      .map(
                        (d) => `
                     <div style="display:flex; align-items: center;">
                     <p>•</p>
                     <li style="margin-bottom: 1px; color: #4a5568;padding-left:2px">${d}</li>
                      </div>
                    `
                      )
                      .join("")}
                  </ul>
                `
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          projects.length > 0
            ? `
          <div style="margin-bottom: 18px;">
            <h2 style="
              font-size: 14px; 
              font-weight: 600; 
              margin: -10px 0 2px 0; 
              color: #2d3748;
              border-bottom: 1px solid black;
              padding-bottom: 10px;
            ">PROJECTS</h2>
            
            ${projects
              .map(
                (project, index) => `
              <div style="margin-bottom: ${
                index === projects.length - 1 ? "0" : "8px"
              };">
                <div style="
                  display: flex; 
                  justify-content: space-between; 
                  align-items: center;
                  margin:-3px 0 4px 0;
                ">
                  <div style="
                    font-weight: 600; 
                    font-size: 12px; 
                    color: #2d3748;
                  ">${project.name}</div>
                  ${
                    project.github
                      ? `
                    <a href="${project.github}" style="
                      font-size: 9px; 
                      color: #3182ce;
                      text-decoration: none;
                    ">GitHub</a>
                  `
                      : ""
                  }
                </div>
                
                ${
                  project.description
                    ? `
                  <div style="
                    font-size: 10px; 
                    margin-bottom: 4px;
                    color: #4a5568;
                    line-height: 1.4;
                  ">${project.description}</div>
                `
                    : ""
                }
                
                ${
                  project.technologies?.length
                    ? `
                  <div style="
                    font-size: 9px; 
                    color: #718096;
                    font-style: italic;
                  ">
                    <strong>Technologies:</strong> ${project.technologies.join(
                      ", "
                    )}
                  </div>
                `
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

        <!-- Two Column Layout for Education, Skills, and Certifications -->
        <div style="; gap: 20px; margin-top: 5px;">
          <!-- Left Column -->
          <div style="flex: 1;">
            ${
              education.length > 0
                ? `
              <div style="margin-bottom: 15px;">
                <h2 style="
                  font-size: 14px; 
                  font-weight: 600; 
                  margin: -10px 0 8px 0; 
                  color: #2d3748;
                  border-bottom: 1px solid black;
                  padding-bottom: 10px;
                ">EDUCATION</h2>
                
                ${education
                  .map(
                    (edu, index) => `
                  <div style="margin-bottom: ${
                    index === education.length - 1 ? "0" : "8px"
                  };">
                    <div style="
                      font-weight: 600; 
                      font-size: 11px; 
                      color: #2d3748;
                      margin:-4px 0 4px 0;
                    ">${edu.degree}${edu.field ? ` in ${edu.field}` : ""}</div>
                  <div style="display:flex;justify-content: space-between; align-items: center">  <div style="
                      font-size: 10px; 
                      color: #4a5568;
                      margin:-2px 0 1px 0;
                    ">${edu.institution}</div>
                    <div style="
                      font-size: 9px; 
                      color: #718096;
                    ">${formatDate(edu.startDate)} - ${
                      edu.current ? "Present" : formatDate(edu.endDate)
                    }</div>
                  
                  </div>
                  </div>
                    ${
                      edu.gpa
                        ? `
                      <div style="font-size: 9px; color: #718096;">GPA: ${edu.gpa}</div>
                    `
                        : ""
                    }
                `
                  )
                  .join("")}
              </div>
            `
                : ""
            }

            ${
              certifications.length > 0
                ? `
              <div>
                <h2 style="
                  font-size: 14px; 
                  font-weight: 600; 
                  margin: -12px 0 6px 0; 
                  color: #2d3748;
                  border-bottom: 1px solid black;
                  padding-bottom: 10px;
                ">CERTIFICATIONS</h2>
                
                ${certifications
                  .map(
                    (cert, index) => `
                  <div style="margin-bottom: ${
                    index === certifications.length - 1 ? "0" : "8px"
                  };">
                    <div style="
                      font-weight: 600; 
                      font-size: 11px; 
                      color: #2d3748;
                      margin:-4px 0 0px 0;
                    ">${cert.name}</div>
                                  <div style="display:flex;justify-content: space-between; align-items: center"> 
                    <div style="
                      font-size: 10px; 
                      color: #4a5568;
                      margin-bottom: 1px;
                    ">${cert.issuer}</div>
                    <div style="
                      font-size: 9px; 
                      color: #718096;
                    ">${formatDate(cert.date)}</div>
                  </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>

          <div style="margin-top:2px">
            ${
              skills.length > 0
                ? `
              <div>
                <h2 style="
                  font-size: 14px; 
                  font-weight: 600; 
                  margin: 0 0 8px 0; 
                  color: #2d3748;
                  border-bottom: 1px solid black;
                  padding-bottom: 10px;
                ">TECHNICAL SKILLS</h2>
                
                <div style="
                  font-size: 10px; 
                  line-height: 1.6;
                  color: #4a5568;
                ">
                  ${skills
                    .map((skill, index) => {
                      const skillName =
                        typeof skill === "string" ? skill : skill.name;
                      return `<span style="
                      background: #f7fafc; 
                      border: 1px solid #e2e8f0;
                      padding: 2px 6px; 
                      border-radius: 3px; 
                      margin: 0 4px 4px 0;
                      display: inline-block;
                      font-size: 9px;
                      color: #2d3748;
                    ">${skillName}</span>`;
                    })
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;
  }
}