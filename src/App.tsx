import { useState, useEffect } from 'react';
import  resume from  './assets/resume.pdf';
import { FaGithub, FaLinkedinIn, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './App.css';

// Types
type Project = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  image: string;
};

type Education = {
  id: number;
  institution: string;
  degree: string;
  field: string;
  year: string;
  courses?: string[];
};

type Skill = {
  name: string;
  level: number;
  category: 'technical' | 'soft';
};

// Data
const projects: Project[] = [
  {
    id: 1,
    name: 'Fitness App',
    description: 'A full-stack fitness application with user authentication, workout progress, and meal recommendation.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    githubLink: 'https://github.com/bajunii/fitflow',
    liveLink: 'https://fitflow-demo.com',
    image: 'src/assets/fitness.png.jpeg'
  },
  {
    id: 2,
    name: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects, skills, and contact information.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    githubLink: 'https://github.com/bajunii/My-Portfolio',
    liveLink: 'https://my-portfolio-khaki-seven-67.vercel.app/',
    image: 'src/assets/portfolio.png'
  },
  {
    id: 3,
    name: 'Swahilipot Hub Foundation',
    description: 'Swahilipot Hub Foundation is dedicated to nurturing youth talent through technology, arts, and entrepreneurship in the heart of East Africa.',
    technologies: ['React','Tailwind CSS', 'Typescript', 'Vite'],
    githubLink: 'https://github.com/mikesplore/swahilipot-hub-foundation',
    liveLink: 'https://www.swahilipothub.co.ke/',
    image: 'src/assets/swahilipot.png'
  },
];
const education: Education[] = [
  {
    id: 1,
    institution: 'Mount Kenya University',
    degree: 'Bachelor of Science',
    field: 'Information Technology',
    year: '2022 - 2025',
    courses: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems']
  },
  {
    id: 2,
    institution: 'Online Coding Bootcamp',
    degree: 'Certification',
    field: 'Full Stack Development',
    year: '2023 - 2024',
    courses: ['JavaScript', 'React', 'MongoDB']
  }
];

const skills: Skill[] = [
  { name: 'JavaScript', level:65, category: 'technical' },
  { name: 'React', level: 55, category: 'technical' },
  { name: 'TypeScript', level: 60, category: 'technical' },
  { name: 'Node.js', level: 35, category: 'technical' },
  { name: 'HTML/CSS', level: 95, category: 'technical' },
  { name: 'Communication', level: 90, category: 'soft' },
  { name: 'Teamwork', level: 85, category: 'soft' },
  { name: 'Problem Solving', level: 95, category: 'soft' },
  { name: 'Time Management', level: 80, category: 'soft' }
];

const socialLinks = {
  github: 'https://github.com/bajunii',
  linkedin: 'https://linkedin.com/in/haitham-omar',
  twitter: 'https://twitter.com/HaithamOma56317'
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset submission status after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const softSkills = skills.filter(skill => skill.category === 'soft');

  return (
    <div className="portfolio-app">
      {/* Header/Navigation */}
      <header className={`header ${scrollPosition > 50 ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Haitham Omar</a>
          
          <button 
            className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><a 
                href="#home" 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              >Home</a></li>
              <li><a 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >About</a></li>
              <li><a 
                href="#skills" 
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
              >Skills</a></li>
              <li><a 
                href="#projects" 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              >Projects</a></li>
              <li><a 
                href="#education" 
                className={activeSection === 'education' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}
              >Education</a></li>
              <li><a 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Hi, I'm <span className="highlight">Haitham Omar</span></h1>
            <h2>Full Stack Developer</h2>
            <p>Building digital solutions that make an impact</p>
            <div className="hero-buttons">
              <button className="btn primary" onClick={() => scrollToSection('projects')}>View My Work</button>
              <a href={resume} className="btn secondary"download="resume.pdf">Download Resume</a>
            </div>
          </div>
          <div className="hero-image">
            <img 
            src='src/assets/about.jpg'
              alt="Profile Photo" 
              className="profile-photo"
            />
            <div className="photo-frame"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about">
        <div className="container">
          <h2 className="section-title">About <span className="highlight">Me</span></h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate full-stack developer with 2 years of experience building web applications. 
                My journey in tech started when I built my first website at 19, and I've been hooked ever since.
              </p>
              <p>
                I specialize in JavaScript technologies across the stack, with expertise in React for frontend 
                and Django for backend development. I love solving complex problems and creating intuitive, 
                user-friendly interfaces.
              </p>
              <p>
                When I'm not coding, you can find me hiking, riding bikes, swimming, playing football or experimenting with 
                new technologies in my home lab.
              </p>
            </div>
            <div className="about-image">
              <img 
               src='src/assets/haitham.jpg'
                alt="About me illustration" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills">
        <div className="container">
          <h2 className="section-title">My <span className="highlight">Skills</span></h2>
          
          <div className="skills-container">
            <div className="skills-column">
              <h3>Technical Skills</h3>
              <ul className="skills-list">
                {technicalSkills.map((skill, index) => (
                  <li key={index}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div 
                        className="skill-level" 
                        style={{ width: `${skill.level}%` }}
                        data-level={skill.level}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="skills-column">
              <h3>Soft Skills</h3>
              <ul className="skills-list">
                {softSkills.map((skill, index) => (
                  <li key={index}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div 
                        className="skill-level" 
                        style={{ width: `${skill.level}%` }}
                        data-level={skill.level}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects">
        <div className="container">
          <h2 className="section-title">My <span className="highlight">Projects</span></h2>
          
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                  <div className="project-links">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        Live Demo
                      </a>
                    )}
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section education">
        <div className="container">
          <h2 className="section-title">My <span className="highlight">Education</span></h2>
          
          <div className="education-timeline">
            {education.map(edu => (
              <div key={edu.id} className="timeline-item">
                <div className="timeline-date">{edu.year}</div>
                <div className="timeline-content">
                  <h3>{edu.institution}</h3>
                  <p className="degree">{edu.degree} in {edu.field}</p>
                  {edu.courses && (
                    <div className="courses">
                      <h4>Relevant Courses:</h4>
                      <ul>
                        {edu.courses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="container">
          <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
          
          <div className="contact-container">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Feel free to reach out for collaboration or just to say hello!</p>
              
              <ul className="contact-details">
                <li>
                  <FaEnvelope />
                  <span> haithamomar520@gmail.com</span>
                </li>
                <li>
                  <FaPhone />
                  <span> +254 (794) 320-563</span>
                </li>
                <li>
                  <FaMapMarkerAlt />
                  <span> Mombasa, Kenya</span>
                </li>
              </ul>
              
              <div className="social-links">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </div>
            </div>
            
            <div className="contact-form">
              {isSubmitted ? (
                <div className="form-success">
                  <i className="fas fa-check-circle"></i>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn primary">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Haitham Omar. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;