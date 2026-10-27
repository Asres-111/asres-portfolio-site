import './Footer.css'

const EMAIL = 'asresabebe444@gmail.com'
const GITHUB_URL = 'https://github.com/Asres-111'

// EDIT HERE: the footer links. They match the sections on the page.
const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Footer() {
  // The year updates by itself, so you never have to edit it
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">Asres Abebe</p>
          <p className="footer__role">Aspiring Full-Stack Web Developer</p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="footer__links">
            {links.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="footer__contact">
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
        </ul>
      </div>

      <div className="container">
        <p className="footer__copy">
          &copy; {year} Asres Abebe. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer