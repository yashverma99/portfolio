import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  GraduationCap,
  Hammer,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  TabletSmartphone,
  Trophy,
  Wrench,
  Cpu,
  BrainCircuit,
  Link as LinkIcon,
} from 'lucide-react';

const profileLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/yashverma99',
    icon: Github,
    accent: 'from-slate-900 to-slate-700',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/Yashcoder7777/',
    icon: Code2,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    label: 'CodeChef',
    href: 'https://www.codechef.com/users/lush_swan_92',
    icon: Trophy,
    accent: 'from-emerald-500 to-teal-500',
  },
];

const stats = [
  { value: '220+', label: 'DSA problems solved', icon: BrainCircuit },
  { value: '3★', label: 'CodeChef rating', icon: Star },
  { value: '2', label: 'Active roles', icon: BriefcaseBusiness },
  { value: 'B.Tech CSE', label: 'Current student', icon: GraduationCap },
];

const skillGroups = [
  {
    title: 'Programming',
    icon: Code2,
    items: ['C', 'C++', 'Python', 'JavaScript', 'SQL (MySQL)'],
  },
  {
    title: 'Web',
    icon: Rocket,
    items: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'RESTful APIs', 'JSON', 'JWT'],
  },
  {
    title: 'Mobile',
    icon: TabletSmartphone,
    items: ['Flutter SDK', 'FlutterFlow'],
  },
  {
    title: 'Data & Tools',
    icon: Wrench,
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Agile / Scrum', 'System Design Basics'],
  },
  {
    title: 'Analytics',
    icon: Database,
    items: ['NumPy', 'Pandas', 'Seaborn', 'Matplotlib', 'Machine Learning (Basics)'],
  },
  {
    title: 'Security',
    icon: ShieldCheck,
    items: ['JWT auth', 'Role-based access', 'REST API design'],
  },
];

const experiences = [
  {
    title: 'Freelance Full-Stack Developer',
    org: 'Remote',
    period: 'Jun 2025 - Present',
    bullets: [
      'Architected and developed high-performance web applications using React.js, improving UI responsiveness and user experience.',
      'Built scalable RESTful APIs with Node.js and Express.js.',
      'Implemented JWT-based authentication and role-based authorization.',
      'Designed and optimized MySQL database schemas and queries to enhance performance and reduce response time.',
      'Collaborated with clients to understand requirements and deliver end-to-end software solutions.',
    ],
  },
  {
    title: 'App Development Team Member',
    org: 'Agile Engineering Startup, India',
    period: 'Jan 2025 - Present',
    bullets: [
      'Developed cross-platform mobile application features using Flutter and FlutterFlow.',
      'Worked in an Agile Scrum environment with stand-ups, sprint planning, and code reviews.',
      'Maintained clean code and followed best practices for version control using Git.',
      'Contributed to prototypes for Smart India Hackathon (SIH) national qualifiers.',
    ],
  },
];

const projects = [
  {
    title: 'AI-Powered Attendance Management System',
    stack: 'Python, FastAPI, OpenCV',
    bullets: [
      'Built a real-time facial recognition attendance system using webcam input.',
      'Implemented face detection and recognition pipelines using OpenCV.',
      'Created REST APIs with FastAPI for attendance management and record storage.',
      'Automated attendance marking to improve accuracy and reduce manual work.',
      'Designed a scalable backend architecture for retrieval and reporting.',
    ],
  },
];

const education = [
  {
    title: 'Bachelor of Technology (B.Tech.) in Computer Science & Engineering',
    org: 'Next Wave Institute of Advanced Technology, Lucknow',
    period: 'Current',
  },
  {
    title: 'Class 12th (CBSE)',
    org: 'Maharishi Dayanand Public School, Lucknow',
    period: '2024 - 2025',
  },
  {
    title: 'Class 10th (CBSE)',
    org: 'Maharishi Dayanand Public School, Lucknow',
    period: '2022 - 2023',
  },
];

const achievementPills = [
  'Solved 220+ DSA problems',
  '3★ CodeChef',
  'SIH participant',
  'IIT Kharagpur aptitude certification',
  'Strong analytical problem solver',
];

