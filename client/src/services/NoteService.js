import Vue from 'vue'

class NoteService {
    baseURL;
    ressource = 'notes';

    constructor() {
        this.baseURL = process.env.VUE_APP_API_ENDPOINT;
    }

    async postNote(note, bookId) {
        return Vue.http.post(`${this.baseURL}/${this.ressource}/${bookId}`, note)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async updateNote(note, bookId) {
        return Vue.http.put(`${this.baseURL}/${this.ressource}/${bookId}`, note)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async deleteNote(note, bookId) {
        return Vue.http.put(`${this.baseURL}/${this.ressource}/delete/${bookId}`, note)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }
}

const NoteServiceSingleton = new NoteService();
Object.freeze(NoteServiceSingleton);

export default NoteServiceSingleton;