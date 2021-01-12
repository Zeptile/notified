import Repository from './Repository';

const ressource = '/notes';

export default {
    postNote(note, bookId) {
        return Repository.post(`${ressource}/${bookId}`, note);
    },
    updateNote(note, bookId) {
        return Repository.put(`${ressource}/${bookId}`, note);
    },
    deleteNote(note, bookId) {
        return Repository.put(`${ressource}/delete/${bookId}`, note);
    }
}