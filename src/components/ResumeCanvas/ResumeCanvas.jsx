// ResumeCanvas.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './resumeCanvas.module.css';
import { generatePDF } from './generatePDF';
import PrintResume from './PrintResume';
import { useNavigate } from 'react-router-dom';

const ResumeCanvas = () => {
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();
    const personalDetailState = useSelector((state) => state.resumeReducer.personalDetailState);
    const educationDetailState = useSelector((state) => state.resumeReducer.educationDetailState);
    const experienceDetailState = useSelector((state) => state.resumeReducer.experienceDetailState);
    const projectsState = useSelector((state) => state.resumeReducer.projectsState);
    const skillsState = useSelector((state) => state.resumeReducer.skillsState);

    const handlePrint = () => {
        generatePDF({personalDetailState, educationDetailState, experienceDetailState, projectsState, skillsState});
    };

    const handlePreview = () => {
        setShowPreview(!showPreview);
    };

    const handlePrevious = () => {
        navigate('/create-resume/skills');
    };

    return (
        <div className={styles.printContainer}>
            <h4>Print Resume</h4>
            <div className={styles.buttonRow}>
                <button onClick={handlePrevious} className={styles.previousButton}>Previous</button>
                <button onClick={handlePrint} className={styles.printButton}>Download Resume</button>
            </div>
            <button onClick={handlePreview} className={styles.previewButton}>
                {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>

            {showPreview && (
                <div className={styles.previewContainer}>
                    <PrintResume
                        personalDetailState={personalDetailState}
                        educationDetailState={educationDetailState}
                        experienceDetailState={experienceDetailState}
                        projectsState={projectsState}
                        skillsState={skillsState}
                        isPDF={false}
                    />
                </div>
            )}
        </div>
    );
};

export default ResumeCanvas;
