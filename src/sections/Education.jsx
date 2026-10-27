import './Education.css'

// EDIT HERE: add dates, courses, or results later when you are ready.
const education = [
  {
    degree: 'Undergraduate Program in Information Systems',
    school: 'Bahir Dar University',
    institute: 'Bahir Dar Institute of Technology (BiT)',
    location: 'Bahir Dar, Ethiopia',
    status: 'Currently studying',
  },
]

function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-heading">Education</h2>
        <p className="section-subtitle">
          My academic background in technology and information systems.
        </p>

        <ul className="education__list">
          {education.map((item) => (
            <li key={item.degree} className="education-card">
              <span className="education-card__status">{item.status}</span>
              <h3 className="education-card__degree">{item.degree}</h3>
              <p className="education-card__school">{item.school}</p>
              <p className="education-card__institute">{item.institute}</p>
              <p className="education-card__location">{item.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Education