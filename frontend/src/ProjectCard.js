import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ✅ Progress bar for slideshow
function ProgressBars({ images, currentIndex, progress }) {
  return (
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
      {images.map((_, i) => (
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
                  ? "100%"
                  : i === currentIndex
                  ? `${progress}%`
                  : "0%",
              background: "#007bff",
              transition: "width 0.1s linear"
            }}
          />
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const hasMultipleImages = project.images && project.images.length > 1;

  useEffect(() => {
    let imgInterval;
    let progressInterval;

    if (hovered && hasMultipleImages) {
      imgInterval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
        setProgress(0);
      }, 3000);

      progressInterval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 100 : p + 2));
      }, 60);
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

  // ✅ Internal vs external links
  const ImageWrapper = project.page ? Link : "a";
  const wrapperProps = project.page
    ? { to: project.page, style: { textDecoration: "none" } }
    : { href: project.link, target: "_blank", rel: "noopener noreferrer" };

  const ButtonWrapper = project.page ? Link : "a";
  const buttonProps = project.page
    ? { to: project.page }
    : { href: project.link, target: "_blank", rel: "noopener noreferrer" };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer",
        marginBottom: "1.5rem"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {project.images && (
        <ImageWrapper {...wrapperProps}>
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
                marginBottom: "0.5rem"
              }}
            />
            {hasMultipleImages && (
              <ProgressBars
                images={project.images}
                currentIndex={currentIndex}
                progress={progress}
              />
            )}
          </div>
        </ImageWrapper>
      )}

      <ButtonWrapper
        {...buttonProps}
        style={{ marginTop: "0.5rem", display: "inline-block" }}
      >
        🔗 {project.page ? "Open Project Page" : "View on GitHub"}
      </ButtonWrapper>
    </div>
  );
}

export default ProjectCard;
