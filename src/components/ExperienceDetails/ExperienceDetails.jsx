import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './experienceDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperienceDetailState, saveExperienceDetailState } from '../../redux/resumeSlice';

const ExperienceDetails = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.authReducer.username);
  const experienceList = useSelector((state) => state.resumeReducer.experienceDetailState);

  useEffect(() => {
    localStorage.setItem('experienceList', JSON.stringify(experienceList));
  }, [experienceList]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newExperienceList = experienceList.map((experience, i) =>
      i === index ? { ...experience, [name]: value } : experience
    );
    dispatch(updateExperienceDetailState(newExperienceList));
  };

  const handleAddExperience = () => {
    dispatch(updateExperienceDetailState([...experienceList, {
      organizationName: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    }]));
  };

  const handleDeleteExperience = (index) => {
    const newExperienceList = experienceList.filter((_, i) => i !== index);
    dispatch(updateExperienceDetailState(newExperienceList));
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    dispatch(saveExperienceDetailState({username, experienceDetailState: experienceList}));
  };

  const handleNext = () => {
    navigate('/create-resume/projects');
  };

  return (
    <div className={styles.formContainer}>
      <h4>Experience Details</h4>
      {experienceList.map((experience, index) => (
        <div key={index} className={styles.experienceCard}>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <label>Institute/Organization Name</label>
              <input 
                type="text" 
                name="organizationName" 
                value={experience.organizationName} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
            <div className={styles.formColumn}>
              <label>Position</label>
              <input 
                type="text" 
                name="position" 
                value={experience.position} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <label>Start Date</label>
              <input 
                type="date" 
                name="startDate" 
                value={experience.startDate} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
            <div className={styles.formColumn}>
              <label>End Date</label>
              <input 
                type="date" 
                name="endDate" 
                value={experience.endDate} 
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
                value={experience.description}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
          <button 
            type="button" 
            className={styles.deleteButton} 
            onClick={() => handleDeleteExperience(index)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <div className={styles.addButton} onClick={handleAddExperience}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} /> Add More
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={() => navigate('/create-resume/education-details')}>Previous</button>
        <button type="button" className={styles.saveDraftButton} onClick={handleSaveDraft}>Save</button>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ExperienceDetails;
