import axios from 'axios'

const GQL = axios.create({
    baseURL: 'http://35.229.33.47:5000/graphql/?',
    timeout: 60000
})

export default GQL
