import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './skills.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkillsState, saveSkillsState } from '../../redux/resumeSlice';

const Skills = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.authReducer.username);
  const skillList = useSelector((state) => state.resumeReducer.skillsState);

  useEffect(() => {
    localStorage.setItem('skillList', JSON.stringify(skillList));
  }, [skillList]);

  const handleChange = (index, e) => {
    const { value } = e.target;
    const newSkillList = skillList.map((skill, i) =>
      i === index ? value : skill
    );
    dispatch(updateSkillsState(newSkillList));
  };

  const handleAddSkill = () => {
    dispatch(updateSkillsState([...skillList, '']));
  };

  const handleDeleteSkill = (index) => {
    const newSkillList = skillList.filter((_, i) => i !== index);
    dispatch(updateSkillsState(newSkillList));
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    dispatch(saveSkillsState({username, skillsState: skillList}));
  };

  const handleNext = () => {
    navigate('/create-resume/print');
  };

  return (
    <div className={styles.formContainer}>
      <h4>Skills</h4>
      {skillList.map((skill, index) => (
        <div key={index} className={styles.skillCard}>
          <div className={styles.formRow}>
            <div className={styles.formColumnWide}>
              <label>Skill</label>
              <input
                type="text"
                value={skill}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => handleDeleteSkill(index)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <div className={styles.addButton} onClick={handleAddSkill}>
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} /> Add More
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={() => navigate('/create-resume/projects')}>Previous</button>
        <button type="button" className={styles.saveDraftButton} onClick={handleSaveDraft}>Save</button>
        <button type="button" onClick={handleNext}>Print</button>
      </div>
    </div>
  );
};

export default Skills;
