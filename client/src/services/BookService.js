/* import Repository from './Repository';
import store from '@/store';

const ressource = '/books';

export default {
    getBooks() {
        return Repository.get(`${ressource}`);
    },
    getBooksById(id) {
        return Repository.get(`${ressource}/${id}`);
    },
    postBook(book) {
        return Repository.post(`${ressource}`, book);
    },
    updateBook(book) {
        return Repository.put(`${ressource}`, book);
    },
    deleteBook(bookId) {
        return Repository.delete(`${ressource}/${bookId}`);
    },
    async updateBooks() {
        try {
            //store.commit('loading', true);
            const books = await this.getBooks();
            console.log(books.data)
            store.commit('bookResults', books.data);
        } catch (error) {
            store.commit('bookResults', []);
            console.error('Error while trying to load books!', error);
        } finally {
            // store.commit('loading', false);
        }
    }
}
 */
import Vue from 'vue'
import store from '@/store';

const baseURL = 'http://localhost:9982/api';

class BookService {
    ressource = 'books';

    async getBooks() {
        return Vue.http.get(`${baseURL}/${this.ressource}`)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async getBooksById(id) {
        return Vue.http.get(`${baseURL}/${this.ressource}/${id}`)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async postBook(book) {
        return Vue.http.post(`${baseURL}/${this.ressource}`, book)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async updateBook(book) {
        return Vue.http.put(`${baseURL}/${this.ressource}`, book)
        .then(result => result.json())
        .catch(err => {
            throw err;
        })
    }

    async deleteBook(bookId) {
        return Vue.http.delete(`${baseURL}/${this.ressource}/${bookId}`)
        .then(result => result.json())
        .catch(err => {
            throw err;
        });
    }

    async updateBooks() {
        try {
            //store.commit('loading', true);
            const books = await this.getBooks();
            store.commit('bookResults', books);
        } catch (error) {
            store.commit('bookResults', []);
            console.error('Error while trying to load books!', error);
        } finally {
             //store.commit('loading', false);
        }
    }
}

const BookServiceSingleton = new BookService();
Object.freeze(BookServiceSingleton);

export default BookServiceSingleton;