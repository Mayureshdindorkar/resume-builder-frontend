import React from 'react';
import { FaPhoneAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const PrintResume = ({ personalDetailState, educationDetailState, experienceDetailState, projectsState, skillsState, isPDF }) => {

  return (
    <>
      <div style={{ margin: '0px', padding: '0px', textAlign: 'center' }}>
        <p style={{ margin: '0px', padding: '0px', fontSize: '16px', fontWeight: 'bold' }}>
          {personalDetailState.firstName} {personalDetailState.lastName}
        </p>
        <div style={{ fontSize: '10px', margin: '0px', padding: '0px' }}>
          <FaPhoneAlt size={10} /> {personalDetailState.phoneNumber}
          <span style={{ marginLeft: '10px' }}>
            <a href={personalDetailState.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
              <FaLinkedin size={10} />
            </a>
            <a href={personalDetailState.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <FaGithub size={10} />
            </a>
          </span>
        </div>
        <hr style={{ borderColor: 'grey', borderWidth: '1px', margin: '0px', padding: '0px' }} />
      </div>

      <div style={{ display: 'flex', padding: '5px' }}>
        {/* Left Column */}
        <div style={{ flex: 1, padding: '10px' }}>
          <div style={{ backgroundColor: '#f0f0f0', padding: '1px', marginBottom: '5px' }}>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>Education</p>
          </div>
          {educationDetailState.map((education, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p style={{ margin: '0', fontSize: '10px' }}><strong>{education.schoolName}</strong></p>
              <p style={{ margin: '0', fontSize: '10px', color: 'gray', fontStyle: 'italic' }}>Passing Year: {education.passingYear}</p>
              <p style={{ margin: '0', fontSize: '10px', color: 'gray', fontStyle: 'italic' }}>{education.degreeTitle}</p>
              <p style={{ margin: '0', fontSize: '10px', color: 'gray', fontStyle: 'italic' }}>Grade: {education.grade}</p>
            </div>
          ))}

          <div style={{ backgroundColor: '#f0f0f0', padding: '1px', marginBottom: '5px' }}>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>Experience</p>
          </div>
          {experienceDetailState.map((experience, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p style={{ margin: '0', fontSize: '10px' }}><strong>{experience.organizationName}</strong></p>
              <p style={{ margin: '0', fontSize: '10px', color: 'gray' }}>{experience.position}</p>
              <p style={{ margin: '0', fontSize: '10px', color: 'gray', fontStyle: 'italic' }}>{experience.startDate} to {experience.endDate}</p>
              <p style={{ margin: '0', fontSize: '10px', color: 'gray', maxWidth: '200px', }}>{experience.description}</p>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, padding: '10px' }}>
          <div style={{ backgroundColor: '#f0f0f0', padding: '1px', marginBottom: '5px' }}>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>Projects</p>
          </div>
          {projectsState.map((project, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p style={{ margin: '0', fontSize: '10px' }}><strong>{project.title}</strong></p>
              <p style={{ margin: '0', fontSize: '8px', color: 'gray', fontStyle: 'italic' }}><a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>
              <p style={{ margin: '0', fontSize: '10px', color: 'gray', maxWidth: '200px' }}>{project.description}</p>
            </div>
          ))}

          <div style={{ backgroundColor: '#f0f0f0', padding: '1px', marginBottom: '5px' }}>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>Skills</p>
          </div>
          <ul>
            {skillsState.map((skill, index) => (
              <li key={index} style={{ fmargin: '0', fontSize: '10px', color: 'gray' }}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PrintResume;
