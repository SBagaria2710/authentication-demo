import { ref, computed } from 'vue'

export const api = axios.create({
    baseURL: 'http://localhost:3000/' // Local Backend
})

export const useApi = (endpoint) => {
    const loading = ref(true)
    const data = ref()
    const error = ref()

    const errorMessage = computed(() => {
        if (error.value) {
            return error.value.message
        }
    })

    const errorDetails = computed(() => {
        if (error.value && error.value.response) {
            return error.value.response.data.message
        }
    })

    const errorFields = computed(() => {
        if (error.value && Array.isArray(error.value.response.data.message)) {

            return (error.value.response.data.message).reduce((acc, msg) => {
                let [field] = msg.split(' ')

                if (!acc[field]) {
                    acc[field] = []
                }

                acc[field].push(msg)

                return acc
            }, {}) // eg. { email: [ 'email is required' ] }
        }
    })

    const postUser = (payload) => {
        loading.value = true
        error.value = undefined

        return api.post(endpoint, payload)
            // Update data
            .then(res => data.value = res.data)
            .catch(e => {
                // If anything goes wrong, update the error variable
                error.value = e

                throw e
            })
            // Finally set loading to false
            .finally(() => loading.value = false)
    }

    const getDashboard = (payload) => {
        loading.value = true
        error.value = undefined

        return api.get(endpoint)
            // Update data
            .then(res => data.value = res.data)
            .catch(e => {
                // If anything goes wrong, update the error variable
                error.value = e

                throw e
            })
            // Finally set loading to false
            .finally(() => loading.value = false)
    }

    return {
        loading, data, error,
        errorMessage, errorDetails, errorFields,
        postUser, getDashboard
    }
}
