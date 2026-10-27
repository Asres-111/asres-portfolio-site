import './Home.css'

function Home() {
  return (
    <section id="home" className="home">
      <div className="container home__inner">
        <div className="home__content">
          <p className="home__greeting">Hello, I'm</p>
          <h1 className="home__name">Asres Abebe</h1>
          <p className="home__title">Aspiring Full-Stack Web Developer</p>
          <p className="home__text">
            I am an Information Systems student at Bahir Dar University. I enjoy
            learning new technologies, solving problems, and building useful
            software step by step.
          </p>

          <div className="home__actions">
            <a href="#projects" className="btn btn-primary">
              View My Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        </div>

        {/* Decorative code card made with CSS only (no image needed).
            It repeats facts already written in the text, so screen readers skip it. */}
        <div className="home__visual" aria-hidden="true">
          <div className="code-card">
            <div className="code-card__bar">
              <span className="code-card__dot"></span>
              <span className="code-card__dot"></span>
              <span className="code-card__dot"></span>
            </div>
            <pre className="code-card__body">
              <code>
                <span className="c-kw">const</span>{' '}
                <span className="c-var">developer</span> = {'{'}
                {'\n'}
                {'  '}name: <span className="c-str">"Asres Abebe"</span>,
                {'\n'}
                {'  '}title: <span className="c-str">"Aspiring Full-Stack Web Developer"</span>,
                {'\n'}
                {'  '}studying: <span className="c-str">"Information Systems"</span>,
                {'\n'}
                {'  '}university: <span className="c-str">"Bahir Dar University"</span>,
                {'\n'}
                {'  '}goal: <span className="c-str">"Build useful software"</span>,
                {'\n'}
                {'}'};
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home