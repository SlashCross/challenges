<template>
  <section>
    <sui-header size="large" text-align="center" class="dog-name">{{selectedName}}</sui-header>
    <sui-image :src="dogImg" size="medium" class="boxed" centered rounded />
  </section>
</template>

<script>

export default {
  name: 'ImageDog',
  props: ['selectedBreed', 'selectedName'],
  watch: {
    selectedBreed: function (breedName) {
      this.get_img(breedName)
    },
  },
  data() {
    return {
      dogImg: 'https://www.dhresource.com/0x0s/f2-albu-g5-M00-0F-27-rBVaJFiid_KAWQTEAACJzY-3dS4814.jpg/venda-quente-para-o-amendoim-snoopy-amor.jpg',
    }
  },
  methods: {
    get_img(breedName) {
      const vm = this

      const payload = {
        lowerBreedName: breedName.toLowerCase(),
      }

      this.$store.dispatch('Dog/GET_DOG_IMAGE', payload)
        .then((_response) => {
          vm.dogImg = _response
        })
    },
  },
}
</script>


<style scoped>

  .dog-name.dog-name {
    font: 2em var(--font);
    color: var(--font-color);
  }

  .boxed{
    box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.75);
  }

</style>
