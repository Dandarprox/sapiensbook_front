import axios from 'axios'

const GQL = axios.create({
    baseURL: 'http://35.227.50.158/graphql/?',
    timeout: 60000
})

export default GQL
