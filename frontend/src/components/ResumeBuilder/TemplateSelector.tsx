import React from 'react';
import { Check, Crown } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onTemplateChange }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design perfect for tech roles',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['ATS Optimized', 'Clean Layout', 'Professional'],
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional format ideal for corporate positions',
      preview: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['Traditional', 'Corporate', 'Timeless'],
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Eye-catching design for creative industries',
      preview: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['Creative', 'Colorful', 'Artistic'],
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant layout',
      preview: 'https://images.pexels.com/photos/590018/pexels-photo-590018.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['Minimalist', 'Clean', 'Simple'],
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Sophisticated design for senior positions',
      preview: 'https://images.pexels.com/photos/590024/pexels-photo-590024.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: true,
      features: ['Executive Level', 'Sophisticated', 'Premium'],
    },
    {
      id: 'designer',
      name: 'Designer',
      description: 'Portfolio-focused layout for designers',
      preview: 'https://images.pexels.com/photos/590026/pexels-photo-590026.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: true,
      features: ['Portfolio Style', 'Creative', 'Visual'],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Template</h3>
        <p className="text-gray-600 mb-6">
          Select a professional template that matches your industry and career level.
        </p>
      </div>

      <div className="grid gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            {/* Premium Badge */}
            {template.isPremium && (
              <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center z-10">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </div>
            )}

            {/* Selected Check */}
            {selectedTemplate === template.id && (
              <div className="absolute top-3 left-3 bg-blue-500 text-white rounded-full p-1 z-10">
                <Check className="h-3 w-3" />
              </div>
            )}

            {/* Template Preview */}
            <div className="aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Template Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{template.name}</h4>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {template.isPremium ? 'Premium' : 'Free'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Selection Info */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Selected Template</h4>
        <p className="text-blue-700">
          {templates.find(t => t.id === selectedTemplate)?.name || 'Modern'} - 
          {templates.find(t => t.id === selectedTemplate)?.description || 'Clean and contemporary design perfect for tech roles'}
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;