import axios from "axios";
import Cookies from "js-cookie";

const login = async (username, password) => {
	try {
		const response = await axios.post(`http://localhost:4000/login`, { username, password });
		if(response.data.accessToken) {
			Cookies.set("user", JSON.stringify(response.data), { expires: 1 });
		}
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};

const signUp = async (username, password) => {
	try {
		const response = await axios.post(`http://localhost:4000/signUp`, { username, password });
		if(response.data.accessToken) {
			Cookies.set("user", JSON.stringify(response.data), { expires: 1 });
		}
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};

const logout = async () => {
	Cookies.remove("user");
};

const getCurrentUser = async () => {
	const user = Cookies.get("user");
    return user ? JSON.parse(user) : undefined;
};

const validatePassword = (password) => {
    const passwordRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[@$!%*?&])[A-Za-zd@$!%*?&1-9]{8,}$/;
    return passwordRegEx.test(password);
  };

const authService = {
	login,
	signUp,
	logout,
	getCurrentUser,
	validatePassword
};

export default authService;