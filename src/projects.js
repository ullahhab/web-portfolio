import React, { useState, useEffect } from "react";
import scrum1 from "./images/scrum1.png";
import scrum2 from "./images/scrum2.png";
import scrum3 from "./images/scrum3.png";

const projects = [
  {
    title: "Stock Bot",
    description:
      "Build a trading bot using Alpaca API. You can download a docker container from the link",
    link: "https://github.com/ullahhab",
    images: [scrum1, scrum2, scrum3] // 👈 multiple images
  },
  {
    title: "Recipe Manager",
    description: "Save, build, and rotate recipe for the weeks",
    link: "https://github.com/ullahhab",
    images: [scrum1, scrum2, scrum3]
  },
  {
    title: "Automations",
    description:
      "API building automation, AWS dashboard builder all in one, trading bot, Whitelisting, Save commands to run your projects with one click and many more",
    link: "https://github.com/ullahhab",
    images: [scrum1, scrum2, scrum3]
  }
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let imgInterval;
    let progressInterval;

    if (hovered) {
      imgInterval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
        setProgress(0);
      }, 3000); // switch every 3s

      progressInterval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 100 : p + 2));
      }, 60); // progress fills in ~3s
    } else {
      clearInterval(imgInterval);
      clearInterval(progressInterval);
      setCurrentIndex(0);
      setProgress(0);
    }

    return () => {
      clearInterval(imgInterval);
      clearInterval(progressInterval);
    };
  }, [hovered, project.images.length]);

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {project.images && (
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={project.images[currentIndex]}
              alt={project.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "0.5rem",
                objectFit: "cover"
              }}
            />

            {/* Instagram-style progress bars */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                right: "8px",
                display: "flex",
                gap: "4px"
              }}
            >
              {project.images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: "4px",
                    background: "rgba(255,255,255,0.4)",
                    borderRadius: "2px",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width:
                        i < currentIndex
                          ? "100%" // filled if already passed
                          : i === currentIndex
                          ? `${progress}%` // active one animates
                          : "0%",
                      background: "#007bff",
                      transition: "width 0.1s linear"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </a>
      )}

      <a href={project.link} target="_blank" rel="noopener noreferrer">
        🔗 View on GitHub
      </a>
    </div>
  );
}

export default function Projects() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Projects</h2>
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
