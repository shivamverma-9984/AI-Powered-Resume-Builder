import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Download, Eye, Bot, FileText, ArrowLeft, Layout, Palette } from 'lucide-react';
import { ResumeContent } from '../../types';
import { resumeAPI } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import EnhancedAIAssistant from './EnhancedAIAssistant';
import DragDropBuilder from './DragDropBuilder';
import TemplateGallery from './TemplateGallery';
import toast from 'react-hot-toast';

const ResumeBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'build' | 'template' | 'preview' | 'ai'>('build');
  const [buildMode, setBuildMode] = useState<'form' | 'drag'>('form');
  const [resumeData, setResumeData] = useState<ResumeContent>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  });
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [templateId, setTemplateId] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [resumeId, setResumeId] = useState<string | null>(id || null);

  useEffect(() => {
    if (id) {
      loadResume();
    }
  }, [id]);


const [lastSaved, setLastSaved] = useState({
  resumeData: resumeData,
  resumeTitle: resumeTitle,
  templateId: templateId,
});

// Auto-save functionality
useEffect(() => {
  if (
    autoSaveEnabled &&
    user &&
    resumeId &&
    (
      JSON.stringify(resumeData) !== JSON.stringify(lastSaved.resumeData) ||
      resumeTitle !== lastSaved.resumeTitle ||
      templateId !== lastSaved.templateId
    )
  ) {
    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
      setLastSaved({
        resumeData,
        resumeTitle,
        templateId,
      });
    }, 1500); 

    return () => clearTimeout(autoSaveTimer);
  }
}, [resumeData, resumeTitle, templateId, autoSaveEnabled, user, resumeId]);

const handleAutoSave = async () => {
  if (!user || !resumeId) return;

  try {
    await resumeAPI.update(resumeId, {
      title: resumeTitle,
      templateId,
      content: resumeData,
    });
   
  } catch (error) {
    console.error('Auto-save error:', error);
   
  }
};

  useEffect(() => {
    if (autoSaveEnabled && user && resumeData.personalInfo.fullName && resumeId) {
      const autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 3000);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [resumeData, resumeTitle, templateId, autoSaveEnabled, user, resumeId]);

  const loadResume = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const resume = await resumeAPI.getById(id);
      setResumeData(resume.content);
      setResumeTitle(resume.title);
      setTemplateId(resume.templateId);
      setResumeId(resume._id);
    } catch (error: any) {
      toast.error('Failed to load resume');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  // const handleAutoSave = async () => {
  //   if (!user || !resumeId) return;

  //   try {
  //     await resumeAPI.update(resumeId, {
  //       title: resumeTitle,
  //       templateId,
  //       content: resumeData,
  //     });
  //   } catch (error) {
  //     console.error('Auto-save error:', error);
  //   }
  // };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const resumePayload = {
        title: resumeTitle,
        templateId,
        content: resumeData,
      };

      if (resumeId) {
        await resumeAPI.update(resumeId, resumePayload);
        toast.success('Resume saved successfully');
      } else {
        const response = await resumeAPI.create(resumePayload);
        toast.success('Resume created successfully');
        setResumeId(response.resume._id);
        navigate(`/builder/${response.resume._id}`);
      }
    } catch (error: any) {
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    if (resumeId) {
      try {
        await resumeAPI.trackDownload(resumeId);
        toast.success('PDF download feature coming soon!');
      } catch (error) {
        console.error('Download tracking error:', error);
        toast.success('PDF download feature coming soon!');
      }
    } else {
      toast.success('PDF download feature coming soon!');
    }
  };

  const handleSectionEdit = (sectionId: string) => {
    setBuildMode('form');
    setActiveTab('build');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <input
                  type="text"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="text-lg font-medium bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2 py-1"
                  placeholder="Resume Title"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Auto-save</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSaveEnabled}
                    onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('build')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'build'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Layout className="h-4 w-4" />
              <span>Build Resume</span>
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'template'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Palette className="h-4 w-4" />
              <span>Templates</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'ai'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>AI Assistant</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Build Mode Toggle */}
      {activeTab === 'build' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Build Mode:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setBuildMode('form')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    buildMode === 'form'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Form Builder
                </button>
                <button
                  onClick={() => setBuildMode('drag')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    buildMode === 'drag'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Drag & Drop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="h-screen">
        {activeTab === 'build' && (
          <div className="h-full flex">
            <div className="flex-1 overflow-hidden">
              {buildMode === 'form' ? (
                <ResumeForm
                  data={resumeData}
                  onChange={setResumeData}
                  templateId={templateId}
                  onTemplateChange={setTemplateId}
                />
              ) : (
                <DragDropBuilder
                  data={resumeData}
                  onChange={setResumeData}
                  onSectionEdit={handleSectionEdit}
                />
              )}
            </div>
            <div className="w-1/2 border-l bg-gray-100">
              <ResumePreview data={resumeData} templateId={templateId} />
            </div>
          </div>
        )}
        {activeTab === 'template' && (
          <TemplateGallery
            selectedTemplate={templateId}
            onTemplateChange={setTemplateId}
          />
        )}
        {activeTab === 'preview' && (
          <ResumePreview data={resumeData} templateId={templateId} />
        )}
        {activeTab === 'ai' && (
          <div className="h-full overflow-y-auto p-8">
            <EnhancedAIAssistant 
              data={resumeData} 
              onChange={setResumeData}
              resumeId={resumeId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;