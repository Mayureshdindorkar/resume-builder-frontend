import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URI} from './constants';

const initialState = {
    personalDetailState: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        linkedin: '',
        github: '',
    },
    educationDetailState: [
        {
            schoolName: '',
            passingYear: '',
            degreeTitle: '',
            grade: '',
        }
    ],
    experienceDetailState: [
        {
            organizationName: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
        }
    ],
    projectsState: [
        {
            title: '',
            link: '',
            description: '',
        }
    ],
    skillsState: [],
    isUserOldDataLoaded: false,
};

export const savePersonalDetailState = createAsyncThunk(
    'create-resume/personal-details',
    async ({ username, personalDetailState }) => {
        const response = await axios.patch(`${BASE_URI}/create-resume/personal-details`, { username, personalDetailState });
        return response.data;
    }
);

export const saveEducationDetailState = createAsyncThunk(
    'create-resume/education-details',
    async ({ username, educationDetailState }) => {
        const response = await axios.patch(`${BASE_URI}/create-resume/education-details`, { username, educationDetailState });
        return response.data;
    }
);

export const saveExperienceDetailState = createAsyncThunk(
    'create-resume/experience-details',
    async ({ username, experienceDetailState }) => {
        const response = await axios.patch(`${BASE_URI}/create-resume/experience-details`, { username, experienceDetailState });
        return response.data;
    }
);

export const saveProjectsState = createAsyncThunk(
    'create-resume/projects',
    async ({ username, projectsState }) => {
        const response = await axios.patch(`${BASE_URI}/create-resume/projects`, { username, projectsState });
        return response.data;
    }
);

export const saveSkillsState = createAsyncThunk(
    'create-resume/skills',
    async ({ username, skillsState }) => {
        const response = await axios.patch(`${BASE_URI}/create-resume/skills`, { username, skillsState });
        return response.data;
    }
);

const resumeSlice = createSlice({
    name: 'resumeSlice',
    initialState,
    reducers: {
        updatePersonalDetailState(state, action) {
            state.personalDetailState = { ...state.personalDetailState, ...action.payload };
        },
        updateEducationDetailState(state, action) {
            state.educationDetailState = action.payload;
        },
        updateExperienceDetailState(state, action) {
            state.experienceDetailState = action.payload;
        },
        updateProjectsState(state, action) {
            state.projectsState = action.payload;
        },
        updateSkillsState(state, action) {
            state.skillsState = action.payload;
        },
        setUserData(state, action) {
            state.isUserOldDataLoaded = true;
            if(action.payload.educationDetails) state.educationDetailState = action.payload.educationDetails;
            if(action.payload.experienceDetails) state.experienceDetailState = action.payload.experienceDetails;
            if(action.payload.personalDetails) state.personalDetailState = action.payload.personalDetails;
            if(action.payload.projectDetails) state.projectsState = action.payload.projectDetails;
            if(action.payload.skills) state.skillsState = action.payload.skills;
            console.log("Successfully loaded user's old data");
        },
        setIsUserOldDataLoaded(state, action) {
            state.isUserOldDataLoaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(savePersonalDetailState.fulfilled, (state, action) => {
                state.error = null;
                // popup for save success
            })
            .addCase(savePersonalDetailState.rejected, (state, action) => {
                state.error = action.error.message || 'Error occurred while saving personal details';
                // popup error
            })
            .addCase(saveEducationDetailState.fulfilled, (state, action) => {
                state.error = null;
                // popup for save success
            })
            .addCase(saveEducationDetailState.rejected, (state, action) => {
                state.error = action.error.message || 'Error occurred while saving education details';
                // popup error
            })
            .addCase(saveExperienceDetailState.fulfilled, (state, action) => {
                state.error = null;
                // popup for save success
            })
            .addCase(saveExperienceDetailState.rejected, (state, action) => {
                state.error = action.error.message || 'Error occurred while saving experience details';
                // popup error
            })
            .addCase(saveProjectsState.fulfilled, (state, action) => {
                state.error = null;
                // popup for save success
            })
            .addCase(saveProjectsState.rejected, (state, action) => {
                state.error = action.error.message || 'Error occurred while saving projects details';
                // popup error
            })
            .addCase(saveSkillsState.fulfilled, (state, action) => {
                state.error = null;
                // popup for save success
            })
            .addCase(saveSkillsState.rejected, (state, action) => {
                state.error = action.error.message || 'Error occurred while saving skills details';
                // popup error
            });
    },
});

export const { 
    updateEducationDetailState, 
    updatePersonalDetailState, 
    updateExperienceDetailState, 
    updateProjectsState, 
    updateSkillsState,
    setUserData,
    setIsUserOldDataLoaded,
} = resumeSlice.actions;

export default resumeSlice.reducer;
