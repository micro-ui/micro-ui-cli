import { observable, action } from 'mobx'

class Notification {

    @observable text
    @observable type
    @observable autoHideDuration

    constructor(props) {
        Object.assign(this, props)
    }

}

class NotificationsStore {

    @observable notification = {}

    @action showNotification(text, type = 'danger', autoHideDuration = 5000) {
        this.notification = new Notification({ text, type, autoHideDuration })
    }

    @action showSuccess(text, autoHideDuration = 3000) {
        this.showNotification(text, 'primary', autoHideDuration)
    }

    @action hideNotification() {
        this.notification = null
    }

}

export const notificationsStore = new NotificationsStore()