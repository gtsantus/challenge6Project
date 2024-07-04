import axios from "axios";

const getAllCards = async () => {
	try {
		const response = await axios.get(`http://localhost:4000/getAllCards`);
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};

const getCardById = async (id) => {
	try {
		const response = await axios.get(`http://localhost:4000/getCard`, { params: { id } });
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};

const addCard = async (card) => {
	try {
		const response = await axios.post(`http://localhost:4000/addCard`, { card, withCredentials: true });
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
}

const cardsService = {
	getAllCards,
	getCardById,
	addCard
};

export default cardsService;