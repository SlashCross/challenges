<template>
  <section>
    <div class="row">

      <div class="success" v-if="storedData">
        <p>The information was last saved at:</p>
        <p>{{ form.dateTime }}</p>
      </div>

      <sui-form @submit.prevent="saveForm">

        <sui-form-field>
          <label for="name" class="padding-fix">What would you call yout dog?</label>
          <input id="name" type="text" v-model="form.name" placeholder="Name">
        </sui-form-field>

        <sui-form-field>
          <sui-dropdown
            :options="breeds"
            placeholder="Select a breed"
            search
            selection
            v-model="form.breed"
          />
        </sui-form-field>

        <sui-form-field>
          <sui-dropdown text="Choose your font" selection>
            <sui-dropdown-menu>
              <sui-dropdown-item
                v-for="(value, index) in fonts"
                @click="fontPicker(value)"
                class="webfonts"
                :key="index"
                :style="`font-family: ${value}`">
                {{ form.name.length ? form.name : value }}
              </sui-dropdown-item>
            </sui-dropdown-menu>
          </sui-dropdown>
        </sui-form-field>

        <sui-form-field>
          <sui-dropdown
            :options="colors"
            placeholder="Choose your color"
            selection
            v-model="form.color"
          />
        </sui-form-field>

        <sui-button type="submit" floated="right" positive content="Save" />

      </sui-form>

    </div>
  </section>
</template>


<script>
const moment = require('moment')

export default {
  name: 'SelectDog',
  props: ['userSelectedBreed', 'userSelectedName'],
  data() {
    return {
      form: {
        name: 'Snoopy',
        breed: null,
        color: null,
        font: null,
        dateTime: null,
      },
      storedData: false,
      breeds: [],
      fonts: ['Permanent Marker', 'Poiret One', 'Architects Daughter', 'Alice', 'Nothing You Could Do'],
      colors: [
        {
          key: 'Blue',
          text: 'Blue',
          value: '#88d8fc',
          label: { color: 'blue', empty: true, circular: true },
        },
        {
          key: 'Yellow',
          text: 'Yellow',
          value: '#ffea08',
          label: { color: 'yellow', empty: true, circular: true },
        },
        {
          key: 'Orange',
          text: 'Orange',
          value: '#ff8400',
          label: { color: 'orange', empty: true, circular: true },
        },
        {
          key: 'Red',
          text: 'Red',
          value: '#f50529',
          label: { color: 'red', empty: true, circular: true },
        },
        {
          key: 'Pink',
          text: 'Pink',
          value: '#f50579',
          label: { color: 'pink', empty: true, circular: true },
        },
      ],
    }
  },
  beforeMount() {
    const vm = this
    this.$store.dispatch('Dog/GET_DOG_BREED')
      .then((_response) => {
        vm.breeds = _response
      })
  },
  mounted() {
    this.checkStoredData()
  },
  watch: {
    'form.name': function (val) {
      if (val.length) {
        this.userSelectedName(val)
      } else {
        this.userSelectedName('Snoopy')
      }
    },
    'form.breed': function (val) {
      this.userSelectedBreed(val)
    },
    'form.color': function (val) {
      document.documentElement.style.setProperty('--font-color', val)
      this.form.color = val
    },
  },
  methods: {
    fontPicker(val) {
      document.documentElement.style.setProperty('--font', val)
      this.form.font = val
    },

    saveForm() {
      const date = moment().format('MMMM Do YYYY, h:mm:ss a')
      this.form.dateTime = date

      localStorage.setItem('form', JSON.stringify(this.form))
      this.storedData = true
    },

    checkStoredData() {
      const vm = this
      const form = localStorage.getItem('form') ? JSON.parse(localStorage.getItem('form')) : {}

      Object.keys(form).forEach((key) => {
        vm.form[key] = form[key]
      })

      vm.fontPicker(vm.form.font)

      if (form.dateTime) {
        vm.dateTime = vm.form.dateTime
        vm.storedData = true
      }
    },
  },
}
</script>


<style scoped>

  .padding-fix{
    padding-left: 5px;
  }
  .success{
    text-align: center;
    margin: 20px 0px;
  }

</style>
