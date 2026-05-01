import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Image, Video, Upload, Filter, Eye, Download, X, Camera, Film } from 'lucide-react';

export default function MediaGallery() {
  const { user } = useContext(AuthContext);
  const [media, setMedia] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [preview, setPreview] = useState(null);
  const [newMedia, setNewMedia] = useState({ title: '', type: 'image' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/media`);
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!newMedia.title.trim() || !selectedFile) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', newMedia.title);
    formData.append('type', newMedia.type);
    formData.append('author', user?.name || 'Anonymous');
    formData.append('dept', user?.department || 'Media');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/media/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const uploadedItem = await response.json();
        setMedia([uploadedItem, ...media]);
        setNewMedia({ title: '', type: 'image' });
        setSelectedFile(null);
        setShowUpload(false);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const colors = [
    'from-[#ef4444]/30 to-blue-500/30',
    'from-blue-500/30 to-emerald-500/30',
    'from-pink-500/30 to-orange-500/30',
    'from-emerald-500/30 to-yellow-500/30',
    'from-orange-500/30 to-red-500/30',
    'from-cyan-500/30 to-purple-500/30',
  ];

  const filtered = filter === 'all' ? media : media.filter(m => m.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Media Gallery</h2>
          <p className="text-gray-400 text-sm">{media.length} files uploaded by the team</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            {['all', 'image', 'video'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-medium transition-all flex items-center gap-1.5 ${
                  filter === f ? 'bg-[#ef4444] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {f === 'all' ? <Filter className="w-3 h-3" /> : f === 'image' ? <Camera className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <Upload className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#1e2128] rounded-2xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-lg">Upload Media</h3>
              <button onClick={() => setShowUpload(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <input
              value={newMedia.title}
              onChange={e => setNewMedia({ ...newMedia, title: e.target.value })}
              placeholder="File title..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm mb-4 outline-none focus:border-[#ef4444] transition-all"
            />
            <select
              value={newMedia.type}
              onChange={e => setNewMedia({ ...newMedia, type: e.target.value })}
              className="w-full bg-[#0f1115] border border-white/10 rounded-xl py-3 px-4 text-white text-sm mb-4 outline-none"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept={newMedia.type === 'image' ? 'image/*' : 'video/*'}
            />
            
            <div 
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center mb-4 transition-colors cursor-pointer ${
                selectedFile ? 'border-[#ef4444]/50 bg-[#ef4444]/5' : 'border-white/10 hover:border-[#ef4444]/30'
              }`}
            >
              <Upload className={`w-8 h-8 mx-auto mb-2 ${selectedFile ? 'text-[#ef4444]' : 'text-gray-500'}`} />
              <p className="text-gray-400 text-xs">
                {selectedFile ? selectedFile.name : 'Click to browse files'}
              </p>
            </div>

            <button 
              onClick={handleUpload} 
              disabled={isUploading || !selectedFile || !newMedia.title}
              className="w-full bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all"
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className="group bg-[#1e2128] rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer"
            onClick={() => setPreview(item)}
          >
            <div className={`h-44 bg-[#0f1115] flex items-center justify-center relative`}>
              {item.url ? (
                item.type === 'image' ? (
                  <img src={`${import.meta.env.VITE_API_URL}${item.url}`} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <video src={`${import.meta.env.VITE_API_URL}${item.url}`} className="w-full h-full object-cover" />
                )
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${colors[idx % colors.length]} flex items-center justify-center`}>
                   {item.type === 'image' ? <Image className="w-12 h-12 text-white/30" /> : <Video className="w-12 h-12 text-white/30" />}
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>

              <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white border border-white/10 uppercase">
                {item.type}
              </span>
            </div>
            <div className="p-4">
              <h4 className="text-white font-medium text-sm group-hover:text-[#ef4444] transition-colors">{item.title}</h4>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#ef4444]/20 flex items-center justify-center text-[8px] text-[#ef4444] font-bold">{item.author.charAt(0)}</div>
                  <span className="text-gray-500 text-xs">{item.author}</span>
                </div>
                <span className="text-gray-500 text-[10px]">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" onClick={() => setPreview(null)}>
          <div className="w-full max-w-2xl bg-[#1e2128] rounded-2xl border border-white/10 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="min-h-64 bg-black flex items-center justify-center">
              {preview.url ? (
                preview.type === 'image' ? (
                  <img src={`${import.meta.env.VITE_API_URL}${preview.url}`} alt={preview.title} className="max-w-full max-h-[70vh] object-contain" />
                ) : (
                  <video src={`${import.meta.env.VITE_API_URL}${preview.url}`} controls className="max-w-full max-h-[70vh]" autoPlay />
                )
              ) : (
                <div className={`w-full h-64 bg-gradient-to-br ${colors[0]} flex items-center justify-center`}>
                  {preview.type === 'image' ? <Image className="w-20 h-20 text-white/20" /> : <Video className="w-20 h-20 text-white/20" />}
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white text-xl font-bold">{preview.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">By {preview.author} · {preview.date}</p>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`${import.meta.env.VITE_API_URL}${preview.url}`} 
                    download 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button onClick={() => setPreview(null)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
