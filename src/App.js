import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  GitHub, 
  Linkedin, 
  Code, 
  ArrowRight, 
  Award, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  FileText, 
  Phone, 
  Cpu, 
  Database, 
  Layers, 
  CheckCircle 
} from 'react-feather';
import Swal from 'sweetalert2';

import "./App.css";

// --- DATA FROM THE RESUME ---
const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#work", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#terminal", label: "Console" },
    { href: "#certifications", label: "Certifications" },
    { href: "#contact", label: "Contact" },
];

const socialLinks = [
    { href: "https://github.com/Harshalkhadatare", icon: <GitHub size={18} />, name: "GitHub" },
    { href: "https://www.linkedin.com/in/harshal-khadatare-9882ab23a/", icon: <Linkedin size={18} />, name: "LinkedIn" },
    { href: "https://leetcode.com/u/Harshhh_45/", icon: <Code size={18} />, name: "LeetCode" },
];

const projectsData = [
    { 
        title: "Post Office Management System", 
        description: "Built a secure ASP.NET Core MVC web app to automate localized postal operations. Designed a highly normalized relational schema in Entity Framework Core for high-performance CRUD actions. Implemented secure user authentication, registration flows, and real-time parcel tracking workflows.",
        tech: ["C#", "ASP.NET Core MVC", "SQL Server", "EF Core"],
        link: "https://github.com/Harshalkhadatare" 
    },
    { 
        title: "ERP Report Analyzer", 
        description: "Applied AI-assisted prompt engineering and data pipelines to parse, clean, and model raw spreadsheet data. Developed automated ETL routines loading data into Supabase, feeding direct analytical charts on front-end dashboards, and optimizing execution query time.",
        tech: ["Python", "Supabase", "JavaScript", "SQL", "Git"],
        link: "https://vision-report-transformer.vercel.app/" 
    },
    { 
        title: "ERP Studio Knowledge Hub", 
        description: "Engineered a centralized internal documentation repository mapping database relational schema, system integrations, and SQL workflows. Built a clean, SaaS-style searchable interface that slashed engineering lookup time.",
        tech: ["HTML5", "CSS3", "JavaScript", "MySQL"],
        link: "https://saas-studio-phi.vercel.app/"
    },
];

const experienceData = [
    {
        date: "Jan 2026 – Present",
        role: "Data Engineer - ERP Application Support",
        company: "Vision Infra Equipment Solutions Ltd.",
        location: "Pune, Maharashtra",
        points: [
            "Provide end-to-end technical production support for enterprise ERP software built on Microsoft .NET Core.",
            "Diagnose and troubleshoot operational system bugs across finance, inventory, and procurement modules.",
            "Write and optimize SQL Server database queries to validate relational data, audit system logs, and isolate anomalies.",
            "Collaborate closely with senior engineering leads to document requirements, reproduce edge cases, and verify fixes."
        ]
    }
];

const skillsData = {
    "Core Microsoft Stack": ["C#", ".NET Core", "ASP.NET Core MVC", "Entity Framework Core", "RESTful APIs", "LINQ", "Azure"],
    "Databases & Querying": ["SQL Server (SSMS)", "MySQL", "Database Optimization", "Data Validation"],
    "Languages & Frontend": ["JavaScript", "HTML5", "CSS3", "Responsive Web Design"],
    "Tools & Workflows": ["AWS", "Git", "GitHub", "Postman", "JIRA", "SDLC", "Debugging", "Software Testing", "Code Review"],
    "Core Strengths": ["Prompt Engineering", "Problem-Solving", "Continuous Learning"]
};

