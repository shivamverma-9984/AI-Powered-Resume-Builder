import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResumeContent } from '../../types';
import { GripVertical, Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface DragDropBuilderProps {
  data: ResumeContent;
  onChange: (data: ResumeContent) => void;
  onSectionEdit: (sectionId: string) => void;
}

const DragDropBuilder: React.FC<DragDropBuilderProps> = ({ data, onChange, onSectionEdit }) => {
  const [sections, setSections] = useState([
    { id: 'personal', title: 'Personal Information', type: 'personal', enabled: true },
    { id: 'summary', title: 'Professional Summary', type: 'summary', enabled: !!data.summary },
    { id: 'experience', title: 'Work Experience', type: 'experience', enabled: data.workExperience.length > 0 },
    { id: 'education', title: 'Education', type: 'education', enabled: data.education.length > 0 },
    { id: 'skills', title: 'Skills', type: 'skills', enabled: data.skills.length > 0 },
    { id: 'projects', title: 'Projects', type: 'projects', enabled: data.projects.length > 0 },
    { id: 'certifications', title: 'Certifications', type: 'certifications', enabled: data.certifications.length > 0 },
  ]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);

    setSections(newSections);
  };

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, enabled: !section.enabled }
        : section
    ));
  };

  const getSectionContent = (section: any) => {
    switch (section.type) {
      case 'personal':
        return (
          <div className="space-y-2">
            <p className="font-semibold">{data.personalInfo.fullName || 'Your Name'}</p>
            <p className="text-sm text-gray-600">{data.personalInfo.email}</p>
            <p className="text-sm text-gray-600">{data.personalInfo.phone}</p>
            <p className="text-sm text-gray-600">{data.personalInfo.location}</p>
          </div>
        );
      case 'summary':
        return (
          <div className="text-sm text-gray-700">
            {data.summary ? data.summary.substring(0, 150) + '...' : 'Add your professional summary'}
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-2">
            {data.workExperience.slice(0, 2).map((exp, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium">{exp.position}</p>
                <p className="text-gray-600">{exp.company}</p>
              </div>
            ))}
            {data.workExperience.length > 2 && (
              <p className="text-xs text-gray-500">+{data.workExperience.length - 2} more</p>
            )}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-2">
            {data.education.slice(0, 2).map((edu, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="flex flex-wrap gap-2">
            {data.skills.slice(0, 5).map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {skill.name}
              </span>
            ))}
            {data.skills.length > 5 && (
              <span className="text-xs text-gray-500">+{data.skills.length - 5} more</span>
            )}
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-2">
            {data.projects.slice(0, 2).map((project, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium">{project.name}</p>
                <p className="text-gray-600 text-xs">{project.description.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-2">
            {data.certifications.slice(0, 2).map((cert, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium">{cert.name}</p>
                <p className="text-gray-600">{cert.issuer}</p>
              </div>
            ))}
          </div>
        );
      default:
        return <div className="text-sm text-gray-500">No content</div>;
    }
  };

  return (
    <div className="h-full bg-white">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Resume Builder</h2>
        <p className="text-sm text-gray-600 mt-1">Drag and drop sections to reorder your resume</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="resume-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-6 space-y-4"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-white border-2 rounded-lg p-4 transition-all ${
                        section.enabled 
                          ? 'border-gray-200 hover:border-blue-300' 
                          : 'border-gray-100 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            {...provided.dragHandleProps}
                            className="text-gray-400 hover:text-gray-600 cursor-move"
                          >
                            <GripVertical className="h-5 w-5" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={section.enabled}
                              onChange={() => toggleSection(section.id)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <h3 className="font-medium text-gray-900">{section.title}</h3>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onSectionEdit(section.type)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {section.enabled && (
                        <div className="pl-8">
                          {getSectionContent(section)}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Section Button */}
      <div className="p-6 border-t">
        <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Add Section</span>
        </button>
      </div>
    </div>
  );
};

export default DragDropBuilder;