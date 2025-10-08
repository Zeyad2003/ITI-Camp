import React from "react";
import "./style.css";

export default function App() {
  return (
    <div className="container">
      <section className="intro">
        <h1>Zeyad</h1>
        <p>Position: Developer</p>
        <p>Email: zeyad@example.com</p>
        <p>Phone: +2010xxxxxxx</p>
      </section>

      <section className="experience">
        <h2>Experience</h2>
        <ul>
          <li>React Developer Intern at ITI</li>
        </ul>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <p>React, JavaScript, HTML, CSS, Git</p>
      </section>
    </div>
  );
}
