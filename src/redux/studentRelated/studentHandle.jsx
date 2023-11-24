import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

export const deleteStudent = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        // Send a DELETE request to the backend endpoint for deleting a student by ID
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/Student/${id}`);
        if (result.data.message) {
            // If there is an error message returned, dispatch getFailed action
            dispatch(getFailed(result.data.message));
        } else {
            // If deletion is successful, dispatch the stuffDone action
            dispatch(stuffDone());
        }
    } catch (error) {
        // If an error occurs during the request, dispatch getError action
        dispatch(getError(error));
    }
};

export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}