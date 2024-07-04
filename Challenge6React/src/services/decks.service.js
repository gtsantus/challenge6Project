import axios from "axios";

const getDecks = async (id) => {
    try {
		const response = await axios.get(`http://localhost:4000/getDecks`, { params: { id }, withCredentials: true });
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};

const updateDeck = async (id, name, cards, faction) => {
	try {
		const response = await axios.put(`http://localhost:4000/updateDeck`, { id, name, cards, faction}, { withCredentials: true });
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};

const addDeck = async (id, name, faction, cards) => {
	try {
		const response = await axios.post(`http://localhost:4000/addDeck`, { id, name, faction, cards }, { withCredentials: true });
        return response.data;
    } catch (e) {
        console.log(e.message);
        return e;
    }
};
 
const deleteDeck = async (id, deckId) => {
	try {
		const response = await axios.delete(`http://localhost:4000/deleteDeck`, { params: { id, deckId }, withCredentials: true });
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};

const decksService = {
	getDecks,
    updateDeck,
	addDeck,
	deleteDeck
};

export default decksService;