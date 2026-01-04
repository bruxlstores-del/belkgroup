import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  LogOut, Plus, Edit2, Trash2, Save, X, Upload,
  LayoutDashboard, Briefcase, Image as ImageIcon, MessageSquare
} from 'lucide-react';
import axios from 'axios';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddGallery, setShowAddGallery] = useState(false);
  const navigate = useNavigate();

  const getAuthHeader = () => ({
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      await axios.get(`${API}/admin/verify`, getAuthHeader());
    } catch (error) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminEmail');
      navigate('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      const [servicesRes, galleryRes, contactsRes] = await Promise.all([
        axios.get(`${API}/admin/services`, getAuthHeader()),
        axios.get(`${API}/admin/gallery`, getAuthHeader()),
        axios.get(`${API}/admin/contacts`, getAuthHeader())
      ]);

      setServices(servicesRes.data);
      setGallery(galleryRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  // Service handlers
  const handleSaveService = async (service) => {
    try {
      if (service.id) {
        await axios.put(`${API}/admin/services/${service.id}`, service, getAuthHeader());
        toast({ title: "Service mis à jour avec succès ✓" });
      } else {
        await axios.post(`${API}/admin/services`, service, getAuthHeader());
        toast({ title: "Service créé avec succès ✓" });
      }
      await fetchData(); // Reload data
      setEditingService(null);
      setShowAddService(false);
      
      // Notify that changes are live
      toast({
        title: "Synchronisation en temps réel",
        description: "Les changements sont maintenant visibles sur le site public.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Erreur lors de la sauvegarde",
        variant: "destructive"
      });
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;
    
    try {
      await axios.delete(`${API}/admin/services/${id}`, getAuthHeader());
      toast({ title: "Service supprimé avec succès ✓" });
      await fetchData(); // Reload data
      
      // Notify that changes are live
      toast({
        title: "Synchronisation en temps réel",
        description: "Les changements sont maintenant visibles sur le site public.",
      });
    } catch (error) {
      toast({ title: "Erreur", description: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  // Gallery handlers
  const handleSaveGallery = async (item) => {
    try {
      if (item.id) {
        await axios.put(`${API}/admin/gallery/${item.id}`, item, getAuthHeader());
        toast({ title: "Réalisation mise à jour avec succès ✓" });
      } else {
        await axios.post(`${API}/admin/gallery`, item, getAuthHeader());
        toast({ title: "Réalisation créée avec succès ✓" });
      }
      await fetchData(); // Reload data
      setEditingGallery(null);
      setShowAddGallery(false);
      
      // Notify that changes are live
      toast({
        title: "Synchronisation en temps réel",
        description: "Les changements sont maintenant visibles sur le site public.",
      });
    } catch (error) {
      toast({ title: "Erreur", description: "Erreur lors de la sauvegarde", variant: "destructive" });
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) return;
    
    try {
      await axios.delete(`${API}/admin/gallery/${id}`, getAuthHeader());
      toast({ title: "Réalisation supprimée avec succès ✓" });
      await fetchData(); // Reload data
      
      // Notify that changes are live
      toast({
        title: "Synchronisation en temps réel",
        description: "Les changements sont maintenant visibles sur le site public.",
      });
    } catch (error) {
      toast({ title: "Erreur", description: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;
    
    try {
      await axios.delete(`${API}/admin/contacts/${id}`, getAuthHeader());
      toast({ title: "Message supprimé" });
      fetchData();
    } catch (error) {
      toast({ title: "Erreur", description: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-sm text-gray-500">{localStorage.getItem('adminEmail')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="gap-2"
              >
                Voir le site
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="services" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Réalisations
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Messages ({contacts.length})
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestion des Services</h2>
                <Button
                  onClick={() => setShowAddService(true)}
                  className="bg-cyan-600 hover:bg-cyan-700 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un service
                </Button>
              </div>

              {showAddService && (
                <ServiceForm
                  onSave={handleSaveService}
                  onCancel={() => setShowAddService(false)}
                />
              )}

              <div className="grid gap-4">
                {services.map((service) => (
                  editingService?.id === service.id ? (
                    <ServiceForm
                      key={service.id}
                      service={service}
                      onSave={handleSaveService}
                      onCancel={() => setEditingService(null)}
                    />
                  ) : (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onEdit={() => setEditingService(service)}
                      onDelete={() => handleDeleteService(service.id)}
                    />
                  )
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestion des Réalisations</h2>
                <Button
                  onClick={() => setShowAddGallery(true)}
                  className="bg-cyan-600 hover:bg-cyan-700 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une réalisation
                </Button>
              </div>

              {showAddGallery && (
                <GalleryForm
                  onSave={handleSaveGallery}
                  onCancel={() => setShowAddGallery(false)}
                />
              )}

              <div className="grid gap-4">
                {gallery.map((item) => (
                  editingGallery?.id === item.id ? (
                    <GalleryForm
                      key={item.id}
                      item={item}
                      onSave={handleSaveGallery}
                      onCancel={() => setEditingGallery(null)}
                    />
                  ) : (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onEdit={() => setEditingGallery(item)}
                      onDelete={() => handleDeleteGallery(item.id)}
                    />
                  )
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Messages de contact</h2>
              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onDelete={() => handleDeleteContact(contact.id)}
                  />
                ))}
                {contacts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucun message pour le moment</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Service Form Component
const ServiceForm = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState(service || {
    title: '',
    description: '',
    image: '',
    order: 0
  });
  const [uploading, setUploading] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  const getAuthHeader = () => ({
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const response = await axios.post(
        `${API}/admin/upload-image`,
        uploadData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const imageUrl = response.data.url;
      console.log('Image uploaded:', imageUrl);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast({ title: "Image téléchargée avec succès" });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: "Erreur lors du téléchargement", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="border-2 border-cyan-500">
      <CardContent className="p-6 space-y-4">
        <Input
          placeholder="Titre du service"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            disabled={uploading}
          />
          {formData.image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Aperçu de l'image :</p>
              <img 
                src={formData.image.startsWith('http') ? formData.image : `${BACKEND_URL}${formData.image.startsWith('/uploads/') ? formData.image.replace('/uploads/', '/api/uploads/') : formData.image}`} 
                alt="Preview" 
                className="h-32 rounded-lg border"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/200x128?text=Erreur+Image';
                }}
              />
            </div>
          )}
          {!formData.image && (
            <p className="text-sm text-gray-400 mt-2">Aucune image sélectionnée</p>
          )}
          {uploading && <p className="text-sm text-gray-500">Téléchargement en cours...</p>}
        </div>
        <Input
          type="number"
          placeholder="Ordre d'affichage"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
        />
        <div className="flex gap-2">
          <Button onClick={() => onSave(formData)} className="bg-cyan-600 hover:bg-cyan-700 gap-2">
            <Save className="w-4 h-4" />
            Sauvegarder
          </Button>
          <Button onClick={onCancel} variant="outline" className="gap-2">
            <X className="w-4 h-4" />
            Annuler
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Service Card Component
const ServiceCard = ({ service, onEdit, onDelete }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  // Handle both old (/uploads/) and new (/api/uploads/) paths
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    // Convert /uploads/ to /api/uploads/ if needed
    const normalizedPath = image.startsWith('/uploads/') 
      ? image.replace('/uploads/', '/api/uploads/') 
      : image;
    return `${BACKEND_URL}${normalizedPath}`;
  };
  
  const imageUrl = getImageUrl(service.image);
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          {service.image && (
            <img 
              src={imageUrl} 
              alt={service.title} 
              className="w-32 h-32 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://placehold.co/128x128?text=Image';
              }}
            />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex gap-2">
              <Button onClick={onEdit} variant="outline" size="sm" className="gap-2">
                <Edit2 className="w-4 h-4" />
                Modifier
              </Button>
              <Button onClick={onDelete} variant="destructive" size="sm" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Gallery Form Component - Simplified without categories
const GalleryForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState(item || {
    title: '',
    description: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const response = await axios.post(
        `${API}/admin/upload-image`,
        uploadData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const imageUrl = response.data.url;
      console.log('Image uploaded:', imageUrl);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast({ title: "Image téléchargée avec succès" });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: "Erreur lors du téléchargement", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const normalizedPath = url.startsWith('/uploads/') 
      ? url.replace('/uploads/', '/api/uploads/') 
      : url;
    return `${BACKEND_URL}${normalizedPath}`;
  };

  return (
    <Card className="border-2 border-cyan-500">
      <CardContent className="p-6 space-y-4">
        <Input
          placeholder="Titre (optionnel)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Textarea
          placeholder="Description (optionnel)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            disabled={uploading}
          />
          {formData.image && (
            <div className="mt-2">
              <img 
                src={getImageUrl(formData.image)} 
                alt="Preview" 
                className="h-32 rounded-lg border"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/200x128?text=Erreur+Image';
                }}
              />
            </div>
          )}
        </div>
        
        {uploading && <p className="text-sm text-cyan-600 animate-pulse">Téléchargement en cours...</p>}
        
        <div className="flex gap-2">
          <Button onClick={() => onSave(formData)} className="bg-cyan-600 hover:bg-cyan-700 gap-2" disabled={uploading}>
            <Save className="w-4 h-4" />
            Sauvegarder
          </Button>
          <Button onClick={onCancel} variant="outline" className="gap-2">
            <X className="w-4 h-4" />
            Annuler
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Gallery Card Component - Simplified without categories
const GalleryCard = ({ item, onEdit, onDelete }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const normalizedPath = url.startsWith('/uploads/') 
      ? url.replace('/uploads/', '/api/uploads/') 
      : url;
    return `${BACKEND_URL}${normalizedPath}`;
  };
  
  const imageUrl = item.image || item.image_after || item.image_before;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {imageUrl && (
            <img 
              src={getImageUrl(imageUrl)} 
              alt={item.title || 'Photo'} 
              className="w-32 h-32 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://placehold.co/128x128?text=Image';
              }}
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{item.title || 'Sans titre'}</h3>
            {item.description && (
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            )}
            <div className="flex gap-2">
              <Button onClick={onEdit} variant="outline" size="sm" className="gap-2">
                <Edit2 className="w-4 h-4" />
                Modifier
              </Button>
              <Button onClick={onDelete} variant="destructive" size="sm" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Contact Card Component
const ContactCard = ({ contact, onDelete }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-bold">{contact.name}</h3>
            <span className="text-xs text-gray-500">
              {new Date(contact.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> {contact.email}</p>
            {contact.phone && <p><strong>Téléphone:</strong> {contact.phone}</p>}
            {contact.postalCode && <p><strong>Code postal:</strong> {contact.postalCode}</p>}
            <p><strong>Sujet:</strong> {contact.subject}</p>
            <p className="text-gray-600 mt-3">{contact.message}</p>
          </div>
        </div>
        <Button onClick={onDelete} variant="destructive" size="sm" className="gap-2">
          <Trash2 className="w-4 h-4" />
          Supprimer
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default AdminDashboard;