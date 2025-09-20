import React from "react";
import { motion } from "framer-motion";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          👨‍💻 My Digital Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Born in <span>Mandera</span>. Brother to a Victim. Dreamer. Hacker in the making.  
          Building the future with code, one line at a time.
        </motion.p>
      </section>

      {/* Who I Am */}
      <motion.section
        className="about-content"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>Who I Am</h2>
        <p>
          I hail from the resilient community of <strong>Mandera</strong>, a place that taught me perseverance and vision.  
          As a <strong>brother to a victim</strong>, my journey is fueled by determination and a desire to create impact.  
          I strive to rise above challenges, learn relentlessly, and forge a path in the tech world.
        </p>
      </motion.section>

      {/* What I Do */}
      <motion.section
        className="about-content"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>What I Do</h2>
        <p>
          I am passionate about <span>coding, hacking, and building innovative solutions</span>.  
          Each project is a playground for learning, experimentation, and pushing limits.  
          My work is a testament to curiosity, discipline, and the drive to shape the digital future.
        </p>
      </motion.section>

      {/* Education */}
      <motion.section
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>Education</h2>
        <p>
          Currently pursuing <strong>Computer Science</strong>, I dive deep into algorithms, systems, and emerging technologies.  
          Education is my launchpad, enabling me to explore, innovate, and become a world-class <span>developer & hacker</span>.
        </p>
      </motion.section>

      {/* Closing / Vision */}
      <motion.section
        className="closing"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>The Journey Ahead </h2>
        <p>
          I’m here not to follow trends, but to define them.  
          To build, innovate, and inspire.  
          From Mandera to the world, my goal is to leave a mark in technology, hacking, and development.  
          <strong>Dream bigger. Code smarter. Rise higher.</strong>
        </p>
      </motion.section>
    </div>
  );
}

export default About;
