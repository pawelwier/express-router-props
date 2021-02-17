const { show, index, getObject, getString, getNumber, addHundred, addNumbers } = require('./controller')

module.exports = [{
    path: '/one/:id',
    details: show
}, {
    path: '/all',
    details: index
}, {
    path: '/object',
    details: getObject
}, {
    path: '/string',
    // details: getString
    details: 'zxcv'
}, {
    path: '/number',
    details: getNumber
}, {
    path: '/add100/:number1',
    details: addHundred
}, {
    path: '/add/:number1/:number2/:number3',
    details: addNumbers
}, {
    path: '/empty'
},
];