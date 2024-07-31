import styles from './personalDetails.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { savePersonalDetailState, updatePersonalDetailState } from '../../redux/resumeSlice';

const PersonalDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const personalDetailState = useSelector((state) => state.resumeReducer.personalDetailState);
    const username = useSelector((state) => state.authReducer.username);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updatePersonalDetailState({ [name]: value }));
    };

    const handleSaveDraft = (e) => {
        e.preventDefault();
        dispatch(savePersonalDetailState({username, personalDetailState}));
    };

    const handleNext = () => {
        navigate('/create-resume/education-details');
    };

    return (
        <div className={styles.formContainer}>
            <h4>Personal Details</h4>
            <form>
                <div className={styles.formGroup}>
                    <div className={styles.formColumn}>
                        <label>First Name</label>
                        <input type="text" name="firstName" value={personalDetailState.firstName} onChange={handleChange} required />
                    </div>
                    <div className={styles.formColumn}>
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={personalDetailState.lastName} onChange={handleChange} required />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.formColumn}>
                        <label>Phone Number</label>
                        <input type="number" name="phoneNumber" maxLength={10} max={9999999999} min={0} value={personalDetailState.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className={styles.formColumn}>
                        <label>Email</label>
                        <input type="email" name="email" value={personalDetailState.email} onChange={handleChange} required />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.formColumn}>
                        <label>LinkedIn URL</label>
                        <input type="url" name="linkedin" value={personalDetailState.linkedin} onChange={handleChange} required />
                    </div>
                    <div className={styles.formColumn}>
                        <label>GitHub URL</label>
                        <input type="url" name="github" value={personalDetailState.github} onChange={handleChange} required />
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" className={styles.previousButton} disabled>Previous</button>
                    <button type="button" className={styles.saveDraftButton} onClick={handleSaveDraft}>Save</button>
                    <button type="button" className={styles.nextButton} onClick={handleNext}>Next</button>
                </div>
            </form>
        </div>
    );
};

export default PersonalDetails;
