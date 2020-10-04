import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
} from "./types";

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });

        dispatch(setAlert(edit ? 'Profile Updated':'Profile Created','success'));

        if(!edit) {
            history.push('/dashboard');
        }

    } catch (error) {
        const errs = error.response.data.errors;

        if (errs) {
          errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status,
          },
        });
    }
}

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/experience", formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert('Experience Added', "success")
      );

      history.push("/dashboard");
    } catch (error) {
      const errs = error.response.data.errors;

      if (errs) {
        errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
}

// Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/education", formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert('Education Added', "success")
      );

      history.push("/dashboard");
    } catch (error) {
      const errs = error.response.data.errors;

      if (errs) {
        errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', "success"));
    } catch (error) {
        const errs = error.response.data.errors;

        if (errs) {
          errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
}

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', "success"));
    } catch (error) {
        const errs = error.response.data.errors;

        if (errs) {
          errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
}

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
    if(window.confirm('Are you sure? this cannot be undone')){
        try {
          const res = await axios.delete(`/api/profile`);
          dispatch({
            type: CLEAR_PROFILE,
          });
          dispatch({
            type: ACCOUNT_DELETED,
          });
      
          dispatch(setAlert("Your account has been permanantly deleted", "success"));
        } catch (error) {
          const errs = error.response.data.errors;
      
          if (errs) {
            errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
          }
        }
    }
};