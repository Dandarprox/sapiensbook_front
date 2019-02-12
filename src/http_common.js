import axios from 'axios'

const GQL = axios.create({
    baseURL: 'http://35.237.14.145/graphql/?',
    timeout: 60000
})

export default GQL