const spotlightModes = {
  builder: {
    eyebrow: 'Full-stack builder',
    title: 'Shipping fast without sacrificing structure.',
    text: 'I build frontend and backend features together, keeping the experience smooth while the API and database layers stay maintainable.',
    icon: Rocket,
  },
  mobile: {
    eyebrow: 'Mobile mindset',
    title: 'Cross-platform delivery with Flutter.',
    text: 'I can move a product from web interface to mobile companion app, keeping interaction patterns clear and consistent.',
    icon: TabletSmartphone,
  },
  dsa: {
    eyebrow: 'Problem solving',
    title: 'Competitive programming habits applied to product work.',
    text: 'The DSA practice and CodeChef progress show up in debugging speed, clean logic, and performance-aware implementation.',
    icon: BrainCircuit,
  },
};

const spotlightOrder = Object.keys(spotlightModes);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function SectionHeading({ eyebrow, title, description, icon: Icon }) {
  return (
    <div className="section-heading">
      <div className="eyebrow-row">
        <span className="eyebrow-icon">
          <Icon size={14} />
        </span>
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function ScrollRevealSection({ className = '', children, ...props }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.18'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.2, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{ opacity, y, scale, rotateX, transformStyle: 'preserve-3d' }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

function App() {
  const [spotlight, setSpotlight] = useState('builder');
  const spotlightData = useMemo(() => spotlightModes[spotlight], [spotlight]);
  const SpotlightIcon = spotlightData.icon;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSpotlight((current) => {
        const currentIndex = spotlightOrder.indexOf(current);
        return spotlightOrder[(currentIndex + 1) % spotlightOrder.length];
      });
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updatePointer = (event) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;

      document.documentElement.style.setProperty('--pointer-x', x.toFixed(4));
      document.documentElement.style.setProperty('--pointer-y', y.toFixed(4));
      document.documentElement.style.setProperty('--tilt-x', `${((0.5 - y) * 8).toFixed(2)}deg`);
      document.documentElement.style.setProperty('--tilt-y', `${((x - 0.5) * 10).toFixed(2)}deg`);
    };

    const resetPointer = () => {
      document.documentElement.style.setProperty('--pointer-x', '0.5');
      document.documentElement.style.setProperty('--pointer-y', '0.35');
      document.documentElement.style.setProperty('--tilt-x', '0deg');
      document.documentElement.style.setProperty('--tilt-y', '0deg');
    };

    resetPointer();
    window.addEventListener('pointermove', updatePointer);
    window.addEventListener('pointerleave', resetPointer);

    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', resetPointer);
    };
  }, []);

  return (
    <div className="page-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />

      <header className="topbar">
        <div>
          <span className="brand">Yash Verma</span>
          <span className="brand-sub">Friendly full-stack portfolio</span>
        </div>
        <nav>
          <a href="#about">About me</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Work</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="container">
        <section className="hero-grid">
          <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div className="hero-badge" variants={fadeUp}>
              <Sparkles size={16} />
              Open to friendly freelance and internship opportunities
            </motion.div>

            <motion.h1 variants={fadeUp}>
              Clean, friendly, and product-focused work from <span>Yash Verma</span>.
            </motion.h1>

            <motion.p className="hero-text" variants={fadeUp}>
              I’m a B.Tech CSE student and full-stack developer who likes building clear, useful products with React, Node.js, Flutter, and MySQL. My focus is simple interfaces, reliable systems, and code that is easy to maintain.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="primary-btn" href="mailto:Yashverma70070@gmail.com">
                <Mail size={16} />
                Contact me
              </a>
              <a className="secondary-btn" href="#projects">
                See my work
                <ArrowUpRight size={16} />
              </a>
            </motion.div>

            <motion.div className="contact-row" variants={fadeUp}>
              <span><Phone size={14} /> +91 7007037329</span>
              <span><Mail size={14} /> Yashverma70070@gmail.com</span>
              <span><MapPin size={14} /> Lucknow, India</span>
            </motion.div>

            <motion.div className="quick-links" variants={fadeUp}>
              {profileLinks.slice(0, 3).map((link) => {
                const Icon = link.icon;
                return (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.label} className="quick-link-chip">
                    <Icon size={15} />
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: -8, rotateY: 14, scale: 1.01 }}
          >
            <div className="hero-visual-frame" aria-hidden="true">
              <div className="frame-strip frame-strip-top" />
              <div className="frame-strip frame-strip-right" />
              <div className="frame-strip frame-strip-bottom" />
              <div className="frame-strip frame-strip-left" />
            </div>

            <div className="floating-card-stack" aria-hidden="true">
              <motion.div className="floating-card floating-card-back" animate={{ y: [0, -10, 0], rotateZ: -4 }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
                <span>Build</span>
                <strong>Responsive interfaces</strong>
              </motion.div>
              <motion.div className="floating-card floating-card-middle" animate={{ y: [0, 8, 0], rotateZ: 2 }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
                <span>Ship</span>
                <strong>Fast APIs and mobile flows</strong>
              </motion.div>
              <motion.div className="floating-card floating-card-front" animate={{ y: [0, -6, 0], rotateZ: 5 }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <span>Think</span>
                <strong>Algorithms and product polish</strong>
              </motion.div>
            </div>

            <div className="floating-tag floating-tag-top">
              <span /> React systems
            </div>
            <div className="floating-tag floating-tag-mid">
              <span /> Node + Flutter
            </div>
            <div className="floating-tag floating-tag-bottom">
              <span /> DSA mindset
            </div>

            <div className="live-panel">
              <div className="cube-stage" aria-hidden="true">
                <div className="cube-orbit" />
                <div className="cube">
                  <div className="cube-face cube-front">React</div>
                  <div className="cube-face cube-back">Flutter</div>
                  <div className="cube-face cube-right">Node</div>
                  <div className="cube-face cube-left">MySQL</div>
                  <div className="cube-face cube-top">DSA</div>
                  <div className="cube-face cube-bottom">UI</div>
                </div>
                <div className="cube-caption">
                    <strong>Stack snapshot</strong>
                    <span>A simple look at the tools I use most</span>
                </div>
              </div>

              <div className="live-panel-top">
                  <span className="resume-live">Quick snapshot</span>
                  <span className="live-dot">Gently rotating</span>
              </div>

              <div className="live-stack">
                <div className="live-card main">
                    <span className="live-card-label">What I enjoy building</span>
                  <strong>{spotlightData.eyebrow}</strong>
                  <p>{spotlightData.title}</p>
                </div>

                <div className="live-card metrics">
                  <span className="live-card-label">Core stack</span>
                  <div className="live-tags">
                    <span>React</span>
                    <span>Node</span>
                    <span>Flutter</span>
                    <span>MySQL</span>
                  </div>
                </div>

                <div className="live-card activity">
                  <span className="live-card-label">How this page helps you</span>
                  <ul>
                    <li>Shows the main skills in a quick, friendly way</li>
                    <li>Uses motion lightly so the page stays easy to follow</li>
                    <li>Keeps the layout clean on desktop and mobile</li>
                  </ul>
                </div>
              </div>

              <div className="live-footer">
                <div>
                  <strong>Easy to scan</strong>
                  <span>Clear content, softer motion, and no resume image.</span>
                </div>
                <div className="pulse-ring" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </section>

        <ScrollRevealSection className="stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.article className="stat-card" key={stat.label} variants={fadeUp} whileHover={{ y: -8, rotateX: 8, rotateY: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
                <div className="stat-card-sheen" aria-hidden="true" />
                <Icon size={18} />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.article>
            );
          })}
        </ScrollRevealSection>

        <ScrollRevealSection className="spotlight-section" id="about">
          <SectionHeading
            eyebrow="Professional summary"
            title="A profile that keeps things clear and useful."
            description="This portfolio uses the resume details to give a quick, human-friendly overview without extra noise."
            icon={BookOpen}
          />

          <div className="spotlight-shell">
            <div className="spotlight-tabs" role="tablist" aria-label="Spotlight themes">
              {Object.entries(spotlightModes).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  className={key === spotlight ? 'active' : ''}
                  onClick={() => setSpotlight(key)}
                >
                  {value.eyebrow}
                </button>
              ))}
            </div>

            <motion.div key={spotlight} className="spotlight-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <SpotlightIcon size={20} />
              <span className="spotlight-kicker">{spotlightData.eyebrow}</span>
              <h3>{spotlightData.title}</h3>
              <p>{spotlightData.text}</p>
            </motion.div>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection id="skills">
          <SectionHeading
            eyebrow="Technical skills"
            title="Skills grouped so they’re easy to read."
            description="Grouped by what you actually use so the page stays quick to scan on any screen."
            icon={Hammer}
          />

          <div className="skills-grid">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <motion.article className="skill-card" key={group.title} whileHover={{ y: -6, rotateX: 5, rotateY: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
                  <div className="card-slab" aria-hidden="true" />
                  <div className="skill-card-header">
                    <Icon size={18} />
                    <h3>{group.title}</h3>
                  </div>
                  <div className="skill-tags">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection id="experience">
          <SectionHeading
            eyebrow="Experience"
            title="Recent work, written in plain language."
            description="A simple summary of current work across web and mobile projects."
            icon={BriefcaseBusiness}
          />

          <div className="timeline">
            {experiences.map((experience) => (
              <motion.article className="timeline-card" key={experience.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }} whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}>
                <div className="card-slab" aria-hidden="true" />
                <div className="timeline-head">
                  <div>
                    <h3>{experience.title}</h3>
                    <p>{experience.org}</p>
                  </div>
                  <span>{experience.period}</span>
                </div>
                <ul>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection id="projects">
          <SectionHeading
            eyebrow="Projects"
            title="One project shown clearly."
            description="The attendance system is presented as a product story that is easy to follow."
            icon={Cpu}
          />

          <div className="project-grid">
            {projects.map((project) => (
              <motion.article className="project-card" key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }} whileHover={{ y: -6, rotateX: 5, rotateY: -5 }}>
                <div className="card-slab" aria-hidden="true" />
                <div className="project-head">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.stack}</p>
                  </div>
                  <div className="project-chip">
                    <Database size={14} />
                    Production-minded backend
                  </div>
                </div>
                <ul>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection className="two-column">
          <div id="education">
            <SectionHeading
              eyebrow="Education"
              title="Education, kept simple and visible."
              description="A short timeline that surfaces the important milestones without crowding the page."
              icon={GraduationCap}
            />

            <div className="education-list">
              {education.map((item) => (
                <motion.article className="education-card" key={item.title} whileHover={{ x: 4 }}>
                  <div className="card-slab" aria-hidden="true" />
                  <div className="education-dot" />
                  <div>
                    <div className="education-row">
                      <h3>{item.title}</h3>
                      <span>{item.period}</span>
                    </div>
                    <p>{item.org}</p>
                    {item.detail ? <small>{item.detail}</small> : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div id="achievements">
            <SectionHeading
              eyebrow="Achievements"
              title="A few signals that show consistency."
              description="Small chips keep the achievements easy to scan."
              icon={Award}
            />

            <div className="achievement-panel">
              {achievementPills.map((pill) => (
                <div className="achievement-pill" key={pill}>
                  <span className="achievement-glow" />
                  <span />
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection id="contact" className="contact-section">
          <div className="contact-copy">
            <SectionHeading
              eyebrow="Contact"
              title="Easy ways to reach out."
              description="These details are kept front and center so getting in touch feels simple."
              icon={Mail}
            />
          </div>
          <div className="contact-card">
            <a href="mailto:Yashverma70070@gmail.com">
              <Mail size={16} />
              Yashverma70070@gmail.com
            </a>
            <a href="tel:+917007037329">
              <Phone size={16} />
              +91 7007037329
            </a>
            <a href="https://github.com/yashverma99" target="_blank" rel="noreferrer">
              <Github size={16} />
              github.com/yashverma99
            </a>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection className="profiles-section">
          <SectionHeading
            eyebrow="Profile links"
            title="Useful profile links."
            description="Quick access to the places where you can check my work and progress."
            icon={LinkIcon}
          />

          <div className="profile-grid">
            {profileLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a className={`profile-card ${link.accent}`} href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                  <span className="profile-card-sheen" aria-hidden="true" />
                  <div>
                    <Icon size={20} />
                    <strong>{link.label}</strong>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              );
            })}
          </div>
        </ScrollRevealSection>
      </main>

      <footer className="footer">
        <p>Built from the resume details for Yash Verma.</p>
        <p>React, Framer Motion, and a clean editorial layout.</p>
      </footer>
    </div>
  );
}

export default App;