const certificationsData = [
    {
        title: "AWS Cloud Practitioner",
        issuer: "GeeksForGeeks",
        date: "2026",
        description: "Validated knowledge of cloud services, security policies, architectures, pricing, and support models on Amazon Web Services.",
        link: "#"
    },
    {
        title: "Career Essentials in Generative AI",
        issuer: "Microsoft & LinkedIn",
        date: "2025",
        description: "Gained core proficiencies in generative AI foundations, prompt engineering, search engine optimization, and responsible AI architectures.",
        link: "https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin"
    },
    {
        title: "Java Programming Professional Certification",
        issuer: "Validation Hub",
        date: "2025",
        description: "Covers advanced Java programming, object-oriented software design, structures, threads, and JDBC database connectivity.",
        link: "#"
    },
    {
        title: "MySQL Database Foundations",
        issuer: "Validation Hub",
        date: "2025",
        description: "Covers relational database modeling, normalization, subqueries, joins, indexing, and transactional SQL development.",
        link: "#"
    },
    {
        title: "Flutter Application Architecture Training",
        issuer: "HP LIFE & Partners",
        date: "2024",
        description: "Learned mobile application architectures, state management patterns, and responsive UI layouts for iOS & Android.",
        link: "#"
    },
    {
        title: "HP LIFE Cybersecurity Incident Management Awareness",
        issuer: "HP LIFE",
        date: "2024",
        description: "Trained on enterprise security threat mitigation, incident response cycles, firewalls, and network protection strategies.",
        link: "#"
    }
];

const achievementsData = [
    {
        icon: <Award size={20} />,
        title: "University Rank Holder",
        description: "Achieved 4th Rank in Solapur University during MCA 3rd Semester.",
        date: "2025"
    }
];

// --- Animation Variants ---
const sectionVariant = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hidden: { opacity: 0, y: 30 },
};

// --- Reusable Animated Section Component ---
const AnimatedSection = ({ children, className, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={sectionVariant}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.section>
  );
};

