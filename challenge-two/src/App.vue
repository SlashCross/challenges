<template>
  <div id="app">
    <div class="ui grid">
      <div class="row">
        <div class="sixteen wide column">
          <ImageDog :selectedBreed="dogBreed" :selectedName="dogName"/>
          <FormDog :userSelectedBreed="userSelectedBreed" :userSelectedName="userSelectedName"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormDog from './components/Dog/FormDog'
import ImageDog from './components/Dog/ImageDog'

export default {
  name: 'App',
  components: {
    FormDog,
    ImageDog,
  },
  data() {
    return {
      dogBreed: '',
      dogName: 'Snoopy',
    }
  },
  methods: {
    userSelectedBreed(breed) {
      this.dogBreed = breed
    },
    userSelectedName(name) {
      this.dogName = name
    },
  },
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Alice|Architects+Daughter|Nothing+You+Could+Do|Permanent+Marker|Poiret+One&display=swap');

  html body {
    background-color: #f9f9f9;
    max-width: 330px;
    margin: auto;
    margin-left: 38%;
  }

  #app {
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
