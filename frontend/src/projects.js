import React, { useState, useEffect } from "react";
import scrum1 from "./images/scrum1.png";
import scrum2 from "./images/scrum2.png";
import scrum3 from "./images/scrum3.png";
import chefai1 from "./images/chefai1.png";
import stockai from "./images/stockAIBot.png"

const projects = [
    {
        title: "Stock Bot",
        description:
            "Build a trading bot using Alpaca API. You can download a docker container from the link",
        link: "https://github.com/ullahhab",
        docker: "https://hub.docker.com/r/hullah/stockbotdemo",
        images: [stockai],
        notes: "Docker image is just a vessel to showcase my skills with it. I know there are security risks and other. But it's just a demo. I have full website and AWS like structure ready for my Friends and Family as bot tester"
    },
    {
        title: "Recipe Manager",
        description: "Save, build, and rotate recipe for the weeks",
        link: "https://github.com/ullahhab",
        images: [chefai1]
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
    const hasMultipleImages = project.images && project.images.length > 1;

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
    }, [hovered, hasMultipleImages, project.images?.length]);

    return (
        <div
            style={{
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {/* Show images if they exist */}
            {Array.isArray(project.images) && project.images.length > 0 && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <div style={{ position: "relative", overflow: "hidden" }}>
                        <img
                            src={project.images[currentIndex]}
                            alt={project.title}
                            style={{
                                width: "100%",
                                height: "520px",
                                objectFit: "cover",
                                objectPosition: "center top",
                                borderRadius: "8px",
                                marginBottom: "0.5rem",
                            }}
                        />

                        {/* Instagram-style progress bars (only if multiple images) */}
                        {hasMultipleImages && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "8px",
                                    left: "8px",
                                    right: "8px",
                                    display: "flex",
                                    gap: "4px",
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
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: "100%",
                                                width:
                                                    i < currentIndex
                                                        ? "100%"
                                                        : i === currentIndex
                                                            ? `${progress}%`
                                                            : "0%",
                                                background: "#007bff",
                                                transition: "width 0.1s linear",
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </a>
            )}

            {/* Always show GitHub link */}
            <a href={project.link} target="_blank" rel="noopener noreferrer">
                🔗 View on GitHub
            </a>

            {/* Optional Docker image link */}
            {project?.docker && (
                <div style={{ marginTop: "0.5rem" }}>
                    <a
                        href={project.docker}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "none" }}
                    >
                        🐳 Checkout Docker image
                    </a>
                </div>
            )}

            {/* Optional project notes */}
            {project?.notes && (
                <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
                    {project.notes}
                </p>
            )}
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