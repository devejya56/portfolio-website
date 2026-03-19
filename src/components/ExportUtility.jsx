import React from 'react';
import { STORAGE_KEYS, getLocalData } from '../data/persistence';
import { Download, Copy, Check } from 'lucide-react';

const ExportUtility = () => {
  const [copied, setCopied] = React.useState(false);

  const getFullData = () => {
    const data = {};
    Object.keys(STORAGE_KEYS).forEach(key => {
      data[key] = getLocalData(STORAGE_KEYS[key]);
    });
    return JSON.stringify(data, null, 2);
  };

  const handleDownload = () => {
    const data = getFullData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_export_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const data = getFullData();
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="export-utility">
      <div className="export-header">
        <h4>EXPORT ARCHIVE DATA</h4>
        <p>Convert your browser-based uploads into a permanent JSON format to integrate with the project source.</p>
      </div>
      
      <div className="export-actions">
        <button onClick={handleDownload} className="export-btn download">
          <Download size={16} /> DOWNLOAD JSON
        </button>
        <button onClick={handleCopy} className="export-btn copy">
          {copied ? <Check size={16} /> : <Copy size={16} />} 
          {copied ? 'COPIED!' : 'COPY TO CLIPBOARD'}
        </button>
      </div>

      <style>{`
        .export-utility {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 30px;
          border-radius: 4px;
          margin-top: 40px;
        }
        .export-header h4 { font-family: var(--fb); font-size: 16px; margin-bottom: 5px; color: var(--accent); }
        .export-header p { font-family: var(--fm); font-size: 10px; color: var(--dim); margin-bottom: 25px; }
        .export-actions { display: flex; gap: 15px; }
        .export-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: white;
          font-family: var(--fm);
          font-size: 10px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: 0.3s;
        }
        .export-btn:hover { background: rgba(255,255,255,0.1); border-color: white; }
        .export-btn.download { background: var(--accent); color: white; border: none; }
        .export-btn.download:hover { opacity: 0.9; }
      `}</style>
    </div>
  );
};

export default ExportUtility;
