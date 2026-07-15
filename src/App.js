import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GitHub, Linkedin, Code, ArrowRight, Award, Mail, MapPin, Menu, X } from 'react-feather';
import Swal from 'sweetalert2';

import "./App.css";

// --- DATA FROM YOUR RESUME ---
const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#work", label: "Work" },
    { href: "#skills", label: "Skills" },
    { href: "#certifications", label: "Certs" },
    { href: "#contact", label: "Contact" },
];

const socialLinks = [
    { href: "https://github.com/Harshalkhadatare", icon: <GitHub size={20} />, name: "GitHub" },
    { href: "https://www.linkedin.com/in/harshal-khadatare-9882ab23a/", icon: <Linkedin size={20} />, name: "LinkedIn" },
    { href: "https://leetcode.com/u/Harshhh_45/", icon: <Code size={20} />, name: "LeetCode" },
];

const projectsData = [
    { 
        title: "Farmer-Customer Marketplace", 
        description: "Built a Flask-based webapp to connect farmers directly with customers, increasing profit margins by eliminating middlemen. Integrated CRUD operations with MySQL.",
        tech: ["Python", "Flask", "MySQL"],
        link: "https://github.com/Harshroo45/Customer-and-Farmer-Marketplace-using-Flask-Python" 
    },
    { 
        title: "City Space Parking", 
        description: "Engineered a real-time parking availability system utilizing Spring Boot and MySQL, processing 500+ parking transactions daily with 99.9% accuracy.",
        tech: ["Java", "Spring Boot", "MySQL", "JDBC"],
        link: "https://github.com/Harshroo45" 
    },
    { 
        title: "Post Office Management System", 
        description: "Designed a postal management simulator with user login, parcel tracking, and transaction logs. Collaborated on system architecture and integrated SQL Server for data storage.",
        tech: ["C# .NET", "SQL Server", "Visual Studio"],
        link: "https://github.com/Harshroo45/Post-Office-Management-System"
    },
];

const experienceData = [
    {
        date: "Jan – May 2025",
        role: "Java Full Stack Intern",
        company: "Symbiosis University (Capgemini Partnered)",
        description: "Developed and debugged REST APIs using Spring Boot and Hibernate for academic project management. Worked with Agile teams using JIRA for sprint planning and version control with GitHub.",
    },
];

const skillsData = {
    "Programming Languages": ["Java", "Python", "C#", "SQL"],
    "Web Development": ["HTML", "CSS", "jQuery", "ASP.NET (Basics)"],
    "Frameworks & Tools": ["Hibernate", "React", "VS Code", "Git", "GitHub", "JIRA"],
    "Databases": ["MySQL", "NoSQL", "SQL server", "MongoDB"],
    "Cloud Platforms (AWS)": ["EC2", "S3", "RDS", "IAM", "DynamoDB", "Lambda", "CloudWatch"],
    "Networking & Other": ["OSI Model", "Firewall", "Protocols", "Agile", "SDLC"]
};

const certificationsData = [
    {
        title: "AWS Educate: Introduction to Cloud 101",
        issuer: "Amazon Web Services (AWS)",
        date: "April 2025",
        description: "Learned cloud computing basics and explored key AWS services like IAM, S3, Lambda, DynamoDB, RDS, EC2, VPC, SNS, and CloudWatch through hands-on practice.",
        link: "https://www.credly.com/badges/a6038aa2-6d2b-445c-810b-e9bfc9b240ca/linked_in_profile"
    },
    {
        title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
        issuer: "LinkedIn Learning",
        date: "Aug 2024",
        description: "Gained skills in prompt engineering and applying AI for productivity and creativity. Developed an understanding of responsible AI use in real-world applications.",
        link: "https://www.linkedin.com/learning/paths/career-essentials-in-data-analysis-by-microsoft-and-linkedin?trk=share_android_learning_path_learning&shareId=mBIeGNNbSZKCQiKk1FJ41w%3D%3D"
    },
    {
        title: "Introduction to Cybersecurity Awareness",
        issuer: "HP LIFE",
        date: "Feb 2025",
        description: "Understood the importance of firewalls in network protection and the structure of LAN, MAN, and WAN.",
        link: "#" // Add your verification link here
    }
];

const achievementsData = [
    {
        icon: <Award />,
        title: "University Rank Holder",
        description: "Achieved 4th rank in Solapur University for the MCA 3rd Semester.",
        date: "April 2025"
    }
];


// --- Animation Variants ---
const sectionVariant = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hidden: { opacity: 0, y: 50 },
};

