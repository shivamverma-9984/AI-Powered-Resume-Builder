// import React, { useState } from 'react';
// import { ResumeContent } from '../../types';
// import PersonalInfoForm from './forms/PersonalInfoForm';
// import SummaryForm from './forms/SummaryForm';
// import WorkExperienceForm from './forms/WorkExperienceForm';
// import EducationForm from './forms/EducationForm';
// import SkillsForm from './forms/SkillsForm';
// import ProjectsForm from './forms/ProjectsForm';
// import CertificationsForm from './forms/CertificationsForm';
// import TemplateSelector from './TemplateSelector';
// import { 
//   User, 
//   FileText, 
//   Briefcase, 
//   GraduationCap, 
//   Code, 
//   Trophy, 
//   Award,
//   Palette
// } from 'lucide-react';

// interface ResumeFormProps {
//   data: ResumeContent;
//   onChange: (data: ResumeContent) => void;
//   templateId: string;
//   onTemplateChange: (templateId: string) => void;
// }

// const ResumeForm: React.FC<ResumeFormProps> = ({ 
//   data, 
//   onChange, 
//   templateId, 
//   onTemplateChange 
// }) => {
//   const [activeSection, setActiveSection] = useState('personal');

//   const sections = [
//     { id: 'template', label: 'Template', icon: Palette },
//     { id: 'personal', label: 'Personal Info', icon: User },
//     { id: 'summary', label: 'Summary', icon: FileText },
//     { id: 'experience', label: 'Work Experience', icon: Briefcase },
//     { id: 'education', label: 'Education', icon: GraduationCap },
//     { id: 'skills', label: 'Skills', icon: Code },
//     { id: 'projects', label: 'Projects', icon: Trophy },
//     { id: 'certifications', label: 'Certifications', icon: Award },
//   ];

//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case 'template':
//         return (
//           <TemplateSelector
//             selectedTemplate={templateId}
//             onTemplateChange={onTemplateChange}
//           />
//         );
//       case 'personal':
//         return (
//           <PersonalInfoForm
//             data={data.personalInfo}
//             onChange={(personalInfo) => onChange({ ...data, personalInfo })}
//           />
//         );
//       case 'summary':
//         return (
//           <SummaryForm
//             data={data.summary}
//             onChange={(summary) => onChange({ ...data, summary })}
//           />
//         );
//       case 'experience':
//         return (
//           <WorkExperienceForm
//             data={data.workExperience}
//             onChange={(workExperience) => onChange({ ...data, workExperience })}
//           />
//         );
//       case 'education':
//         return (
//           <EducationForm
//             data={data.education}
//             onChange={(education) => onChange({ ...data, education })}
//           />
//         );
//       case 'skills':
//         return (
//           <SkillsForm
//             data={data.skills}
//             onChange={(skills) => onChange({ ...data, skills })}
//           />
//         );
//       case 'projects':
//         return (
//           <ProjectsForm
//             data={data.projects}
//             onChange={(projects) => onChange({ ...data, projects })}
//           />
//         );
//       case 'certifications':
//         return (
//           <CertificationsForm
//             data={data.certifications}
//             onChange={(certifications) => onChange({ ...data, certifications })}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex h-full">
//       {/* Sidebar Navigation */}
//       <div className="w-64 bg-white shadow-sm border-r">
//         <div className="p-4 border-b">
//           <h2 className="text-lg font-semibold text-gray-900">Resume Sections</h2>
//         </div>
//         <nav className="p-4 space-y-2">
//           {sections.map((section) => {
//             const Icon = section.icon;
//             return (
//               <button
//                 key={section.id}
//                 onClick={() => setActiveSection(section.id)}
//                 className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
//                   activeSection === section.id
//                     ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
//                     : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 <span className="font-medium">{section.label}</span>
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-6">
//           {renderActiveSection()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeForm;



import React, { useState } from 'react';
import { ResumeContent } from '../../types';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import TemplateSelector from './TemplateSelector';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Trophy, 
  Award,
  Palette
} from 'lucide-react';

interface ResumeFormProps {
  data: ResumeContent;
  onChange: (data: ResumeContent) => void;
  templateId: string;
  onTemplateChange: (templateId: string) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ 
  data, 
  onChange, 
  templateId, 
  onTemplateChange 
}) => {
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'template', label: 'Template', icon: Palette },
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Trophy },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'template':
        return (
          <TemplateSelector
            selectedTemplate={templateId}
            onTemplateChange={onTemplateChange}
          />
        );
      case 'personal':
        return (
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={(personalInfo) => onChange({ ...data, personalInfo })}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            data={data.summary}
            onChange={(summary) => onChange({ ...data, summary })}
          />
        );
      case 'experience':
        return (
          <WorkExperienceForm
            data={data.workExperience}
            onChange={(workExperience) => onChange({ ...data, workExperience })}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={data.education}
            onChange={(education) => onChange({ ...data, education })}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={data.skills}
            onChange={(skills) => onChange({ ...data, skills })}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={data.projects}
            onChange={(projects) => onChange({ ...data, projects })}
          />
        );
      case 'certifications':
        return (
          <CertificationsForm
            data={data.certifications}
            onChange={(certifications) => onChange({ ...data, certifications })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Horizontal Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Resume Sections</h2>
          <nav className="flex space-x-1 overflow-x-auto pb-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg min-w-max transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;