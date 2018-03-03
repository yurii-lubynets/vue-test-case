<template>
    <div>
        <md-table v-model="searched">
            <md-table-toolbar>
                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by name..." v-model.trim="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>
            <md-table-empty-state md-label="No items found"></md-table-empty-state>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Quantity">{{ item.quantity }}</md-table-cell>
                <md-table-cell md-label="Price">{{ item.price }}</md-table-cell>
                <md-table-cell>
                    <md-button  v-on:click="deleteItem(item)" class="md-icon-button">
                        <md-icon>delete</md-icon>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>     
        <p>Summary: {{ total }}</p>   
    </div>
</template>

<script>
    import { EventBus } from './../event-bus.js';

    const toLower = (text) => text.toString().toLowerCase();

    const searchByName = (items, term) => {
        if (term) {
            return items.filter(item => toLower(item.name).includes(toLower(term)))
        }
        return items
    }

    const totals = (items) => {
        if (!items) {
            return 0
        } else {
            return items
            .map(item => item.quantity*item.price)
            .reduce((total, item) => total + item, 0)
        }
    }

    export default {
        name: 'TableSearch',
        data: () => ({
            search: null,
            searched: [],
            items: []
        }),
        methods: {
            searchOnTable () {
                this.searched = searchByName(this.items, this.search);
            },
            deleteItem (index) {
                this.searched = this.searched.filter(item => item !== index);
            },
            addItem(item) {
                let newItem = {
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }
                this.searched.push(newItem);
            }
        },
        computed: {
            total: function () {
                return totals(this.searched);
            },
        },
        created () {
            this.searched = this.items;
            EventBus.$on('add-new-item', (item) => this.addItem(item));
        }
    }
</script>

<style lang="less" scoped>
    .md-table.md-theme-default .md-table-head {
        color: #000;
    }
</style>
