import './Projects.css'

// EDIT HERE: to add a project, copy one block between { } and change the text.
// Leave a field empty ('' or []) and the card simply hides it.
// Only add links and details that are real and checked.
const projects = [
  {
    title: 'Personal Portfolio Website',
    description:
      'My personal portfolio website, built with React and Vite. It is still being built step by step.',
    technologies: ['React', 'Vite', 'JavaScript', 'CSS'],
    status: 'Work in progress',
    githubUrl: '',
    liveUrl: '',
  },
]

// One reusable card. Every project in the list above uses it.
function ProjectCard({ project }) {
  const hasLinks = project.githubUrl || project.liveUrl

  return (
    <li className="project-card">
      {project.status && (
        <span className="project-card__status">{project.status}</span>
      )}

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__text">{project.description}</p>

      {project.technologies.length > 0 && (
        <ul className="project-card__tags" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li key={tech} className="project-card__tag">
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="project-card__links">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
        )}
        {!hasLinks && (
          <span className="project-card__note">Links will be added soon.</span>
        )}
      </div>
    </li>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-heading">Projects</h2>
        <p className="section-subtitle">
          Things I am building while I learn. More projects will be added as I
          finish them.
        </p>

        <ul className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Projects