<template>
	<form novalidate class="md-layout" @submit.prevent="validateItem">
		<md-card class="md-layout-item md-size-100 md-small-size-100">
			<md-card-content>
				<div class="md-layout md-gutter">
					<div class="md-layout-item md-small-size-100">
						<md-field :class="getValidationClass('name')">
							<label for="name">Name</label>
							<md-input name="name" id="name" autocomplete="given-name" v-model.lazy="form.name" :disabled="sending" />
							<span class="md-error" v-if="!$v.form.name.required">The name is required</span>
							<span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
						</md-field>
					</div>
				</div>
				<div class="md-layout md-gutter">
					<div class="md-layout-item md-small-size-100">
						<md-field :class="getValidationClass('quantity')">
							<label for="quantity">Quantity</label>
							<md-input type="number" id="quantity" name="quantity" autocomplete="quantity" v-model.number="form.quantity" :disabled="sending" />
							<span class="md-error" v-if="!$v.form.quantity.required">The quantity is required</span>
							<span class="md-error" v-else-if="!$v.form.quantity.maxlength">Invalid quantity</span>
						</md-field>
					</div>
				</div>
				<div class="md-layout md-gutter">
					<div class="md-layout-item md-small-size-100">
						<md-field :class="getValidationClass('price')">
							<label for="price">Price</label>
							<md-input type="number" id="price" name="price" autocomplete="price" v-model.number="form.price" :disabled="sending" />
							<span class="md-error" v-if="!$v.form.price.required">The price is required</span>
							<span class="md-error" v-else-if="!$v.form.price.maxlength">Invalid price</span>
						</md-field>
					</div>
				</div>
			</md-card-content>
			<md-progress-bar md-mode="indeterminate" v-if="sending" />
			<md-card-actions class="md-alignment-left">
				<md-button type="submit" class="md-raised" :disabled="sending">add item</md-button>
			</md-card-actions>
		</md-card>
		<md-snackbar :md-active.sync="itemSaved">The item {{ lastItem }} was saved with success!</md-snackbar>
	</form>
</template>

<script>
	import { validationMixin } from 'vuelidate';
	import { required, minLength, maxLength } from 'vuelidate/lib/validators';
	import { EventBus } from './../event-bus.js';
	
	export default {
    	name: 'FormValidation',
    	mixins: [validationMixin],
		data: () => ({
			form: {
				name: null,
				quantity: null,
				price: null
			},
			itemSaved: false,
			sending: false,
			lastItem: null
		}),
		validations: {
			form: {
				name: {
					required,
					minLength: minLength(3)
				},
				quantity: {
					required,
					maxLength: maxLength(5)
				},
				price: {
					required,
					maxLength: maxLength(5)
				}
			}
		},
		methods: {
			getValidationClass (fieldName) {
				const field = this.$v.form[fieldName]
				if (field) {
					return {
						'md-invalid': field.$invalid && field.$dirty
					}
				}
			},
			clearForm () {
				this.$v.$reset()
				this.form.name = null
				this.form.quantity = null
				this.form.price = null
			},
			saveItem () {
				this.sending = true
				window.setTimeout(() => {
					this.lastItem = `${this.form.name}`;
					EventBus.$emit('add-new-item', this.form);
					this.itemSaved = true;
					this.sending = false;
					this.clearForm();
				}, 500)
			},
			validateItem () {
				this.$v.$touch()
				if (!this.$v.$invalid) {
					this.saveItem()
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	button.md-raised {
		background-color: #3D867B !important;
		color: #fff !important;
	}
	.md-card {
		box-shadow: none;
	}
</style>
