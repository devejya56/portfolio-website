import React, { useState } from 'react';
import './DevejyaPortfolio.css';

const DevejyaPortfolio = () => {
  const [activeSection, setActiveSection] = useState('about');

  const projects = [
    {
      title: 'AI Recruiter Copilot',
      description: 'Multi-LLM orchestration for automated candidate sourcing, screening, and engagement',
      tech: ['Python', 'LangChain', 'OpenAI/Gemini', 'FastAPI'],
      link: 'https://github.com/devejya56/ai-recruiter-copilot',
      icon: '🤖'
    },
    {
      title: 'Document OCR Verification System',
      description: 'End-to-end OCR with document extraction, verification APIs, and MOSIP integration',
      tech: ['Python', 'PyTorch', 'FastAPI', 'REST APIs'],
      link: 'https://github.com/devejya56/document-ocr-verification-system',
      icon: '📄'
    },
    {
      title: 'Aura Local File Agent',
      description: 'Local-context AI agent for file Q&A and knowledge-based task automation',
      tech: ['Python', 'LangChain', 'RAG', 'Retrieval'],
      link: 'https://github.com/devejya56/aura-local-file-agent',
      icon: '🔍'
    },
    {
      title: 'Credit Card Fraud Detection',
      description: 'ML models with class imbalance handling, ROC-AUC evaluation, and robust metrics',
      tech: ['Python', 'scikit-learn', 'pandas', 'ML'],
      link: 'https://github.com/devejya56/Credit-Card-Fraud-Detection',
      icon: '🎯'
    },
    {
      title: 'Machine Learning Lab Codes',
      description: 'Comprehensive ML implementations: regression, classification, clustering, preprocessing',
      tech: ['Python', 'Jupyter', 'NumPy', 'pandas'],
      link: 'https://github.com/devejya56/Machine-Learning-Lab-Codes',
      icon: '📊'
    },
    {
      title: 'Emotion Detection Model',
      description: 'Transformer-based emotion classification from text using fine-tuned models',
      tech: ['Python', 'Transformers', 'NLP', 'DistilBERT'],
      link: 'https://github.com/devejya56',
      icon: '😊'
    }
  ];

  const skills = {
    'Languages': ['Python', 'JavaScript', 'SQL'],
    'ML/AI': ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face'],
    'NLP & LLMs': ['Transformers', 'LangChain', 'RAG', 'Prompt Engineering'],
    'Tools': ['FastAPI', 'Docker', 'Git', 'Jupyter', 'VS Code'],
    'Specialties': ['NLP', 'LLM Orchestration', 'Multi-Agent Systems', 'MLOps']
  };

  const expertise = [
    { category: 'Machine Learning', items: ['Model Training & Evaluation', 'Data Preprocessing', 'Class Imbalance Handling', 'Hyperparameter Tuning'] },
    { category: 'NLP & LLMs', items: ['Transformer Models', 'Prompt Engineering', 'RAG Systems', 'Fine-tuning'] },
    { category: 'System Design', items: ['REST APIs', 'Agent Orchestration', 'Production Architecture', 'MLOps'] },
    { category: 'Specializations', items: ['AI-powered Recruitment', 'Document Processing', 'Q&A Systems', 'Knowledge Agents'] }
  ];

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="portfolio-header">
        <div className="header-content">
          <h1 className="title">Devejya Pandey</h1>
          <p className="subtitle">AI/ML Engineer | NLP & LLM Specialist | Python Developer</p>
          <p className="tagline">Building intelligent multi-agent systems with transformers & LLMs</p>
          <div className="header-links">
            <a href="mailto:devejya.23fe10cse00662@muj.manipal.edu" className="link-btn">📧 Email</a>
            <a href="https://linkedin.com/in/devejya-pandey" className="link-btn">💼 LinkedIn</a>
            <a href="https://github.com/devejya56" className="link-btn">🐙 GitHub</a>
            <a href="https://devejya56.github.io/portfolio-website" className="link-btn">🌐 Portfolio</a>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-tabs">
        <button className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setActiveSection('about')}>About</button>
        <button className={`nav-btn ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setActiveSection('projects')}>Projects</button>
        <button className={`nav-btn ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setActiveSection('skills')}>Skills & Tech</button>
        <button className={`nav-btn ${activeSection === 'expertise' ? 'active' : ''}`} onClick={() => setActiveSection('expertise')}>Expertise</button>
        <button className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => setActiveSection('contact')}>Contact</button>
      </nav>

      {/* Content Sections */}
      <main className="portfolio-content">
        {/* About Section */}
        {activeSection === 'about' && (
          <section className="section about-section">
            <h2>🧠 About Me</h2>
            <p>I'm an AI/ML Engineer specializing in NLP, LLMs, and multi-agent systems. I focus on building production-ready intelligent systems with transformers, RAG pipelines, and LLM orchestration.</p>
            <div className="about-grid">
              <div className="about-card">
                <h3>🤖 Currently Working On</h3>
                <ul>
                  <li>Multi-LLM orchestration for recruitment automation</li>
                  <li>Document processing and verification systems</li>
                  <li>RAG-based local file agents</li>
                  <li>Clean ML implementations and MLOps practices</li>
                </ul>
              </div>
              <div className="about-card">
                <h3>🎓 Education</h3>
                <ul>
                  <li><strong>Manipal University Jaipur</strong> - CSE (AI/ML Focus)</li>
                  <li>Continuous Learning: Transformers, LLM Prompt Engineering, MLOps</li>
                  <li>Certifications: Salesforce Trailhead</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <section className="section projects-section">
            <h2>✨ Featured Projects</h2>
            <div className="projects-grid">
              {projects.map((project, idx) => (
                <div key={idx} className="project-card">
                  <div className="project-icon">{project.icon}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">→ View Repository</a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <section className="section skills-section">
            <h2>🛠 Tech Stack & Skills</h2>
            <div className="skills-grid">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="skill-category">
                  <h3>{category}</h3>
                  <div className="skill-items">
                    {items.map((item, idx) => <span key={idx} className="skill-item">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Expertise Section */}
        {activeSection === 'expertise' && (
          <section className="section expertise-section">
            <h2>🎯 Key Expertise</h2>
            <div className="expertise-grid">
              {expertise.map((exp, idx) => (
                <div key={idx} className="expertise-card">
                  <h3>{exp.category}</h3>
                  <ul>
                    {exp.items.map((item, i) => <li key={i}>✓ {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="section contact-section">
            <h2>📞 Let's Connect!</h2>
            <div className="contact-content">
              <p>I'm open to collaborations, AI/ML opportunities, and internships in NLP, LLMs, and MLOps.</p>
              <div className="contact-grid">
                <div className="contact-item">
                  <h3>Email</h3>
                  <a href="mailto:devejya.23fe10cse00662@muj.manipal.edu">devejya.23fe10cse00662@muj.manipal.edu</a>
                </div>
                <div className="contact-item">
                  <h3>LinkedIn</h3>
                  <a href="https://linkedin.com/in/devejya-pandey" target="_blank" rel="noopener noreferrer">linkedin.com/in/devejya-pandey</a>
                </div>
                <div className="contact-item">
                  <h3>GitHub</h3>
                  <a href="https://github.com/devejya56" target="_blank" rel="noopener noreferrer">github.com/devejya56</a>
                </div>
                <div className="contact-item">
                  <h3>Location</h3>
                  <p>Jaipur, Rajasthan 🇮🇳</p>
                </div>
              </div>
              <p className="footer-quote"><strong>"Building the future of AI, one model at a time."</strong></p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>© 2026 Devejya Pandey. Built with React & ❤️ | <a href="https://github.com/devejya56/portfolio-website">Source Code</a></p>
      </footer>
    </div>
  );
};

export default DevejyaPortfolio;
