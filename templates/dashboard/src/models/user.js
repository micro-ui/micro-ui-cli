import { observable, computed } from 'mobx'

export default class User {

    @observable id
    @observable username
    @observable firstName
    @observable lastName
    @observable email
    @observable groups = []

    constructor(props) {
        Object.assign(this, props)
    }

    @computed get displayName() {
        return this.firstName ? `${this.firstName} ${this.lastName}` : this.username
    }

    hasRole(roleName) {
        return this.groups.findIndex(group => group.name === roleName) > -1
    }

}