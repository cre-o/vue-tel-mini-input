# vue-tel-mini-input
International Telephone Input (this is minified version of package vue-tel-input by [Steven](https://github.com/iamstevendao))

## Installation
- **yarn**:
  ```bash
    yarn add vue-mini-tel-input
  ```
- **npm**:
  ```bash
    npm i --save vue-mini-tel-input
  ```

## Usage
- Install as a global component:
    ```javascript
    import Vue from 'vue'
    import VueMiniTelInput from 'vue-mini-tel-input'

    Vue.use(VueMiniTelInput)
    ```

- In your component:
     ```js
     <template>
     ...
        <vue-tel-input v-model="phone"
                       @onInput="onInput"
                       <!-- optional -->
                       :preferredCountries="['us', 'gb', 'ua']">
        </vue-tel-input>
     ...
     <template>
     <script>
     export default {
       data() {
         return {
           phone: '',
         };
       },
       methods: {
         /**
          * @param {string} number
          * the phone number inputted by user, will be formatted along with country code
          * // Ex: inputted: (AU) 0432 432 432
          * // number = '+61432421546'
          *
          * @param {Boolean} isValid
          * @param {string} country
          */
          onInput({ number, isValid, country }) {
            console.log(number, isValid, country);
          },
       },
     }
     </script>
     ```

### Props

  | Property value | Type | Default value | Description |
  | -------------- | ---- | ------------- | ----------- |
  | `defaultCountry` | `string` | `''` | Default country, will override the country fetched from IP address of user |
  | `disabledFetchingCountry` | `Boolean` | false | Disable fetching current country based on IP address of user |
  | `preferredCountries` | `Array` | `[]` | Preferred countries list, will be on top of the dropdown. ie `['AU', 'BR']` |
  | `disabled` | `Boolean` | `false` | Disable input field |
  | `placeholder` | `string` | Enter a phone number | Placeholder for the input |
  | `required` | `Boolean` | `false` | Required property for HTML5 required attribute |

### Events

  | Property value | Arguments | Description |
  | -------------- | --------- | ----------- |
  | `onInput` | `Object` | Fires when the input changes with the argument is the object includes `{ number, isValid, country }` |
  | `onBlur` |  | Fires on blur event |

## Highlights & Credits
- Vue app created by [vue-cli](https://github.com/vuejs/vue-cli).
- Telephone Number parsing, validation by [libphonenumber-js](https://catamphetamine.github.io/libphonenumber-js/).
- Country Codes data from [intl-tel-input](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/data.js).
- Country Flags by [behdad/region-flags](https://github.com/behdad/region-flags).
- [Boostrap-Vue](https://bootstrap-vue.js.org/docs/).
- User's Location by [get-json](https://www.npmjs.com/package/get-json) and [ipifo.io](https://ipinfo.io/json)

## Demo Usage

```bash

# install dependencies
$ yarn/npm install

# compile demo for development
$ yarn/npm dev

# open Browser and start serve in demo
$ yarn/npm demo:open

# compile dist demo
$ yarn/npm dist:demo

# compile dist
$ yarn/npm dist

```

## Contributors
- [mikob](https://github.com/mikob) for super awesome work to [remove the bootstrap dependency](https://github.com/EducationLink/vue-tel-input/pull/13).
- [kalcifield](https://github.com/kalcifield) for helping make the input [preload with a phone number](https://github.com/EducationLink/vue-tel-input/pull/8).

made with &#x2764; by [Steven](https://github.com/iamstevendao) and [Sergey](https://github.com/cre-o).
