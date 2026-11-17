'use client';

import { useState } from 'react';
import Link from 'next/link';

const projectOptions = [
  { id: 'website', label: 'Website Development', detail: 'A clear, fast home for your business online.' },
  { id: 'app', label: 'Software & Application Development', detail: 'Useful digital tools and apps for your team or customers.' },
  { id: 'brand', label: 'Graphic Design & Branding', detail: 'A minimalist, distinctive visual identity and UI/UX.' },
  { id: 'growth', label: 'Digital Marketing & Advertising', detail: 'Strategic campaigns to reach and engage more customers.' },
  { id: 'ai', label: 'AI Solutions & Tech Consultancy', detail: 'Intelligent automation and digital transformation planning.' },
];

const projectAdvice = {
  website: 'A great place to start is with your audience, your key message, and the one action you want visitors to take.',
  app: 'We can help shape the idea, define a useful first version, and map out how it will work in the real world.',
  brand: 'Let’s craft a clean, modern visual identity and design system that makes your brand unforgettable.',
  growth: 'We can align your audience and goals, then launch targeted advertising and organic growth channels.',
  ai: 'Let’s audit your current workflows and identify high-impact AI automation and technology upgrades.',
};

export default function ProjectPlanner() {
  const [project, setProject] = useState(null);

  return (
    <div className="planner-card" aria-live="polite">
      {!project ? (
        <>
          <div className="planner-card-head">
            <span className="planner-kicker">YOUR PROJECT, IN A NUTSHELL</span>
            <span className="planner-count">PICK ONE</span>
          </div>
          <h3>What would you like to make happen?</h3>
          <div className="project-options">
            {projectOptions.map((option) => (
              <button
                className="project-option"
                key={option.id}
                type="button"
                onClick={() => setProject(option.id)}
              >
                <span className="option-symbol">↗</span>
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.detail}</small>
                </span>
                <span className="option-arrow">→</span>
              </button>
            ))}
          </div>
          <p className="planner-disclaimer">Not a quote or assessment—just a helpful first step.</p>
        </>
      ) : (
        <div className="planner-result">
          <span className="result-icon">✳</span>
          <p className="planner-kicker">A GOOD PLACE TO BEGIN</p>
          <h3>{projectOptions.find((option) => option.id === project)?.label}</h3>
          <p>{projectAdvice[project]}</p>
          <div className="result-actions">
            <Link className="button button-dark" href={`/consultation?project=${project}`}>
              Let’s talk about it <span aria-hidden="true">↗</span>
            </Link>
            <button className="reset-button" type="button" onClick={() => setProject(null)}>
              Choose something else
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