// --- Reusable Animated Section Component ---
const AnimatedSection = ({ children, className, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
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
    const days = Array.from({ length: 364 }); // 52 weeks * 7 days
    const variants = {
        hidden: { opacity: 0 },
        visible: (i) => ({
            opacity: 1,
            transition: {
                delay: i * 0.005,
            },
        }),
    };
    return (
        <div className="leetcode-graph-container">
             <div className="leetcode-graph">
                {days.map((_, i) => (
                    <motion.div
                        key={i}
                        className="leetcode-day"
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={variants}
                        style={{
                            backgroundColor: `rgba(0, 245, 122, ${Math.random() * 0.7 + 0.15})`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};


const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            console.error("Web3Forms Access Key is MISSING.");
            Swal.fire({
                title: 'Configuration Error',
                text: 'The form is not set up correctly. Please contact the site owner.',
                icon: 'error',
                background: '#1a1a1a',
                color: '#f0f0f0',
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
                    title: 'Message Sent!',
                    text: 'Thank you for reaching out. I will get back to you shortly.',
                    icon: 'success',
                    background: '#1a1a1a',
                    color: '#f0f0f0',
                    confirmButtonColor: '#00f57a'
                });
                event.target.reset();
            } else {
                throw new Error(res.message || "API returned an error");
            }
        } catch (error) {
            console.error("Form Submission Error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                background: '#1a1a1a',
                color: '#f0f0f0',
                confirmButtonColor: '#ff4d4d'
            });
        }
    };


    return (
        <div className="main-container">
            <header className="header">
                <div className="logo">
                    HK<span className="accent-dot">.</span>
                </div>
                <nav className="navbar">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
                    ))}
                </nav>
                <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </div>
            </header>
            
            {isMenuOpen && (
                <motion.div 
                    className="mobile-nav-links"
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>{link.label}</a>
                    ))}
                </motion.div>
            )}

            <main>
                <section className="hero" id="about">
                    <div className="video-background">
                        <div className="video-overlay"></div>
                        <video autoPlay loop muted playsInline key="/videos/background.mp4">
                            <source src="/videos/background.mp4" type="video/mp4" />
                        </video>
                    </div>

                    <div className="hero-content">
                        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            Harshal Khadatare
                        </motion.h1>
                        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                            A dedicated software engineer who translates complex problems into elegant, scalable solutions using Java, Python, and AWS. Driven by a passion for clean code and continuous growth in a fast-paced tech environment.                        </motion.p>
                        <motion.div className="hero-socials" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                            {socialLinks.map(link => (
                               <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>{link.icon}</a>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <AnimatedSection className="section" id="experience">
                    <h2 className="section-title">Experience</h2>
                    <div className="timeline">
                        {experienceData.map((item, index) => (
                            <div className="timeline-item" key={index}>
                                <div className="timeline-date">{item.date}</div>
                                <div className="timeline-content">
                                    <h3 className="timeline-role">{item.role}</h3>
                                    <p className="timeline-company">{item.company}</p>
                                    <p className="timeline-description">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection className="section" id="work">
                    <h2 className="section-title">Selected Projects</h2>
                    <div className="projects-grid">
                        {projectsData.map((project, index) => (
                            <motion.div className="project-card" key={index} whileHover={{ y: -8, transition: { duration: 0.3 }}}>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-wrapper">
                                    <div className="project-header">
                                        <h3 className="project-title">{project.title}</h3>
                                        <ArrowRight className="project-arrow" />
                                    </div>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-tags">
                                        {project.tech.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>
                
                <AnimatedSection className="section" id="skills">
                    <h2 className="section-title">My Toolkit</h2>
                    <div className="skills-grid">
                        {Object.entries(skillsData).map(([category, skills]) => (
                            <div className="skill-category" key={category}>
                                <h3>{category}</h3>
                                <p>{skills.join(' · ')}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
                
                <AnimatedSection className="section" id="certifications">
                    <h2 className="section-title">Certifications</h2>
                     <div className="certifications-grid">
                        {certificationsData.map((item, index) => (
                            <motion.a href={item.link} target="_blank" rel="noopener noreferrer" className="certification-card-link" key={index} whileHover={{ y: -5, transition: { duration: 0.3 }}}>
                                 <div className="certification-card-content">
                                    <h3 className="certification-title">{item.title}</h3>
                                    <p className="certification-issuer">{item.issuer} - {item.date}</p>
                                    <p className="certification-description">{item.description}</p>
                                 </div>
                                 <ArrowRight className="certification-arrow" />
                            </motion.a>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection className="section" id="achievements">
                    <h2 className="section-title">Achievements</h2>
                     <div className="achievements-grid">
                        {achievementsData.map((item, index) => (
                             <div className="achievement-card" key={index}>
                                 <div className="achievement-icon">{item.icon}</div>
                                 <div className="achievement-content">
                                     <h3 className="achievement-title">{item.title}</h3>
                                     <p className="achievement-description">{item.description}</p>
                                 </div>
                                 <div className="achievement-date">{item.date}</div>
                             </div>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection className="section" id="daily-challenge">
                    <h2 className="section-title">Daily Challenge</h2>
                    <p className="contact-intro">I am dedicated to continuous improvement and problem-solving, tackling LeetCode challenges daily.</p>
                    <LeetCodeGraph />
                </AnimatedSection>

                <AnimatedSection className="section" id="contact">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="contact-intro">
                        Have a project in mind or just want to say hello? My inbox is always open.
                    </p>
                    <form className="contact-form" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <input type="text" name="name" placeholder="Your Name" required />
                            <input type="email" name="email" placeholder="Your Email" required />
                        </div>
                        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                        <motion.button type="submit" className="submit-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Send Message
                        </motion.button>
                    </form>
                </AnimatedSection>
            </main>
            
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-contact">
                        <h4>Contact Details</h4>
                        <p><Mail size={14}/> khadtareharshal2002@gmail.com</p>
                        <p><MapPin size={14}/>  Solapur, Maharashtra, India</p>
                    </div>
                    <div className="footer-copyright">
                        <p>Designed & Developed by Harshal Khadatare &copy; {new Date().getFullYear()}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
