import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import PrintResume from './PrintResume'; // Adjust the path as needed
import ReactDOMServer from 'react-dom/server';

export const generatePDF = (resumeData) => {
  const { personalDetailState, educationDetailState, experienceDetailState, projectsState, skillsState } = resumeData;

  // Render the PrintResume component to static HTML
  const resumeHTML = ReactDOMServer.renderToString(
    <PrintResume
      personalDetailState={personalDetailState}
      educationDetailState={educationDetailState}
      experienceDetailState={experienceDetailState}
      projectsState={projectsState}
      skillsState={skillsState}
    />
  );

  // Create a new div to hold the rendered HTML
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.top = '-9999px';
  tempDiv.innerHTML = resumeHTML;
  document.body.appendChild(tempDiv);

  // Use html2canvas to capture the div
  html2canvas(tempDiv).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF("p", "px", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('resume.pdf');
    
    // Clean up
    document.body.removeChild(tempDiv);
  });
};
