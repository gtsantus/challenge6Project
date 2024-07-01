import axios from "axios";
import authHeader from "./auth-header";


const getPublicContent = () => { 
    return axios.get("http://localhost:4000/public");
}

const getAdminContent = () => {
    return axios.get("http://localhost:4000/admin", { headers: authHeader() });
}

const UserService = {
    getPublicContent,
    getAdminContent
};

export default UserService;