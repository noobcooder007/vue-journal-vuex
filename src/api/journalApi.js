import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-bec3a-default-rtdb.firebaseio.com'
})

export default journalApi