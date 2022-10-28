const validators = {
    notEmpty: (value = '') => {
        if (value.length) return null;
        return 'The field shouldn`t be empty';
    },
    maxLengths: length => (value = '') => {
        if (value.length <= length) return null;
        return `value should not be longer then ${length} symbols`;
    },
    minLengths: length => (value = '') => {
        if (value.length >= length) return null;
        return `value should not be shorter then ${length} symbols`;
    },
    onlyCharsAndNumbers: (value = '') => /[a-z0-9]+/gi.test(value) ? null : "Should contain only chars and numbers",
    password: (value = '') => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]*$/.test(value) ? null : "Ти шо дибіл? введи нормальний пароль",
    email: (value = '') => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : "Invalid email format",
}

export const fieldValidators = {
    name: [validators.notEmpty, validators.maxLengths(80), validators.minLengths(2), validators.onlyCharsAndNumbers],
    surname: [validators.notEmpty, validators.maxLengths(80), validators.minLengths(5), validators.onlyCharsAndNumbers],
    password: [validators.notEmpty, validators.password, validators.onlyCharsAndNumbers],
    email: [validators.notEmpty, validators.email]
}

