<template>
    <div class="nav">
        <v-card
          height="100%"
          width="256"
        >
        <v-navigation-drawer permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Notified
              </v-list-item-title>
              <v-list-item-subtitle>
                v1.0.1
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if="bookList && bookList.length > 0"></v-divider>

          <v-list
            dense
            nav
            v-if="bookList && bookList.length > 0"
          >
            <v-list-item
              v-for="book in bookList"
              :key="book._id"
              @click="$router.push(`/${book._id}`)"
              link
            >
              <v-list-item-icon>
                <v-icon>mdi-book</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ book.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <div class="actions-container">
            <v-btn @click="$router.push('/Add')" class="add-btn" text>
              <v-icon>mdi-plus-circle-outline</v-icon>
              <span class="btn-title">Add Book</span>
            </v-btn>
          </div>

          <v-divider></v-divider>

          <div class="footer">
            <v-switch
              @change="toggleDark()"
              v-model="$vuetify.theme.dark"
              inset
              bottom
              label="Dark mode"
              persistent-hint
            ></v-switch>
          </div>
        </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  mounted() {
    this.$vuetify.theme.dark = JSON.parse(localStorage.getItem('darkMode'));
  },
  computed: {
    dark: {
      get () {
        return JSON.parse(localStorage.getItem('darkMode'))
      },
      set (value) {
        localStorage.setItem('darkMode', value)
      }
    },
    bookList() {
      return this.$store.getters.bookResults;
    }
  },
  methods: {
    toggleDark() {
      this.dark = this.$vuetify.theme.dark
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
}
</script>

<style scoped>
  .nav {
    height: 100%;
  }

  .btn-title {
    margin-left: 5px;
  }

  .actions-container {
    display: flex;
    justify-content: flex-start;
    padding: 5px 0; 
  }

  .footer {
    display: flex;
    margin-left: 15px;
  }
</style>