// --- Interactive LeetCode Graph ---
const LeetCodeGraph = () => {
    const days = Array.from({ length: 140 }); // 20 weeks * 7 days for a cleaner, compact grid
    return (
        <div className="leetcode-graph-container">
            <div className="leetcode-graph-header">
                <div className="leetcode-info">
                    <Code size={16} className="text-accent" />
                    <span>Daily Challenge Grid</span>
                </div>
                <span className="text-muted text-xs">Continuous Coding Tracker</span>
            </div>
            <div className="leetcode-graph">
                {days.map((_, i) => (
                    <div
                        key={i}
                        className="leetcode-day"
                        style={{
                            backgroundColor: `rgba(226, 160, 70, ${Math.random() > 0.4 ? Math.random() * 0.8 + 0.15 : 0.05})`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// --- UNIX Terminal Component ---
const Terminal = () => {
    const [history, setHistory] = useState([
        { text: "Harshal OS v2.0.4 - System Initialized.", type: "system" },
        { text: "Connection established from guest@client-machine.", type: "system" },
        { text: "Type 'help' to see list of available commands.", type: "system" }
    ]);
    const [input, setInput] = useState("");
    const terminalBodyRef = useRef(null);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let response = [];
            
            if (cmd === '') {
                response = [{ text: "harshal@core-system:~$", type: "input" }];
            } else if (cmd === 'help') {
                response = [
                    { text: `harshal@core-system:~$ ${input}`, type: "input" },
                    { text: "Available commands:", type: "output" },
                    { text: "  about       - Professional summary", type: "output" },
                    { text: "  experience  - Detail career milestones", type: "output" },
                    { text: "  projects    - List structural systems built", type: "output" },
                    { text: "  skills      - Taxonomies of tools and stacks", type: "output" },
                    { text: "  contact     - System parameters & connection info", type: "output" },
                    { text: "  neofetch    - Diagnostic hardware/software summary", type: "output" },
                    { text: "  clear       - Wipe buffer", type: "output" }
                ];
            } else if (cmd === 'clear') {
                setHistory([]);
                setInput("");
                return;
            } else if (cmd === 'about') {
                response = [
                    { text: `harshal@core-system:~$ ${input}`, type: "input" },
                    { text: "Data Engineer with 6+ months of ERP application support experience and a strong academic foundation (MCA, 9.06 CGPA). Highly proficient in modern SQL optimization, C# .NET stacks, and AWS workflows. Excels at auditing operational pipelines, identifying logical bottlenecks, and developing robust integrations.", type: "output" }
                ];
            } else if (cmd === 'experience') {
                response = [
                    { text: `harshal@core-system:~$ ${input}`, type: "input" },
                    { text: "[Vision Infra Equipment Solutions Ltd.] | Jan 2026 - Present", type: "output" },
                    { text: "Data Engineer - ERP Application Support (Pune, MH)", type: "output" },
                    { text: " - Maintained & supported enterprise .NET Core ERP systems", type: "output" },
                    { text: " - Resolved inventory, finance, and procurement logical issues", type: "output" },
                    { text: " - Wrote performance-optimized T-SQL scripts to isolate runtime exceptions", type: "output" },
                    { text: " - Managed SDLC cycles and bug reproduction with senior leads", type: "output" }
                ];
            } else if (cmd === 'projects') {
                response = [
                    { text: `harshal@core-system:~$ ${input}`, type: "input" },
                    { text: "SYSTEMS DEPLOYED:", type: "output" },
                    { text: " 1. Post Office Management System [C#, ASP.NET MVC, EF Core, SQL Server]", type: "output" },
                    { text: " 2. ERP Report Analyzer [Python, Supabase, Javascript, ETL Pipeline]", type: "output" },
                    { text: " 3. ERP Studio Knowledge Hub [HTML5, CSS3, JS, MySQL Document Manager]", type: "output" }
                ];
            } else if (cmd === 'skills') {
                response = [
                    { text: `harshal@core-system:~$ ${input}`, type: "input" },
                    { text: "CORE TECH TAXONOMY:", type: "output" },
                    { text: " - Microsoft: C#, .NET Core, ASP.NET MVC, EF Core, REST APIs, LINQ", type: "output" },
                    { text: " - Databases: SQL Server (SSMS), MySQL, Schema Design, Data Validation", type: "output" },
                    { text: " - Frontend: JavaScript, CSS3, HTML5, Responsive UI", type: "output" },
                    { text: " - Workflows: AWS (EC2, S3, RDS), Git, JIRA, SDLC, Software Testing", type: "output" }
                ];
            } else if (cmd === 'contact') {
                response = [
                    { text: `harshal@core-system:~$ ${input}`, type: "input" },
                    { text: "CONNECTION PORTS:", type: "output" },
                    { text: "  Email:  khadtareharshal2002@gmail.com", type: "output" },
                    { text: "  Phone:  +91 90757 68742", type: "output" },
                    { text: "  Loc:    Pune, Maharashtra, India", type: "output" },
                    { text: "  GitHub: github.com/Harshalkhadatare", type: "output" },
                    { text: "  L-In:   linkedin.com/in/harshal-khadatare-9882ab23a/", type: "output" }
                ];
            } else if (cmd === 'neofetch') {
                response = [
                    { text: `harshal@core-system:~$ ${input}`, type: "input" },
                    { text: "        _,,,_        harshal@core-system", type: "ascii" },
                    { text: "      .'     `.      -------------------", type: "ascii" },
                    { text: "     /   o   o \\     OS: MCA (9.06 CGPA) - Solapur University", type: "ascii" },
                    { text: "    |    __*__  |    Kernel: Windows / ReactJS Virtualization", type: "ascii" },
                    { text: "     \\  \\____/ /     Uptime: Jan 2026 - Present", type: "ascii" },
                    { text: "      `._____.'      Shell: Terminal v2.0", type: "ascii" },
                    { text: "      /       \\      Stack: C# / .NET Core / SQL Server", type: "ascii" },
                    { text: "     /    |    \\     Cloud: AWS Certified Foundations", type: "ascii" },
                    { text: "    (_|___|___|_)    Status: Open to professional alignments", type: "ascii" }
                ];
            } else {
                response = [
                    { text: `harshal@core-system:~$ ${input}`, type: "input" },
                    { text: `sh: command not found: '${cmd}'. Type 'help' for support.`, type: "error" }
                ];
            }
            setHistory([...history, ...response]);
            setInput("");
        }
    };

    return (
        <div className="terminal-container">
            <div className="terminal-header">
                <div className="terminal-buttons">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                </div>
                <div className="terminal-title">guest@core-system: ~</div>
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
                {history.map((line, idx) => (
                    <div key={idx} className={`terminal-line ${line.type}`}>
                        {line.text}
                    </div>
                ))}
                <div className="terminal-input-line">
                    <span className="prompt">harshal@core-system:~$ </span>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={handleCommand}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
};

// --- Main Portfolio Component ---
const Portfolio = () => {
    const [theme, setTheme] = useState("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.className = theme === "dark" ? "dark-theme" : "light-theme";
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            console.error("Web3Forms Access Key is MISSING.");
            Swal.fire({
                title: 'Config Error',
                text: 'The submit handler is not configured with an API key.',
                icon: 'error',
                background: theme === "dark" ? '#121216' : '#ffffff',
                color: theme === "dark" ? '#e3e3eb' : '#1c1c1f',
                confirmButtonColor: '#dca54c'
            });
            return;
        }

        const formData = new FormData(event.target);
        formData.append("access_key", accessKey);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: json
            }).then((res) => res.json());

            if (res.success) {
                Swal.fire({
                    title: 'System Dispatch Success',
                    text: 'Message received. Connection established.',
                    icon: 'success',
                    background: theme === "dark" ? '#121216' : '#ffffff',
                    color: theme === "dark" ? '#e3e3eb' : '#1c1c1f',
                    confirmButtonColor: '#dca54c'
                });
                event.target.reset();
            } else {
                throw new Error(res.message || "API error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            Swal.fire({
                title: 'Dispatch Failed',
                text: 'Failed to deliver transmission. Please verify local connection.',
                icon: 'error',
                background: theme === "dark" ? '#121216' : '#ffffff',
                color: theme === "dark" ? '#e3e3eb' : '#1c1c1f',
                confirmButtonColor: '#dca54c'
            });
        }
    };

    return (
        <div className={`app-wrapper ${theme}`}>
            {/* Header / Navigation */}
            <header className="header">
                <div className="logo-container">
                    <span className="logo-hk">HARSHAL KHADATARE</span>
                    <span className="logo-divider">/</span>
                    <span className="logo-title">SYS.DEV</span>
                </div>
                
                <div className="nav-controls">
                    <nav className="navbar">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
                        ))}
                    </nav>
                    
                    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    

                    <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </div>
                </div>
            </header>
            
            {isMenuOpen && (
                <motion.div 
                    className="mobile-nav-links"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>{link.label}</a>
                    ))}
                </motion.div>
            )}

            <main className="main-content">
                {/* Hero / About Section */}
                <section className="hero-section" id="about">
                    <div className="hero-grid">
                        <div className="hero-bio">
                            <span className="hero-label">{"// SYSTEM DATA ENGINEER"}</span>
                            <h1 className="hero-name">Harshal Khadatare</h1>
                            <p className="hero-statement">
                                Data Engineer specializing in ERP support, system automation, and relational architecture. 
                                Backed by a strong academic foundation (MCA, Solapur University) and practical expertise 
                                in the C# .NET stack, query performance tuning, and scalable AWS services. 
                            </p>
                            <div className="hero-meta-details">
                                <div className="meta-item">
                                    <MapPin size={14} className="meta-icon" />
                                    <span>Pune, Maharashtra, India</span>
                                </div>
                                <div className="meta-item">
                                    <Mail size={14} className="meta-icon" />
                                    <span>khadtareharshal2002@gmail.com</span>
                                </div>
                                <div className="meta-item">
                                    <Phone size={14} className="meta-icon" />
                                    <span>+91 90757 68742</span>
                                </div>
                            </div>
                            <div className="hero-social-row">
                                {socialLinks.map(link => (
                                   <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="hero-social-btn" title={link.name}>
                                       {link.icon}
                                       <span>{link.name}</span>
                                   </a>
                                ))}
                            </div>
                        </div>
                        <div className="hero-terminal-summary">
                            <div className="terminal-summary-card">
                                <div className="card-header">
                                    <span className="card-dot"></span>
                                    <span>core_diagnostics.log</span>
                                </div>
                                <div className="card-body">
                                    <p className="log-line"><span className="log-time">[11:06:40]</span> MCA CGPA: <span className="log-value">9.06 / 10.0</span></p>
                                    <p className="log-line"><span className="log-time">[11:06:41]</span> Enterprise Exp: <span className="log-value">ERP Production Support</span></p>
                                    <p className="log-line"><span className="log-time">[11:06:42]</span> Active Stack: <span className="log-value">C# / .NET Core / SQL Server</span></p>
                                    <p className="log-line"><span className="log-time">[11:06:43]</span> Relational Eng: <span className="log-value">Entity Framework Core / MySQL</span></p>
                                    <p className="log-line"><span className="log-time">[11:06:44]</span> AWS Operations: <span className="log-value">EC2, S3, RDS, IAM, CloudWatch</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <AnimatedSection className="section" id="experience">
                    <div className="section-header-block">
                        <span className="section-subtitle">{"// HISTORICAL LOG"}</span>
                        <h2 className="section-title">Professional Experience</h2>
                    </div>
                    <div className="experience-timeline">
                        {experienceData.map((item, index) => (
                            <div className="experience-block" key={index}>
                                <div className="exp-meta">
                                    <span className="exp-date">{item.date}</span>
                                    <span className="exp-location">{item.location}</span>
                                </div>
                                <div className="exp-details">
                                    <h3 className="exp-role">{item.role}</h3>
                                    <div className="exp-company-group">
                                        <span className="exp-company">{item.company}</span>
                                    </div>
                                    <ul className="exp-points">
                                        {item.points.map((pt, pIdx) => (
                                            <li key={pIdx}>{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Projects Section */}
                <AnimatedSection className="section" id="work">
                    <div className="section-header-block">
                        <span className="section-subtitle">{"// SYSTEMS ARCHITECTURE"}</span>
                        <h2 className="section-title">Selected Projects</h2>
                    </div>
                    <div className="projects-editorial-grid">
                        {projectsData.map((project, index) => (
                            <div className="project-editorial-card" key={index}>
                                <div className="project-card-header">
                                    <h3 className="project-card-title">{project.title}</h3>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-anchor" aria-label="Go to source">
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                                <p className="project-card-desc">{project.description}</p>
                                <div className="project-card-footer">
                                    <div className="project-card-tags">
                                        {project.tech.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
                
                {/* Skills Section */}
                <AnimatedSection className="section" id="skills">
                    <div className="section-header-block">
                        <span className="section-subtitle">{"// CORE STACK & TAXONOMY"}</span>
                        <h2 className="section-title">Technical Expertise</h2>
                    </div>
                    <div className="skills-editorial-layout">
                        {Object.entries(skillsData).map(([category, skills]) => (
                            <div className="skills-category-card" key={category}>
                                <div className="skills-card-title-group">
                                    {category === "Core Microsoft Stack" ? <Cpu size={16} /> :
                                     category === "Databases & Querying" ? <Database size={16} /> :
                                     <Layers size={16} />}
                                    <h4>{category}</h4>
                                </div>
                                <div className="skills-tag-list">
                                    {skills.map(skill => (
                                        <span className="skill-item-tag" key={skill}>
                                            <CheckCircle size={10} className="tag-check" />
                                            <span>{skill}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Terminal Section */}
                <AnimatedSection className="section" id="terminal">
                    <div className="section-header-block">
                        <span className="section-subtitle">{"// SHELL CONSOLE INTERACTION"}</span>
                        <h2 className="section-title">Interactive Terminal</h2>
                    </div>
                    <Terminal />
                </AnimatedSection>
                
                {/* Certifications Section */}
                <AnimatedSection className="section" id="certifications">
                    <div className="section-header-block">
                        <span className="section-subtitle">{"// CREDENTIAL VERIFICATION"}</span>
                        <h2 className="section-title">Licenses & Certifications</h2>
                    </div>
                    <div className="certs-editorial-list">
                        {certificationsData.map((item, index) => (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="cert-row-item" key={index}>
                                <div className="cert-row-title-block">
                                    <h4 className="cert-row-title">{item.title}</h4>
                                    <span className="cert-row-meta">{item.issuer} &bull; {item.date}</span>
                                    <p className="cert-row-desc">{item.description}</p>
                                </div>
                                <div className="cert-row-arrow">
                                    <ArrowRight size={14} />
                                </div>
                            </a>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Achievements & Activity Graph */}
                <section className="dashboard-grid-section">
                    <div className="dashboard-column">
                        <div className="section-header-block">
                            <span className="section-subtitle">{"// RANKINGS & RECOGNITIONS"}</span>
                            <h2 className="section-title">Achievements</h2>
                        </div>
                        <div className="achievements-editorial-container">
                            {achievementsData.map((item, index) => (
                                 <div className="achievement-editorial-card" key={index}>
                                     <div className="ach-icon-box">{item.icon}</div>
                                     <div className="ach-content-box">
                                         <h4 className="ach-title">{item.title}</h4>
                                         <p className="ach-desc">{item.description}</p>
                                     </div>
                                     <span className="ach-date">{item.date}</span>
                                 </div>
                            ))}
                        </div>
                    </div>
                    <div className="dashboard-column">
                        <div className="section-header-block">
                            <span className="section-subtitle">{"// PERSISTENT COMMITS"}</span>
                            <h2 className="section-title">Activity Graph</h2>
                        </div>
                        <LeetCodeGraph />
                    </div>
                </section>

                {/* Contact Section */}
                <AnimatedSection className="section" id="contact">
                    <div className="section-header-block">
                        <span className="section-subtitle">{"// DISPATCH TELEMETRY"}</span>
                        <h2 className="section-title">Get In Touch</h2>
                    </div>
                    <div className="contact-editorial-layout">
                        <div className="contact-info-block">
                            <p className="contact-lead-text">
                                System communication lines are open. Submit an inquiry through the form, or reach out directly to the endpoint details provided.
                            </p>
                            <div className="contact-details-box">
                                <p><strong>Email:</strong> khadtareharshal2002@gmail.com</p>
                                <p><strong>Phone:</strong> +91 90757 68742</p>
                                <p><strong>Location:</strong> Pune, Maharashtra, India</p>
                            </div>
                        </div>
                        <div className="contact-form-block">
                            <form className="editorial-contact-form" onSubmit={handleFormSubmit}>
                                <div className="form-row-group">
                                    <div className="form-field">
                                        <label htmlFor="form-name">Name</label>
                                        <input type="text" id="form-name" name="name" placeholder="Guest Name" required />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="form-email">Email Address</label>
                                        <input type="email" id="form-email" name="email" placeholder="guest@domain.com" required />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="form-message">Message Transmission</label>
                                    <textarea id="form-message" name="message" rows="5" placeholder="Specify communication requirements..." required></textarea>
                                </div>
                                <button type="submit" className="editorial-submit-btn">
                                    <span>Dispatch Transmission</span>
                                    <ArrowRight size={14} />
                                </button>
                            </form>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
            
            {/* Footer */}
            <footer className="footer-editorial">
                <div className="footer-top-row">
                    <div className="footer-brand">
                        <span className="footer-logo">HK</span>
                        <span className="footer-brand-title">SYSTEMS DEVELOPMENT</span>
                    </div>
                    <div className="footer-nav-links">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href}>{link.label}</a>
                        ))}
                    </div>
                </div>
                <div className="footer-divider-line"></div>
                <div className="footer-bottom-row">
                    <p className="footer-copy">
                        &copy; {new Date().getFullYear()} Harshal Khadatare. All rights reserved. Relational integrity guaranteed.
                    </p>
                    <p className="footer-engine">
                        Built with React & Vanilla CSS. Designed for clarity, structure, and low latency.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
