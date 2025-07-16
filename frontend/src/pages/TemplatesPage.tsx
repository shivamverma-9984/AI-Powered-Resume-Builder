import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Crown, Check } from "lucide-react";

const TemplatesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design perfect for tech roles",
      category: "professional",
      preview:
        "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
      isPremium: false,
      features: ["ATS Optimized", "Clean Layout", "Professional"],
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional format ideal for corporate positions",
      category: "professional",
      preview:
        "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400",
      isPremium: false,
      features: ["Traditional", "Corporate", "Timeless"],
    },
    {
      id: "creative",
      name: "Creative",
      description: "Eye-catching design for creative industries",
      category: "creative",
      preview:
        "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      isPremium: false,
      features: ["Creative", "Colorful", "Artistic"],
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant layout",
      category: "professional",
      preview:
        "https://images.pexels.com/photos/590018/pexels-photo-590018.jpeg?auto=compress&cs=tinysrgb&w=400",
      isPremium: false,
      features: ["Minimalist", "Clean", "Simple"],
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated design for senior positions",
      category: "professional",
      preview:
        "https://images.pexels.com/photos/590024/pexels-photo-590024.jpeg?auto=compress&cs=tinysrgb&w=400",
      isPremium: true,
      features: ["Executive Level", "Sophisticated", "Premium"],
    },
    {
      id: "designer",
      name: "Designer",
      description: "Portfolio-focused layout for designers",
      category: "creative",
      preview:
        "https://images.pexels.com/photos/590026/pexels-photo-590026.jpeg?auto=compress&cs=tinysrgb&w=400",
      isPremium: true,
      features: ["Portfolio Style", "Creative", "Visual"],
    },
  ];

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "professional", label: "Professional" },
    { id: "creative", label: "Creative" },
    { id: "modern", label: "Modern" },
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      selectedCategory === "all" || template.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Resume Templates
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates,
              optimized for ATS and tailored for different industries.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Premium Badge */}
              {template.isPremium && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center z-10">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </div>
              )}

              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />

                {/* Hover Overlay */}
                {hoveredTemplate === template.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <button className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </button>
                      <Link
                        to={`/builder?template=${template.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Use Template
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <span className="text-sm text-gray-500 capitalize">
                    {template.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{template.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/builder?template=${template.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Use Template
                  </Link>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Choose a template and start building your professional resume in
            minutes.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            Get Started Free
            <Check className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
