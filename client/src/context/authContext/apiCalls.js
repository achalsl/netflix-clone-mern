import { axiosInstance } from "../../config";
import {
	loginFailure,
	loginStart,
	loginSuccess,
	logoutStart,
} from "./AuthActions";

export const login = async (userCredentials, dispatch) => {
	dispatch(loginStart());
	try {
		const res = await axiosInstance.post("auth/login", userCredentials);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure(err));
	}
};

export const logout = (dispatch) => {
	dispatch(logoutStart());
};
