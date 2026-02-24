import { BlueprintGrid } from "./components/BlueprintGrid";
import { TypingText } from "./components/TypingText";
import { ScanningLine } from "./components/ScanningLine";
import { TechnicalPanel } from "./components/TechnicalPanel";
import { SkillDiagram } from "./components/SkillDiagram";
import { ProjectModule } from "./components/ProjectModule";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ResumeSection } from "./components/ResumeSection";
import { Certifications } from "./components/Certifications";
import { Navbar } from "./components/Navbar";
import { Mail, Github, Linkedin, ChevronDown, Code } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white overflow-x-hidden">
      {/* Blueprint grid background */}
      <BlueprintGrid />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100svh-80px)] md:min-h-screen flex items-center justify-center px-6 pt-32 pb-24 md:py-0">
        <ScanningLine />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-4"
          >
            <h1 className="text-6xl md:text-8xl font-mono tracking-tight text-cyan-400 mb-2">
              SINAL BREICHE
            </h1>
          </motion.div>

          <h2 className="text-3xl md:text-5xl mb-6 font-mono tracking-tight text-white">
            <TypingText text="FULL STACK WEB DEVELOPER" speed={70} />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="text-lg md:text-xl text-slate-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Building clean, scalable web apps with a focus on reliability and
            performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3 }}
            className="flex flex-col gap-4 justify-center items-center sm:flex-row sm:flex-wrap"
          >
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, "#projects")}
              className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-mono text-sm tracking-wider hover:bg-cyan-400 hover:text-slate-900 transition-all"
            >
              VIEW PROJECTS
            </a>
            <a
              href="#resume"
              onClick={(e) => handleSmoothScroll(e, "#resume")}
              className="px-6 py-3 border border-cyan-500/30 text-white font-mono text-sm tracking-wider hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              DOWNLOAD RESUME
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="px-6 py-3 border border-cyan-500/30 text-white font-mono text-sm tracking-wider hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              CONTACT
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-24 left-8 w-20 h-20 border-t-2 border-l-2 border-cyan-400/30 pointer-events-none" />
        <div className="absolute top-24 right-8 w-20 h-20 border-t-2 border-r-2 border-cyan-400/30 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-cyan-400/30 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-cyan-400/30 pointer-events-none" />
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-cyan-400 text-sm tracking-widest">
                01
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono tracking-tight text-white">
              ABOUT
            </h2>
          </motion.div>

          <TechnicalPanel className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-mono text-cyan-400 mb-4 tracking-wide">
                  PROFILE
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 font-light">
                  Full Stack Web Developer with 2+ years of experience building
                  modern web applications. Focused on creating reliable,
                  user-friendly products. Also experienced in game development.
                </p>
                <p className="text-slate-300 leading-relaxed font-light">
                  Background in Computer Science with a focus on Computer
                  Graphics and Animation. This helps me build clear and engaging
                  web experiences.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-mono text-cyan-400 mb-4 tracking-wide">
                  DETAILS
                </h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-slate-400">NAME:</span>
                    <span className="text-white">Sinal Breiche</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-slate-400">ROLE:</span>
                    <span className="text-white">Full Stack Web Developer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-slate-400">LOCATION:</span>
                    <span className="text-white">Beirut, Lebanon</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-slate-400">EDUCATION:</span>
                    <span className="text-white">CS - CG & Animation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-slate-400">EXPERIENCE:</span>
                    <span className="text-white">2+ Years</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-slate-400">STATUS:</span>
                    <span className="text-green-400">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </TechnicalPanel>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-cyan-400 text-sm tracking-widest">
                02
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono tracking-tight text-white">
              WORK HISTORY
            </h2>
          </motion.div>

          <ExperienceTimeline />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-cyan-400 text-sm tracking-widest">
                03
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono tracking-tight text-white">
              TECHNICAL CAPABILITIES
            </h2>
          </motion.div>

          <TechnicalPanel className="p-8 md:p-12">
            <SkillDiagram />
          </TechnicalPanel>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-cyan-400 text-sm tracking-widest">
                04
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono tracking-tight text-white">
              PROJECT MODULES
            </h2>
          </motion.div>

          <ProjectModule />
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-cyan-400 text-sm tracking-widest">
                05
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono tracking-tight text-white">
              CERTIFICATIONS & TRAINING
            </h2>
          </motion.div>

          <Certifications />
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-cyan-400 text-sm tracking-widest">
                06
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono tracking-tight text-white">
              TECHNICAL DOCUMENTATION
            </h2>
          </motion.div>

          <ResumeSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-cyan-400 text-sm tracking-widest">
                07
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-mono tracking-tight text-white">
              INITIALIZE CONTACT
            </h2>
          </motion.div>

          <TechnicalPanel className="p-8 md:p-12 text-center">
            <p className="text-slate-300 mb-8 font-light text-lg">
              Ready to collaborate on your next technical challenge?
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="mailto:sinalbreiche@gmail.com"
                className="flex items-center gap-2 px-6 py-3 border border-cyan-500/30 text-cyan-400 font-mono text-sm tracking-wider hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>EMAIL</span>
              </a>

              <a
                href="https://github.com/BreicheSinal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-cyan-500/30 text-cyan-400 font-mono text-sm tracking-wider hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <a
                href="https://linkedin.com/in/sinalbreiche"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-cyan-500/30 text-cyan-400 font-mono text-sm tracking-wider hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>
            </div>

            <div className="pt-8 border-t border-cyan-500/20">
              <p className="font-mono text-xs text-cyan-400/60 tracking-widest">
                RESPONSE TIME: &lt; 48 HOURS
              </p>
            </div>
          </TechnicalPanel>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-cyan-500/20 py-8 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs text-cyan-400 tracking-widest">
                SINAL BREICHE
              </span>
            </div>

            <p className="font-mono text-xs text-slate-400">
              © 2026 SINAL BREICHE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
