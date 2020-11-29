<template>
  <div class="container">
    <h1 class="display-3">{{ msg }}</h1>
    <div v-if="error" class="mt-5">
      <!-- when api gives an error -->
      <h3 class="text-danger">{{ error }}</h3>
    </div>
    <div v-else-if="currencies" class="mt-5">
        <h4 class="text-success mb-4">
          Found {{ currencies.length }} cryptocurrencies
        </h4>
        <div id="currencies">
          <!-- list of repositories found -->
          <ol>
            <li v-for="(currency, index) in displayedCurrencies" :key="index">
              <h6
                data-toggle="tooltip"
                data-placement="right"
                :title="currency.description"
                v-on:click="toggleCurrencyDetail(currency.id, index)"
                class="currency-title"
              >
                {{ currency.name }}
              </h6>
              <!-- <CryptoDetail class="currency_description" :id="'currency_desc_' + index" :currency="currency" /> -->
            </li>
          </ol>
        </div>
        <!-- <NavPagination :page="page" :pages="pages" /> -->
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
            </li>
            <li class="page-item">
              <button type="button" class="page-link" v-for="(pageNumber,index) in pages.slice(page-1, page+5)" :key="index" @click="page = pageNumber"> {{pageNumber}} </button>
            </li>
            <li class="page-item">
              <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
            </li>
          </ul>
        </nav>
    </div>
    <div v-else class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
// import CryptoDetail from "./CryptoDetail.vue";
// import NavPagination from "./NavPagination.vue";

export default {
  name: "Home",
  props: {
    msg: String,
  },
  data: () => {
    return {
      currencies: null,
      error: null,
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  components: {
    // CryptoDetail,
    // NavPagination
  },
  methods: {
    async load_currencies() {
      // fetches the crypto currencies through coinranking api
      this.currencies = null;
      let response = await fetch(
        `https://api.coinranking.com/v1/public/coins/?limit=100`
      );
      if (response.status !== 200) {
        // when no data found
        this.error = "Something went wrong";
      } else {
        let data = await response.json();
        this.currencies = data['data']['coins']
        this.error = null;
        document.title = "cryptocurrencies";
      }
    },
    toggleCurrencyDetail(repo_id, index) {
      // hides/shows the description
      var x = document.querySelector("#currency_desc_" + index);
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    },
    setPages () {
      let numberOfPages = Math.ceil(this.currencies.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
      }
    },
    paginate (currencies) {
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return  currencies.slice(from, to);
    }
  },
  computed: {
    displayedCurrencies () {
      return this.paginate(this.currencies);
    }
  },
  watch: {
    currencies () {
      this.setPages();
    }
  },
  created() {
    this.load_currencies()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}

#currencies {
  text-align: left;
}

li::marker {
  color: red;
}

a {
  color: #42b983;
}
</style>
