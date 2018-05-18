import { observable, action, computed } from 'mobx'
import { task } from 'mobx-task'
import api from '../etc/api'
import User from 'src/models/user'

const ACCESS_TOKEN_KEY = 'access_token'
const GENERAL_ERRORS_KEY = 'non_field_errors'

class UserStore {

    @observable user = null
    @observable initialPage = null
    @observable isAuthenticated = false
    refreshTokenTimeout = null
    hasLoggedIn = false

    constructor() {
        if (!this.getStoredAccessToken()) return

        this.isAuthenticated = true
        this.loadUser()
    }

    @task.resolved async login({ username, password }) {
        try {
            let result = await api.post('login', { username, password })

            this.hasLoggedIn = true

            this.setUser(result.user)
            this.setAccessToken(result.access_token)

            this.loadUser()     // fetch the rest of the users data, including roles
        } catch (err) {
            throw err[GENERAL_ERRORS_KEY][0]
        }
    }

    @task async logout() {
        this.hasLoggedIn = false
        this.setAccessToken(null)
        this.setUser(null)
    }

    @task async refreshAccessToken(currentAccessToken) {
        let result = await api.post('login/refresh', {
            token: currentAccessToken,
        })

        if (GENERAL_ERRORS_KEY in result) throw result[GENERAL_ERRORS_KEY][0]

        this.setUser(result.user)
        this.setAccessToken(result.access_token)
    }

    @task async loadUser() {
        let result = await api.find('user')

        this.setUser(result)

        if (!this.hasLoggedIn) {
            let accessToken = this.getStoredAccessToken()
            this.refreshTokenBeforeExpire(accessToken)
        }
    }

    @action setUser(user) {
        this.user = user ? new User(user) : null
    }

    @action setAccessToken(accessToken) {
        if (!accessToken) {
            this.removeAccessToken()
            this.isAuthenticated = false
            return
        }

        this.storeAccessToken(accessToken)
        this.isAuthenticated = true

        this.refreshTokenBeforeExpire(accessToken)
    }

    @action setInitialPage(url) {
        this.initialPage = url
    }

    refreshTokenBeforeExpire(accessToken) {
        let parsedToken = this.parseAccessToken(accessToken)
        let refreshMillis = parsedToken.exp * 1000 - Date.now()

        clearTimeout(this.refreshTokenTimeout)
        this.refreshTokenTimeout = setTimeout(() => {
            this.refreshAccessToken(accessToken)
        }, refreshMillis)
    }

    parseAccessToken(accessToken) {
        if (typeof window === 'undefined') return

        let base64Url = accessToken.split('.')[1]
        let base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(window.atob(base64))
    }

    getStoredAccessToken() {
        if (typeof window === 'undefined') return
        return window.localStorage.getItem(ACCESS_TOKEN_KEY)
    }

    storeAccessToken(accessToken) {
        if (typeof window === 'undefined') return
        window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    }

    removeAccessToken() {
        if (typeof window === 'undefined') return
        window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    }

}

export const userStore = new UserStore()
