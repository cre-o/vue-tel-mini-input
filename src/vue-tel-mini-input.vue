<template>
    <input ref="input"
           v-model="phone"
           type="tel"
           :placeholder="placeholder"
           :state="state"
           :formatter="format"
           :disabled="disabled"
           @blur="onBlur"
           @input="onInput"
           :required="required"
           @focus="onFocus">
</template>

<script>
import { format, asYouType, isValidNumber } from 'libphonenumber-js';
import allCountries from './assets/all-countries';
import getCountry from './assets/default-country';

export default {
  name: 'vue-tel-mini-input',
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: 'Enter a phone number',
    },
    disabledFetchingCountry: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    preferredCountries: {
      type: Array,
      default: () => ([]),
    },
    invalidMsg: {
      default: "",
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    defaultCountry: {
      // Default country code, ie: 'AU'
      // Will override the current country of user
      type: String,
      default: '',
    },
  },
  mounted() {
    this.initializeCountry();
  },
  created() {
    if (this.value) {
      this.phone = this.value
    }
  },
  data() {
    return {
      phone: '',
      allCountries,
      activeCountry: { iso2: '' }
    };
  },
  computed: {
    mode() {
      if (!this.phone) {
        return '';
      }
      if (this.phone[0] === '+') {
        return 'code';
      }
      if (this.phone[0] === '0') {
        return 'prefix';
      }
      return 'normal';
    },
    sortedCountries() {
      // Sort the list countries: from preferred countries to all countries
      const preferredCountries = this.preferredCountries
        .map(country => this.findCountry(country))
        .filter(Boolean)
        .map(country => ({ ...country, preferred: true }));

      return [...preferredCountries, ...allCountries];
    },
    formattedResult() {
      // Calculate phone number based on mode
      if (!this.mode || !this.allCountries) {
        return '';
      }
      let phone = this.phone;
      if (this.mode === 'code') {
        // If user manually type the country code
        const formatter = new asYouType();// eslint-disable-line
        formatter.input(this.phone);

        // Find inputted country in the countries list
        this.activeCountry = this.findCountry(formatter.country) || this.activeCountry;
      } else if (this.mode === 'prefix') {
        // Remove the first '0' if this is a '0' prefix number
        // Ex: 0432421999
        phone = this.phone.slice(1);
      }
      return format(phone, this.activeCountry && this.activeCountry.iso2, 'International');
    },
    state() {
      return isValidNumber(this.formattedResult);
    },
    response() {
      // If it is a valid number, returns the formatted value
      // Otherwise returns what it is
      const number = this.state ? this.formattedResult : this.phone;
      return {
        number,
        isValid: this.state,
        country: this.activeCountry,
      };
    },
  },
  watch: {
    state(value) {
      if (value && this.mode !== 'prefix') {
        // If mode is 'prefix', keep the number as user typed,
        // Otherwise format it
        this.phone = this.formattedResult;
      }
    },
    value() {
      this.phone = this.value;
    },
  },
  methods: {
    initializeCountry() {
      /**
       * 1. Use default country if passed from parent
       */
      if (this.defaultCountry) {
        const defaultCountry = this.findCountry(this.defaultCountry);
        if (defaultCountry) {
          this.activeCountry = defaultCountry;
          return;
        }
      }
      /**
       * 2. Use the first country from preferred list (if available) or all countries list
       */
      this.activeCountry = this.findCountry(this.preferredCountries[0]) || allCountries[0];
      /**
       * 3. Check if fetching country based on user's IP is allowed, set it as the default country
       */
      if (!this.disabledFetchingCountry) {
        getCountry().then((res) => {
          this.activeCountry = this.findCountry(res) || this.activeCountry;
          // 4 set the dial code
          if (this.findCountry(res)) {
            this.phone = `+${this.findCountry(res).dialCode}`
          }
        });
      }
    },
    findCountry(iso = '') {
      return allCountries.find(country => country.iso2 === iso.toUpperCase());
    },
    choose(country) {
      this.activeCountry = country;
      this.$emit('onInput', this.response);
    },
    onInput() {
      this.$refs.input.setCustomValidity(this.response.isValid ? '' : this.invalidMsg);
      // Emit input event in case v-model is used in the parent
      this.$emit('input', this.response.number);

      // Emit the response, includes phone, validity and country
      this.$emit('onInput', this.response);
    },
    onBlur() {
      this.$emit('onBlur');
    },
    onFocus(e) {
      setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = 10000 }, 0);
    }
  }
};
</script>
