import React, { useState } from 'react';
import { Certification } from '../../../types';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onChange }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      url: '',
    };
    onChange([...data, newCertification]);
    setExpandedItem(newCertification.id);
  };

  const removeCertification = (id: string) => {
    onChange(data.filter(cert => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    onChange(data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
        <button
          onClick={addCertification}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No certifications added yet.</p>
          <button
            onClick={addCertification}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Add your first certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((certification) => (
            <div key={certification.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-gray-400" />
                  <h4 className="font-medium text-gray-900">
                    {certification.name || 'New Certification'}
                  </h4>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setExpandedItem(expandedItem === certification.id ? null : certification.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {expandedItem === certification.id ? 'Collapse' : 'Edit'}
                  </button>
                  <button
                    onClick={() => removeCertification(certification.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {expandedItem === certification.id && (
                <div className="space-y-4">
                  <div className="">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certification Name *
                      </label>
                      <input
                        type="text"
                        value={certification.name}
                        onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="AWS Solutions Architect"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issuer *
                      </label>
                      <input
                        type="text"
                        value={certification.issuer}
                        onChange={(e) => updateCertification(certification.id, 'issuer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Amazon Web Services"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Obtained *
                      </label>
                      <input
                        type="month"
                        value={certification.date}
                        onChange={(e) => updateCertification(certification.id, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="month"
                        value={certification.expiryDate}
                        onChange={(e) => updateCertification(certification.id, 'expiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certification URL
                      </label>
                      <div className="relative">
                        <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="url"
                          value={certification.url}
                          onChange={(e) => updateCertification(certification.id, 'url', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://verify.certification.com"
                        />
                      </div>
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

export default CertificationsForm;