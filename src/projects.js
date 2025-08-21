import React from "react";

const projects = [
    {
        title: "Stock Bot",
        description: "Build a trading bot using Alpaca API. You can download a docker container from the link",
        link: "https://github.com/ullahhab"
    },
    {
        title: "Recipe Manager",
        description: "Save, build, and rotate recipe for the weeks",
        link: "https://github.com/ullahhab"
    },
    {
        title: "Automations",
        description: "API building automation, AWS dashboard builder all in one, trading bot, Whitelisting, Save commands to run your projects with one click and many more",
        link: "https://github.com/ullahhab"
    }
];
export default function Projects() {
    return(
        <div style={{ padding: "2rem"}}>
            <h2>My Projects</h2>
            <div style={{display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"}}>
                {projects.map((project, index) => {
                    <div
                    key={index}
                    style={{
                        padding: "1rem",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            🔗 View on GitHub
                        </a>
                    </div>
                })}
            </div>
        </div>
    );
}