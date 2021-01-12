<template>
  <v-app dark>
      <div class="app-container">
        <navigation style="position: fixed"></navigation>
        <div class="ghost-nav"></div>
        <div class="content-container">
          <v-progress-linear
          v-if="loading"
          indeterminate
          color="pink"
          ></v-progress-linear>
          <perfect-scrollbar>
            <div class="router-container">
                <router-view/>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
  </v-app>
</template>

<script>
import BookService from '@/services/BookService';
import Navigation from './components/Nav'

export default {
  name: 'App',

  components: {
    Navigation
  },

  async mounted() {

    document.title = 'Notified - v1.0.1'

    this.$toastr.defaultPosition = "toast-top-right";
    this.$toastr.defaultStyle = { "opacity": "1", "font-family": "Roboto" };
    this.$toastr.defaultTimeout = 3000;
    this.$toastr.defaultProgressBar = false;

    await BookService.updateBooks();
  },

  data: () => ({
    // loading: false
  }),

  computed: {
    loading () {
      return this.$store.getters.loading;
    }
  },
};
</script>
<style>
  html {
    overflow: hidden !important;
  }
  .app-container {
    display: flex;
    height: 100%;
  }
  .content-container {
    width: 100%;
  }
  .ghost-nav {
    width: 256px;
  }
  .router-container {
    max-width: 1300px;
    margin: 50px auto;
    max-height: 850px;
  }
</style>
