import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Rss, Brain, HeadphonesIcon, Settings, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockUsers, mockSources, mockGlossary } from '../data/mock';
import { useToast } from '../hooks/use-toast';
import UserModal from '../components/modals/UserModal';
import SourceModal from '../components/modals/SourceModal';
import ConfirmModal from '../components/modals/ConfirmModal';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('users');
  
  // Data states
  const [users, setUsers] = useState(mockUsers);
  const [sources, setSources] = useState(mockSources);
  const [glossaryTerms, setGlossaryTerms] = useState(mockGlossary);

  // Modal states
  const [userModal, setUserModal] = useState({ isOpen: false, user: null });
  const [sourceModal, setSourceModal] = useState({ isOpen: false, source: null });
  const [confirmModal, setConfirmModal] = useState({ 
    isOpen: false, 
    onConfirm: null, 
    title: '', 
    message: '' 
  });

  useEffect(() => {
    if (user && !isAdmin) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions pour accéder à cette page.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, isAdmin, navigate, toast]);

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { id: 'users', name: 'Utilisateurs', icon: Users },
    { id: 'sources', name: 'Sources', icon: Rss },
    { id: 'ai', name: 'Analyse IA', icon: Brain },
    { id: 'support', name: 'Support', icon: HeadphonesIcon },
    { id: 'glossary', name: 'Glossaire', icon: Settings }
  ];

  // User CRUD functions
  const handleSaveUser = (userData) => {
    setUsers(prevUsers => {
      const existingIndex = prevUsers.findIndex(u => u.id === userData.id);
      if (existingIndex >= 0) {
        // Update existing user
        const updated = [...prevUsers];
        updated[existingIndex] = userData;
        return updated;
      } else {
        // Add new user
        return [...prevUsers, userData];
      }
    });
  };

  const handleDeleteUser = (userId) => {
    setConfirmModal({
      isOpen: true,
      title: "Supprimer l'utilisateur",
      message: "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.",
      onConfirm: () => {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
        toast({
          title: "Succès",
          description: "Utilisateur supprimé avec succès !",
        });
      }
    });
  };

  // Source CRUD functions
  const handleSaveSource = (sourceData) => {
    setSources(prevSources => {
      const existingIndex = prevSources.findIndex(s => s.id === sourceData.id);
      if (existingIndex >= 0) {
        // Update existing source
        const updated = [...prevSources];
        updated[existingIndex] = sourceData;
        return updated;
      } else {
        // Add new source
        return [...prevSources, sourceData];
      }
    });
  };

  const handleDeleteSource = (sourceId) => {
    setConfirmModal({
      isOpen: true,
      title: "Supprimer la source",
      message: "Êtes-vous sûr de vouloir supprimer cette source ? Cette action est irréversible.",
      onConfirm: () => {
        setSources(prevSources => prevSources.filter(s => s.id !== sourceId));
        toast({
          title: "Succès",
          description: "Source supprimée avec succès !",
        });
      }
    });
  };

  const UsersTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Gestion des utilisateurs ({users.length})
        </h3>
        <button 
          onClick={() => setUserModal({ isOpen: true, user: null })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Nouvel utilisateur</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        {users.map((user, index) => (
          <div 
            key={user.id} 
            className={`p-4 flex items-center justify-between ${index !== users.length - 1 ? 'border-b border-gray-100 dark:border-slate-700' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'admin' 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {user.role}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setUserModal({ isOpen: true, user })}
                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDeleteUser(user.id)}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SourcesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Sources de news ({sources.length})
        </h3>
        <button 
          onClick={() => setSourceModal({ isOpen: true, source: null })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Nouvelle source</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sources.map((source) => (
          <div key={source.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${source.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <h4 className="font-medium text-gray-900 dark:text-white">{source.name}</h4>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs">
                  {source.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSourceModal({ isOpen: true, source })}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteSource(source.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{source.url}</p>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Crédibilité: <span className="font-medium text-green-600 dark:text-green-400">{source.credibilityScore}/10</span>
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Dernière mise à jour: {new Date(source.lastUpdated).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AITab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analyse de contenu IA</h3>
      
      <div className="grid gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Configuration de l'analyse</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Modèle d'IA
              </label>
              <select className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white">
                <option>GPT-4</option>
                <option>Claude-3</option>
                <option>Gemini Pro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paramètres d'analyse
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Sentiment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Fiabilité</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Classification</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Résumé automatique</span>
                </label>
              </div>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Sauvegarder la configuration
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Statistiques récentes</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Articles analysés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">98.3%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Précision moyenne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SupportTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support utilisateur</h3>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">12</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tickets ouverts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">45</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tickets résolus</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.8</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Satisfaction moyenne</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">Tickets récents</h4>
          {[1, 2, 3].map((ticket) => (
            <div key={ticket} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Problème de connexion</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com - Il y a 2h</p>
              </div>
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded text-xs">
                En attente
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GlossaryTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Gestion du glossaire ({glossaryTerms.length} termes)
        </h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Nouveau terme</span>
        </button>
      </div>

      <div className="space-y-3">
        {glossaryTerms.map((term) => (
          <div key={term.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{term.term}</h4>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs">
                    {term.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{term.definition}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users': return <UsersTab />;
      case 'sources': return <SourcesTab />;
      case 'ai': return <AITab />;
      case 'support': return <SupportTab />;
      case 'glossary': return <GlossaryTab />;
      default: return <UsersTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ArrowLeft 
              size={24} 
              className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              onClick={() => navigate(-1)}
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Panel Administrateur</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bienvenue, {user?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 pb-24">
        {renderTabContent()}
      </div>

      {/* Modals */}
      <UserModal
        isOpen={userModal.isOpen}
        onClose={() => setUserModal({ isOpen: false, user: null })}
        user={userModal.user}
        onSave={handleSaveUser}
      />

      <SourceModal
        isOpen={sourceModal.isOpen}
        onClose={() => setSourceModal({ isOpen: false, source: null })}
        source={sourceModal.source}
        onSave={handleSaveSource}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
};

export default AdminPanel;