import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import styles from './educationDetails.module.css';
import { updateEducationDetailState, saveEducationDetailState } from '../../redux/resumeSlice';

const EducationDetails = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.authReducer.username);
  const educationList = useSelector((state) => state.resumeReducer.educationDetailState);
  
  useEffect(() => {
    localStorage.setItem('educationList', JSON.stringify(educationList));
  }, [educationList]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducationList = educationList.map((education, i) =>
      i === index ? { ...education, [name]: value } : education
    );
    dispatch(updateEducationDetailState(updatedEducationList));
  };

  const handleAddEducation = () => {
    dispatch(updateEducationDetailState([...educationList, {
      schoolName: '',
      passingYear: '',
      degreeTitle: '',
      grade: '',
    }]));
  };

  const handleDeleteEducation = (index) => {
    const newEducationList = educationList.filter((_, i) => i !== index);
    dispatch(updateEducationDetailState(newEducationList));
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    dispatch(saveEducationDetailState({username, educationDetailState: educationList}));
  };

  const handleNext = () => {
    navigate('/create-resume/experience-details');
  };

  return (
    <div className={styles.formContainer}>
      <h4>Education Details</h4>
      {educationList.map((education, index) => (
        <div key={index} className={styles.educationCard}>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <label>College/University/School Name</label>
              <input 
                type="text" 
                name="schoolName" 
                value={education.schoolName} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
            <div className={styles.formColumn}>
              <label>Passing Year</label>
              <input 
                type="number" 
                name="passingYear" 
                value={education.passingYear} 
                onChange={(e) => handleChange(index, e)} 
                min="1900"
                placeholder="1900"
                required 
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <label>Degree Title</label>
              <input 
                type="text" 
                name="degreeTitle" 
                value={education.degreeTitle} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
            <div className={styles.formColumn}>
              <label>CGPA/Percentage</label>
              <input 
                type="text" 
                name="grade" 
                value={education.grade} 
                onChange={(e) => handleChange(index, e)} 
                required 
              />
            </div>
          </div>
          <button 
            type="button" 
            className={styles.deleteButton} 
            onClick={() => handleDeleteEducation(index)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <div className={styles.addButton} onClick={handleAddEducation}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} /> Add More
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={() => navigate('/create-resume/personal-details')}>Previous</button>
        <button type="button" className={styles.saveDraftButton} onClick={handleSaveDraft}>Save</button>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default EducationDetails;
