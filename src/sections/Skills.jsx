import './Skills.css'

// EDIT HERE: to add a skill, copy one block between { } and change the text.
// To remove a skill, delete its block.
const skills = [
  { name: 'HTML', description: 'Structuring the content of web pages.' },
  { name: 'CSS', description: 'Styling pages and making them responsive.' },
  { name: 'JavaScript', description: 'Adding behavior and interaction to websites.' },
  { name: 'React', description: 'Building user interfaces from reusable components.' },
  { name: 'Python', description: 'General programming and problem solving.' },
  { name: 'Java', description: 'Object-oriented programming.' },
  { name: 'SQL and Databases', description: 'Storing, organizing, and querying data.' },
  { name: 'Git and GitHub', description: 'Tracking code changes and sharing projects.' },
  { name: 'UI/UX Design', description: 'Designing clear and easy-to-use interfaces.' },
]

function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <h2 className="section-heading">Skills</h2>
        <p className="section-subtitle">
          Technologies I am learning and practicing as I grow as a developer.
        </p>

        <ul className="skills__grid">
          {skills.map((skill) => (
            <li key={skill.name} className="skill-card">
              <span className="skill-card__badge" aria-hidden="true">
                {skill.name.charAt(0)}
              </span>
              <h3 className="skill-card__name">{skill.name}</h3>
              <p className="skill-card__text">{skill.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Skills