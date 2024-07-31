import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './projects.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectsState, saveProjectsState } from '../../redux/resumeSlice';

const Projects = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.authReducer.username);
  const projectList = useSelector((state) => state.resumeReducer.projectsState);

  useEffect(() => {
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }, [projectList]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;    
    const newProjectList = projectList.map((project, i) =>
      i === index ? { ...project, [name]: value } : project
    );
    dispatch(updateProjectsState(newProjectList));
  };

  const handleAddProject = () => {
    dispatch(updateProjectsState([...projectList, {
      title: '',
      link: '',
      description: '',
    }]));
  };

  const handleDeleteProject = (index) => {
    const newProjectList = projectList.filter((_, i) => i !== index);
    dispatch(updateProjectsState(newProjectList));
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    dispatch(saveProjectsState({username, projectsState: projectList}));
  };

  const handleNext = () => {
    navigate('/create-resume/skills');
  };

  return (
    <div className={styles.formContainer}>
      <h4>Projects</h4>
      {projectList.map((project, index) => (
        <div key={index} className={styles.projectCard}>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <label>Title</label>
              <input 
                type="text" 
                name="title" 
                value={project.title} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
            <div className={styles.formColumn}>
              <label>Link</label>
              <input 
                type="url" 
                name="link" 
                value={project.link} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formColumnWide}>
              <label>Description</label>
              <textarea
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
          <button 
            type="button" 
            className={styles.deleteButton} 
            onClick={() => handleDeleteProject(index)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <div className={styles.addButton} onClick={handleAddProject}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} /> Add More
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={() => navigate('/create-resume/experience-details')}>Previous</button>
        <button type="button" className={styles.saveDraftButton} onClick={handleSaveDraft}>Save</button>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Projects;
