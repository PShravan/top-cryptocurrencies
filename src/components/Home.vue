<template>
  <div class="container">
    <h1 class="display-3">{{ msg }}</h1>
    <div v-if="error" class="mt-5">
      <!-- when api gives an error -->
      <h3 class="text-danger">{{ error }}</h3>
    </div>
    <div v-else-if="currencies" class="mt-5">
        <Table :items="currencies" />
              <!-- <CryptoDetail class="currency_description" :id="'currency_desc_' + index" :currency="currency" /> -->

    </div>
    <div v-else class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
     
  </div>
</template>

<script>
// import CryptoDetail from "./CryptoDetail.vue";
// import NavPagination from "./NavPagination.vue";
import Table from './Table.vue';

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
    Table,
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
