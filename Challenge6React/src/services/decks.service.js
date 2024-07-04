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

const updateDeck = async (id, deckName, deckCards) => {
	try {
		const response = await axios.put(`http://localhost:4000/updateDeck`, { id, deckName, deckCards, withCredentials: true });
		return response.data;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};

const addDeck = async (id, deckName, deckFaction, deckCards) => {
    try {
        const response = await axios.post(`http://localhost:4000/addDeck`, { id, deckName, deckFaction, deckCards, withCredentials: true });
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