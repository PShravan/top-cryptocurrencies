<template>
    <div>
        <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
            <b-col md="6">
                <b-card-img :src="currency.iconUrl" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
                <b-card-body :title="currency.name">
                <b-card-text>
                    {{ currency.description }}
                </b-card-text>
                </b-card-body>
            </b-col>
            </b-row>
        </b-card>
    </div>
</template>
<script>
export default {
    name: "CurrencyDetail",
    props: {
        currency_id: Number
    },
    data: () => {
        return {

        }
    },
    computed: {
        currency(){
            console.log(this.$store.state.currencies);
            return this.$store.state.currencies[this.currency_id]
        }
    },
}
</script>