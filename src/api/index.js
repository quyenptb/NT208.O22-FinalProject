import axios from "axios";

const URL = 'http://localhost:3000';

export const fetchCards = async () => axios.get(`${URL}/cards`);
    

