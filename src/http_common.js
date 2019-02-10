import axios from 'axios'

const GQL = axios.create({
    baseURL: 'http://35.243.152.223/graphql/?',
    timeout: 60000
})

export default GQL
