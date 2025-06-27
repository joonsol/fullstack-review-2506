import React from 'react'
import './About.scss'
import { aboutData } from "../../Util/about";

const About = () => {
  return (
    <section className='about-container'>
      <div className="inner">
        <div
          className="about-hero"
          style={{
            backgroundImage: `url(${aboutData.hero.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >

          <div className="about-overlay"></div>
          <div className="about-hero-text">
            <h2>{aboutData.hero.company}</h2>
            <p>{aboutData.hero.slogan}</p>
          </div>
        </div>
        <div className="about-section about-intro">
          <h2>{aboutData.intro.title}</h2>
          <div className="about-text">
            {aboutData.intro.paragraphs.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </div>
        <div className="about-section about-values">
          {aboutData.values.map((value, index) => (
            <div key={index} className="value-card">
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
        {/* Vision Section */}
        <div className="about-section about-vision">
          <h2>{aboutData.vision.title}</h2>
          <p>
            {aboutData.vision.statement.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
        <div className="about-section about-history">
          <h2>{aboutData.history.title}</h2>
          <div className="timeline">
            {aboutData.history.timeline.map((item, index) => (
              <div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              >
                <div className="timeline-box">
                  <h3>{item.year}</h3>
                  <p>{item.event}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About