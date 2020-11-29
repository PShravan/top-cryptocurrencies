<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      class="my-4"
      show-empty
      bordered
      hover
      head-variant="dark"
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
     <template #cell(iconUrl)="data">
        <b-img-lazy :src="data.item.iconUrl" fluid alt="currency image" height=30 width=30></b-img-lazy>
      </template>
    <template #cell(name)="data">
      <b-link :href="data.item.websiteUrl" target="_blank">{{ data.item.name }}</b-link>
      </template>
    </b-table>
  </b-container>
</template>

<script>
  export default {
    name: 'Table',
    props: {
        items: Array,
    },
    data() {
      return {
        fields: [
          { key: 'rank', label: 'Rank', sortable: true, sortDirection: 'desc' },
          { key: 'iconUrl', label: 'image', image: true},
          { key: 'name', label: 'Currency Name', sortable: true, sortDirection: 'desc' },
          { key: 'symbol', label: 'Symbol', sortable: true, sortDirection: 'desc' },
          { key: 'price', label: 'Price', sortable: true, sortDirection: 'desc' },
          { key: 'change', label: 'Price change', sortable: true, sortDirection: 'desc' },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25 , 50, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: []
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>