import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../Axios/api";
import toast from "react-hot-toast";

const initialState = {
    applications: [],
    status: 'idle', 
    error: null
};

let loadingToastId = null;

export const addApplication = createAsyncThunk("traker/addApplication", async (applicationData) =>{
    try {

        const dataWithDefaultStatus = {
            ...applicationData,
            status: applicationData.status || "Applied"
        };

        const response = await API.post('/api/v1/applications', dataWithDefaultStatus);
        return response.data;
    } catch (error) {
        throw error
    }
});

export const getApplication = createAsyncThunk("traker/getApplication", async () =>{
    try {
        const response = await API.get('/api/v1/applications');
        return response.data;
    } catch (error) {
        throw error
    }
});


export const updateApplication = createAsyncThunk("traker/updateApplication", async({id, status}) =>{
    try {
        await API.patch(`/api/v1/applications/${id}`, {status});
        return {id, status};
    } catch (error) {
        throw error
    }
});

export const deleteApplication = createAsyncThunk("traker/deleteApplication", async(id) =>{
    try {
        await API.delete(`/api/v1/applications/${id}`);
        return id;
    } catch (error) {
        throw error;
    }
});


const applicationSlice = createSlice({
    name:"tracker",
    initialState,
    reducers:{
        addApplicationLocal: (state, action) =>{
            const applicationWithDefaultStatus = {
                ...action.payload,
                status: action.payload.status || "Applied"
            };
            state.applications.push(applicationWithDefaultStatus);
        },
        updateApplicationLocal: (state, action) =>{
            const { id, status } = action.payload;
            const existingApp = state.applications.find(app => app._id === id);
            if (existingApp) {
                existingApp.status = status;
            }
        },
        deleteApplicationLocal: (state, action) => {
            state.applications = state.applications.filter(app => app._id !== action.payload);
          },
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },

    extraReducers: (builder) =>{
      builder
        .addCase(addApplication.pending, (state) =>{
            state.status = 'loading';
            loadingToastId = toast.loading('Adding application...');
        })
        .addCase(addApplication.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.applications.push(action.payload);

            toast.dismiss(loadingToastId); 
            toast.success('Application added!');
        })
        .addCase(addApplication.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

            toast.dismiss(loadingToastId);
            toast.error('Failed to add application!');
        })
        
        .addCase(getApplication.pending, (state) => {
            state.status = 'loading';
            loadingToastId =toast.loading('Fetching all Application....');
        })
        .addCase(getApplication.fulfilled, (state, action) => {
            state.status = 'succeeded';

            const applicationsWithDefaults = action.payload.map(app => ({
                ...app,
                status: app.status
            }));
            state.applications = applicationsWithDefaults;

            toast.dismiss(loadingToastId);
        })
        .addCase(getApplication.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

            toast.dismiss(loadingToastId);
            toast.error('Failed to fetch applications!');
        })
        
        .addCase(updateApplication.pending, (state) => {
            state.status = 'loading';
            loadingToastId = toast.loading('Updating status...');
        })
        .addCase(updateApplication.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const { id, status } = action.payload;
            const existingApp = state.applications.find(app => app._id === id);
            if (existingApp) {
                existingApp.status = status;
            }
            
            toast.dismiss(loadingToastId); 
            toast.success('Status updated!');
        })
        .addCase(updateApplication.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

            toast.dismiss(loadingToastId);
            toast.error('Failed to update status!');
        })
          
        .addCase(deleteApplication.pending, (state) => {
            state.status = 'loading';
            loadingToastId = toast.loading('Deleting application...');
        })
        .addCase(deleteApplication.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.applications = state.applications.filter(app => app._id !== action.payload);

            toast.dismiss(loadingToastId);
            toast.success('Application deleted!');
        })
        .addCase(deleteApplication.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

            toast.dismiss(loadingToastId);
            toast.error('Failed to delete status!');
        });
    }
});

export const { 
    addApplicationLocal, 
    updateApplicationLocal, 
    deleteApplicationLocal,
    resetStatus 
} = applicationSlice.actions;
  
export default applicationSlice.reducer;