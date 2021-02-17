const { show, index, getObject, getString, getNumber, addHundred } = require('./controller')

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
    path: '/add/:number',
    details: addHundred
}, {
    path: '/empty'
},
];