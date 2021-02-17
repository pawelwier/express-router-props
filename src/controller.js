const fetch = require('node-fetch')
require('./api')

const show = (id) => {
    return fetch(`http://localhost:5432/api/v1/show/${id}`)
}

const index = () => {
    return fetch('http://localhost:5432/api/v1/index')
}

const getObject = () => {
    return {
        id: 54,
        name: 'Name1'
    }

    // return [1, 2, 3, 4, 5]
}

// const getString = () => {
//     return 'sample string'
// }

const getString = 'sample string'

const getNumber = () => {
    return 12345
}

const addHundred = (num) => {
    return 100 + parseInt(num)
}

const addNumbers = (num1, num2, num3) => {
    return parseInt(num1) + parseInt(num2) + parseInt(num3)
}

module.exports = { show, index, getString, getNumber, getObject, addHundred, addNumbers }