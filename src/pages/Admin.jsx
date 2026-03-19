import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Check, Trash2, Layout, User, Briefcase, Camera } from 'lucide-react';
import { saveLocalData, getLocalData, deleteLocalData, STORAGE_KEYS } from '../data/persistence';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'manage'
  const [formData, setFormData] = useState({
    section: 'CORPORATE',
    title: '',
    category: '',
    year: new Date().getFullYear().toString(),
    description: '',
    coverImage: '',
    gallery: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    refreshLocalItems();
  }, [formData.section]);

  const refreshLocalItems = () => {
    const key = STORAGE_KEYS[formData.section];
    if (key) {
      setLocalItems(getLocalData(key));
    }
  };

  const handleImageUpload = (e, target) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const processFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };

    if (target === 'coverImage') {
      processFile(files[0]).then(base64 => {
        setFormData(prev => ({ ...prev, coverImage: base64 }));
      });
    } else {
      const promises = Array.from(files).map(processFile);
      Promise.all(promises).then(base64s => {
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...base64s] }));
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.coverImage || !formData.title) {
       showToast('Please add a title and cover image', 'error');
       return;
    }

    setIsSubmitting(true);
    
    const newItem = {
      ...formData,
      id: `${formData.section.toLowerCase()}-${Date.now()}`,
      // Adapt structure based on section
      image: formData.coverImage, // For Gallery items
    };

    const key = STORAGE_KEYS[formData.section];
    saveLocalData(key, newItem);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Project Published Successfully', 'success');
      setFormData({
        section: formData.section,
        title: '',
        category: '',
        year: new Date().getFullYear().toString(),
        description: '',
        coverImage: '',
        gallery: []
      });
      refreshLocalItems();
    }, 800);
  };

  const handleDelete = (id) => {
    const key = STORAGE_KEYS[formData.section];
    deleteLocalData(key, id);
    showToast('Item deleted', 'success');
    refreshLocalItems();
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container admin-page"
      style={{ paddingTop: '120px' }}
    >
      <div className="admin-header">
        <span className="section-label">Studio Archive // Admin Portfolio</span>
        <h1 className="gallery-hero-title">PUBLISH CENTER</h1>
        
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            New Project
          </button>
          <button 
            className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Uploads
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'upload' ? (
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="admin-form"
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              <div className="form-left">
                <div className="input-group">
                  <label>TARGET SECTION</label>
                  <select 
                    value={formData.section} 
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                  >
                    <option value="ARTISTS">ARTISTS</option>
                    <option value="FESTS">FESTS</option>
                    <option value="BRANDS">BRANDS</option>
                    <option value="CORPORATE">CORPORATE</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>PROJECT TITLE</label>
                  <input 
                    type="text" 
                    placeholder="E.G. SONIC VOID" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value.toUpperCase()})}
                  />
                </div>

                <div className="input-row">
                  <div className="input-group">
                    <label>CATEGORY</label>
                    <input 
                      type="text" 
                      placeholder="E.G. FASHION" 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value.toUpperCase()})}
                    />
                  </div>
                  <div className="input-group">
                    <label>YEAR</label>
                    <input 
                      type="text" 
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>DESCRIPTION</label>
                  <textarea 
                    rows="5" 
                    placeholder="Project overview and details..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-right">
                <div className="input-group">
                  <label>COVER IMAGE</label>
                  <div className="media-upload-zone" style={{ height: '300px' }}>
                    {formData.coverImage ? (
                      <div className="preview-container">
                        <img src={formData.coverImage} className="preview-img" alt="cover" />
                        <button type="button" className="remove-btn" onClick={() => setFormData({...formData, coverImage: ''})}>
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="upload-placeholder">
                        <Upload size={32} />
                        <span>Upload Hero Visual</span>
                        <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'coverImage')} />
                      </label>
                    )}
                  </div>
                </div>

                {formData.section === 'ARTISTS' && (
                  <div className="input-group">
                    <label>GALLERY MEDIA (DETAIL VIEW)</label>
                    <div className="gallery-previews">
                      {formData.gallery.map((img, i) => (
                        <div key={i} className="gallery-preview-item">
                          <img src={img} alt="gallery" />
                          <button type="button" onClick={() => setFormData(prev => ({...prev, gallery: prev.gallery.filter((_, idx) => idx !== i)}))}>
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                      <label className="gallery-add-btn">
                        <Upload size={20} />
                        <input type="file" hidden multiple accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery')} />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-footer">
              <button 
                type="submit" 
                className={`btn-publish ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'ENCODING...' : (
                  <>PUBLISH TO ARCHIVE <Check size={16} /></>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <div className="management-view">
             <div className="management-filter">
               <label>FILTER BY SECTION:</label>
                <select 
                    value={formData.section} 
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                  >
                    <option value="ARTISTS">ARTISTS</option>
                    <option value="FESTS">FESTS</option>
                    <option value="BRANDS">BRANDS</option>
                    <option value="CORPORATE">CORPORATE</option>
                  </select>
             </div>

             <div className="management-grid">
               {localItems.length === 0 ? (
                 <div className="empty-state">No dynamic uploads found in this section.</div>
               ) : (
                 localItems.map(item => (
                   <div key={item.id} className="management-card">
                      <img src={item.coverImage} alt={item.title} />
                      <div className="management-meta">
                        <h4>{item.title}</h4>
                        <span>{item.category} // {item.year}</span>
                      </div>
                      <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                        <Trash2 size={16} />
                      </button>
                   </div>
                 ))
               )}
             </div>
          </div>
        )}
      </div>

      {toast && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`admin-toast ${toast.type}`}
        >
          {toast.message}
        </motion.div>
      )}

      <style>{`
        .admin-page { max-width: 1200px; margin: 0 auto; color: white; min-height: 100vh; padding-bottom: 100px; }
        .admin-header { margin-bottom: 60px; }
        .admin-tabs { display: flex; gap: 20px; margin-top: 40px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .admin-tab { 
          padding: 15px 30px; 
          background: none; 
          border: none; 
          color: var(--dim); 
          font-family: var(--fm); 
          font-size: 10px; 
          letter-spacing: 2px; 
          cursor: pointer;
          position: relative;
        }
        .admin-tab.active { color: white; }
        .admin-tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: var(--accent); }
        
        .admin-form { background: var(--panel); padding: 40px; border-radius: 4px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
        .form-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 60px; }
        
        .input-group { margin-bottom: 25px; }
        .input-group label { display: block; font-family: var(--fm); font-size: 10px; color: var(--accent); margin-bottom: 10px; letter-spacing: 1px; }
        .input-group input, .input-group select, .input-group textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 15px;
          color: white;
          font-family: var(--fm-body, sans-serif);
          font-size: 14px;
          outline: none;
        }
        .input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: var(--accent); }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        
        .media-upload-zone { 
          border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .upload-placeholder { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          height: 100%; 
          color: var(--dim); cursor: pointer;
          transition: 0.3s;
        }
        .upload-placeholder:hover { background: rgba(255,255,255,0.02); color: white; }
        .upload-placeholder span { font-family: var(--fm); font-size: 10px; margin-top: 15px; letter-spacing: 1px; }
        
        .preview-container { height: 100%; position: relative; }
        .preview-img { width: 100%; height: 100%; object-fit: cover; }
        .remove-btn { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.8); border: none; color: white; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        
        .gallery-previews { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px; }
        .gallery-preview-item { aspect-ratio: 1; border-radius: 4px; overflow: hidden; position: relative; }
        .gallery-preview-item img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-preview-item button { position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.8); border: none; color: white; width: 18px; height: 18px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .gallery-add-btn { aspect-ratio: 1; border: 1px dashed rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: var(--dim); cursor: pointer; border-radius: 4px; }
        
        .btn-publish { 
          width: 100%; 
          margin-top: 40px; 
          padding: 20px; 
          background: white; 
          color: black; 
          border: none; 
          font-family: var(--fb); 
          font-size: 20px; 
          letter-spacing: -0.5px; 
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          transition: 0.4s;
        }
        .btn-publish:hover { background: var(--accent); color: white; }
        .btn-publish.loading { opacity: 0.7; cursor: wait; }

        .management-view { margin-top: 40px; }
        .management-filter { margin-bottom: 30px; display: flex; align-items: center; gap: 20px; }
        .management-filter label { font-family: var(--fm); font-size: 10px; color: var(--accent); }
        .management-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; }
        .management-card { background: var(--panel); border-radius: 4px; overflow: hidden; position: relative; border: 1px solid rgba(255,255,255,0.05); }
        .management-card img { width: 100%; height: 180px; object-fit: cover; }
        .management-meta { padding: 20px; }
        .management-meta h4 { font-family: var(--fb); font-size: 18px; color: white; margin-bottom: 5px; }
        .management-meta span { font-family: var(--fm); font-size: 8px; color: var(--dim); letter-spacing: 1px; }
        .delete-btn { position: absolute; top: 10px; right: 10px; background: rgba(255,0,0,0.2); color: #ff4444; border: 1px solid rgba(255,0,0,0.3); width: 34px; height: 34px; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
        .delete-btn:hover { background: #ff4444; color: white; }
        
        .admin-toast { position: fixed; bottom: 40px; right: 40px; padding: 20px 40px; border-radius: 4px; font-family: var(--fm); font-size: 10px; letter-spacing: 1px; z-index: 1000; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .admin-toast.success { background: white; color: black; }
        .admin-toast.error { background: #ff4444; color: white; }
        .empty-state { grid-column: 1/-1; text-align: center; padding: 100px; color: var(--dim); font-family: var(--fm); font-size: 10px; letter-spacing: 2px; }
      `}</style>
    </motion.div>
  );
};

export default Admin;
