<template>
    <div class="">
        <v-card class="card" elevation="2">
            <div class="form-title">Add new Book</div>
            <div class="form">
                <div class="line-1">
                    <v-text-field
                        v-model="form.bookName"
                        class="form-field"
                        label="Book Name"
                        placeholder="Math 101 - Geometry"
                        append-icon="mdi-format-text"
                        outlined
                        :diabled="loading"
                    ></v-text-field>
                    <v-text-field
                        v-model="form.bookCategory"
                        class="form-field"
                        label="Book Category"
                        placeholder="Accounting"
                        append-icon="mdi-shape"
                        outlined
                        :diabled="loading"
                    ></v-text-field>
                </div>
            </div>
            <v-divider></v-divider>
             <v-card-actions style="margin-top: 10px">
                <v-btn @click="saveBook()" color="primary" :disabled="loading || !form.bookName || !form.bookCategory" :loading="loading">
                    <v-icon style="margin-right: 5px">mdi-content-save</v-icon>
                    Save Book
                </v-btn>
                <v-btn @click="$router.push('/')" color="error" :diabled="loading">
                    <v-icon style="margin-right: 5px">mdi-cancel</v-icon>
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import BookService from '@/services/BookService';

export default {
    data() {
        return {
            form: {
                bookName: null,
                bookCategory: null
            }
        }
    },
    computed: {
        loading: {
            get () {
                return this.$store.getters.loading;
            },
            set (value) {
                this.$store.commit('loading', value);
            }
        },
    },
    methods: {
        async saveBook() {
            this.loading = true;
            try {

                const res = await BookService.postBook({
                    name: this.form.bookName,
                    category: this.form.bookCategory,
                    notes: []
                });
                
                this.$router.push(`/${res._id}`);

                this.$toastr.s('Sucessfully added Book!');

            } catch (error) {
                console.error('Error while trying to save neew Book!', error)
            } finally {
                this.loading = false;
                await BookService.updateBooks();
            }
        }
    }
}
</script>

<style scoped>
    .card {
        padding: 15px;
    }
    .form-title {
        margin-top: 7px;
        margin-bottom: 15px;
        font-size: 20px;
        font-weight: bold;
    }
    .form-field {
        margin-right: 5px !important;
    }
    .line-1 {
        display: flex;
        justify-content: space-between;
        max-width: 750px;
    }
</style>