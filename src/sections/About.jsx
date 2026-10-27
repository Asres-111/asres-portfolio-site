import './About.css'

// EDIT HERE: change these paragraphs to personalize the section.
const aboutParagraphs = [
  "I am an undergraduate Information Systems student at Bahir Dar University, Bahir Dar Institute of Technology (BiT), in Ethiopia.",
  "I am interested in web development, databases, and software engineering. I enjoy learning how software is planned, built, and improved, and I want to use technology to solve real-world problems.",
  "Right now I am building my skills step by step and practicing with projects.",
]

// EDIT HERE: these cards show what I am focusing on.
const focusAreas = [
  {
    title: 'Web Development',
    text: 'Learning to build responsive websites and web applications.',
  },
  {
    title: 'Databases',
    text: 'Learning how data is stored, organized, and queried.',
  },
  {
    title: 'Software Engineering',
    text: 'Learning how to plan, write, and maintain clean code.',
  },
  {
    title: 'Problem Solving',
    text: 'Using technology to solve real-world problems.',
  },
]

function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <h2 className="section-heading">About Me</h2>
        <p className="section-subtitle">
          A short introduction to who I am and what I am learning.
        </p>

        <div className="about__grid">
          <div className="about__text">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="about__focus">
            {focusAreas.map((area) => (
              <li key={area.title} className="focus-card">
                <h3 className="focus-card__title">{area.title}</h3>
                <p className="focus-card__text">{area.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About