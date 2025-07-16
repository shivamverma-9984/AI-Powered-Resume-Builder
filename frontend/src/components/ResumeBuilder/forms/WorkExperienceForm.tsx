import React, { useState } from 'react';
import { WorkExperience } from '../../../types';
import { Plus, Trash2, Calendar, MapPin, Building, Briefcase } from 'lucide-react';

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ data, onChange }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      location: '',
    };
    onChange([...data, newExperience]);
    setExpandedItem(newExperience.id);
  };

  const removeWorkExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addBulletPoint = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateWorkExperience(id, 'description', [...experience.description, '']);
    }
  };

  const removeBulletPoint = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newDescription = experience.description.filter((_, i) => i !== index);
      updateWorkExperience(id, 'description', newDescription);
    }
  };

  const updateBulletPoint = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newDescription = [...experience.description];
      newDescription[index] = value;
      updateWorkExperience(id, 'description', newDescription);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        <button
          onClick={addWorkExperience}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No work experience added yet.</p>
          <button
            onClick={addWorkExperience}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Add your first work experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience) => (
            <div key={experience.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <h4 className="font-medium text-gray-900">
                    {experience.company || 'New Experience'}
                  </h4>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setExpandedItem(expandedItem === experience.id ? null : experience.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {expandedItem === experience.id ? 'Collapse' : 'Edit'}
                  </button>
                  <button
                    onClick={() => removeWorkExperience(experience.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {expandedItem === experience.id && (
                <div className="space-y-4">
                  <div className="">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Company Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                      </label>
                      <input
                        type="text"
                        value={experience.position}
                        onChange={(e) => updateWorkExperience(experience.id, 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Job Title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={experience.endDate}
                        onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                        disabled={experience.current}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={experience.current}
                          onChange={(e) => updateWorkExperience(experience.id, 'current', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">Currently working here</span>
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={experience.location}
                        onChange={(e) => updateWorkExperience(experience.id, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Job Description *
                      </label>
                      <button
                        onClick={() => addBulletPoint(experience.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Add Bullet Point
                      </button>
                    </div>
                    <div className="space-y-2">
                      {experience.description.map((bullet, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-gray-400">•</span>
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => updateBulletPoint(experience.id, index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe your responsibilities and achievements"
                          />
                          {experience.description.length > 1 && (
                            <button
                              onClick={() => removeBulletPoint(experience.id, index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperienceForm;