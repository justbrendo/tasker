import axios from "axios";
import PropTypes from "prop-types";

const API_URL = "http://localhost:8080/tasks"

export async function saveTask(task) {
    console.log(API_URL);
    return await axios.post(API_URL, task);
}

export async function getTasks(page = 0, size = 10) {
    console.log(API_URL);
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getTask(id) {
    console.log(API_URL);
    return await axios.get(`${API_URL}/${id}`)
}

getTasks.propTypes = {
    page: PropTypes.oneOfType([PropTypes.number]),
    size: PropTypes.oneOfType([PropTypes.number])
}