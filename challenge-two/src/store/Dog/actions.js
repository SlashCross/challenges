import axios from 'axios'


export default {
  GET_DOG_BREED() {
    return new Promise((resolve) => {
      axios.get('https://dog.ceo/api/breeds/list/all')
        .then((_response) => {
          const data = _response.data.message
          const dogs = []
          Object.keys(data).forEach((key) => {
            const breed = key[0].toUpperCase() + key.substring(1)
            if (data[key].length) {
              data[key].forEach((subBreed) => {
                subBreed = subBreed[0].toUpperCase() + subBreed.substring(1)
                dogs.push({
                  key: `${breed}-${subBreed}`,
                  value: `${breed}-${subBreed}`,
                  text: `${subBreed} ${breed}`,
                })
              })
            } else {
              dogs.push({
                key: breed,
                value: breed,
                text: breed,
              })
            }
          })
          resolve(dogs)
        })
    })
  },

  GET_DOG_IMAGE({}, _payload) {
    return new Promise((resolve) => {
      const name = _payload.lowerBreedName.split('-')
      axios.get(`https://dog.ceo/api/breed/${name.join('/')}/images/random`)
        .then((_response) => {
          resolve(_response.data.message)
        })
    })
  },
}
