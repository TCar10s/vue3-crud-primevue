import axios from "axios"

const BASE_API = "http://localhost:3000"

export function getTasks() {
    return axios.get(`${BASE_API}/tasks`)
}

export function createTask(task) {
    return axios.post(`${BASE_API}/tasks`, task)
}

export function updateTask(task) {
    return axios.put(`${BASE_API}/tasks/${task.id}`, task)
}

export function deleteTask(id) {
    return axios.delete(`${BASE_API}/tasks/${id}`)
}