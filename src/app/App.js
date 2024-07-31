import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/SignUpPage/SignUpPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './app.module.css';
import PersonalDetails from '../components/PersonalDetails/PersonalDetails';
import EducationDetails from '../components/EducationDetails/EducationDetails';
import ExperienceDetails from '../components/ExperienceDetails/ExperienceDetails';
import Projects from '../components/Projects/Projects';
import Skills from '../components/Skills/Skills';
import ResumeCanvas from '../components/ResumeCanvas/ResumeCanvas';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <main className={styles.content}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/create-resume/personal-details" element={<PersonalDetails />} />
            <Route path="/create-resume/education-details" element={<EducationDetails />} />
            <Route path="/create-resume/experience-details" element={<ExperienceDetails />} />
            <Route path="/create-resume/projects" element={<Projects />} />
            <Route path="/create-resume/skills" element={<Skills />} />
            <Route path="/create-resume/print" element={<ResumeCanvas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
