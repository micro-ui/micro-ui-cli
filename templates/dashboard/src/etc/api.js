import { route } from 'preact-router'
import { userStore, notificationsStore } from '../state/'

const DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

class Api {

    baseUrl = process.env.PREACT_APP_API_URL

    find(endpoint, options) {
        return this._request(endpoint, 'GET', null, options)
    }

    post(endpoint, body, options) {
        return this._request(endpoint, 'POST', body, options)
    }

    create(endpoint, body, options) {
        return this.post(endpoint, body, options)
    }

    put(endpoint, body, options) {
        return this._request(endpoint, 'PUT', body, options)
    }

    update(endpoint, body, options) {
        return this.put(endpoint, body, options)
    }

    delete(endpoint, options) {
        let defaultOptions = {
            parseResponse: false,
        }

        return this._request(endpoint, 'DELETE', null, Object.assign({}, defaultOptions, options))
    }

    _request(endpoint, method = 'GET', body = null, options = {}) {
        let url = this._constructApiUrlFromEndpoint(endpoint)
        let accessToken = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null
        let requestOptions = {
            method,
            headers: options.headers || DEFAULT_HEADERS,
        }

        if (accessToken) requestOptions.headers['Authorization'] = `Bearer ${accessToken}`

        if (body) requestOptions.body = JSON.stringify(body)

        if ('parseResponse' in options && options.parseResponse === false) {
            return fetch(url, requestOptions)
                .then(response => this._catchForbiddenRequests(response))
                .then(response => {
                    if (!response.ok) throw response.statusText
                    return response
                })
        } else {
            return fetch(url, requestOptions)
                .then(response => this._catchForbiddenRequests(response))
                .then(response => this._parseJSON(response))
                .then(response => {
                    if (!response.ok) throw response.payload
                    return response.payload
                })
        }
    }

    _catchForbiddenRequests(response) {
        if (response.status === 403) {
            route('/login')
            userStore.logout()
            notificationsStore.showNotification('Sorry, you have to login to view this page')
        }

        return response
    }

    _constructApiUrlFromEndpoint(endpoint) {
        return `${this.baseUrl}/${endpoint}`
    }

    _parseJSON(response) {
        return new Promise(resolve => response.json()
            .then(payload => resolve({
                status: response.status,
                ok: response.ok,
                payload,
            })))
    }

}

const api = new Api()

export default api
