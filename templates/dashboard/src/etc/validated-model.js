let VALIDATION_MESSAGES = {
    'required': 'This field is required.',
    'email': 'Must be a valid email address',
    'minLength': 'Must be no fewer than ${checkAgainst} characters',
    'maxLength': 'Must be no more than ${checkAgainst} characters',
}

function validateRequired(fieldValue) {
    return typeof fieldValue !== 'undefined' && fieldValue
}

function validateMinLength(fieldValue, minLength) {
    return !fieldValue || fieldValue.length >= minLength
}

function validateMaxLength(fieldValue, maxLength) {
    return !fieldValue || fieldValue.length <= maxLength
}

function validateEmail(fieldValue) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !fieldValue || emailRegex.test(String(fieldValue).toLowerCase())
}

class Validations {

    validationRules = []

    constructor(fieldName) {
        this._fieldName = fieldName
        this._displayName = fieldName
    }

    displayName(displayName) {
        this._displayName = displayName
        return this
    }

    required() {
        this.validationRules.push({
            check: validateRequired,
            message: VALIDATION_MESSAGES['required'],
        })

        return this
    }

    email() {
        this.validationRules.push({
            check: validateEmail,
            message: VALIDATION_MESSAGES['email'],
        })

        return this
    }

    minLength(minLength) {
        this.validationRules.push({
            check: fieldValue => validateMinLength(fieldValue, minLength),
            checkAgainst: minLength,
            message: VALIDATION_MESSAGES['minLength'],
        })

        return this
    }

    maxLength(maxLength) {
        this.validationRules.push({
            check: fieldValue => validateMaxLength(fieldValue, maxLength),
            checkAgainst: maxLength,
            message: VALIDATION_MESSAGES['maxLength'],
        })

        return this
    }

    getErrorMessageForRule(rule) {
        return rule.message
            .replace(/\${displayName}/g, this._displayName)
            .replace(/\${checkAgainst}/g, rule.checkAgainst)
    }

}

export default class ValidatedModel {

    validations = {}
    valid = true

    ensure(fieldName) {
        if (!this.fieldHasValidations(fieldName)) {
            this.validations[fieldName] = new Validations(fieldName)
        }

        return this.validations[fieldName]
    }

    validate(fieldName) {
        if (fieldName && !this.fieldHasValidations(fieldName)) return

        if (!fieldName) return this.validateAllFields()

        let validations = this.validations[fieldName]

        // check each validation rule
        let fieldIsValid = validations.validationRules.every(validationRule => {
            // check rule against the fields value
            if (!validationRule.check(this[fieldName])) {
                // field failed to satisfy the rule, set error property in this form:
                // fieldNameError (i.e. firstNameError for field firstName)
                this[`${fieldName}Error`] =  validations.getErrorMessageForRule(validationRule)
                return false
            }

            return true
        })

        if (fieldIsValid) {
            // fields valid, delete any existing error message
            this[`${fieldName}Error`] = null
            delete this[`${fieldName}Error`]
        }

        return fieldIsValid
    }

    validateAllFields() {
        let valid = true

        Object.keys(this.validations).forEach(key => {
            if (!this.validate(key)) valid = false
        })

        this.valid = valid

        return valid
    }

    fieldHasValidations(fieldName) {
        return fieldName in this.validations
    }

}
