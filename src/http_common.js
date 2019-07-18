import axios from 'axios'

const GQL = axios.create({
    baseURL: 'http://35.232.195.188/graphql/?',
    timeout: 60000
})

export default GQL
