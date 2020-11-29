<template>
  <div class="container">
    <h1 class="display-5">{{ msg }}</h1>
    <div v-if="error" class="mt-5">
      <!-- when api gives an error -->
      <h3 class="text-danger">{{ error }}</h3>
    </div>
    <div v-else-if="currencies" class="mt-5">
        <Table :items="currencies" />
    </div>
    <div v-else class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
     
  </div>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  name: "Home",
  data: () => {
    return {
      msg: 'The top 100 crypto currencies',
      error: null,
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  components: {
    Table,
  },
  methods: {
    async load_currencies() {
      // fetches the crypto currencies through coinranking api
      let response = await fetch(
        `https://api.coinranking.com/v1/public/coins/?limit=100`
      );
      if (response.status !== 200) {
        // when no data found
        this.error = "Something went wrong";
      } else {
        let json_data = await response.json();
        this.$store.commit('set_data', json_data['data']['coins'])
        // this.$store.dispatch('set_data', {
        //   data: json_data['data']['coins']
        // })
        this.error = null;
        document.title = "cryptocurrencies";
      }
    }
  },
  computed: {
    currencies () {
      return this.$store.state.currencies
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
</style>
