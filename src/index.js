const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()

const routes = require('./routes')
app.use(cors())

const addPropsToIndex = (response) => {
    response.append('Props', response.props)
    response.sendFile(path.resolve('./public/index.html'));
}

const getParameterValues = (params) => {
    let values = []
    Object.keys(params).map((param, index) => {
        values = [...values, (Object.values(params)[index])]
    })
    return values
}

routes.map(route => {
    app.get(route.path, (req, res) => {
        const params = req.params
        const paramLength = Object.keys(params).length
        const functionParams = paramLength ? getParameterValues(params) : null

        const getDetails = route.details
        const isFunction = typeof getDetails === 'function'
        const details = paramLength ? getDetails(...functionParams) : isFunction ? getDetails() : getDetails

        if (!isFunction || details.constructor.name !== 'Promise') {
            switch (typeof details) {
                case 'string': res.props = details
                    break;
                case 'number': res.props = details.toString()
                    break;
                case 'object': res.props = JSON.stringify(details)
                    break;
            }
            addPropsToIndex(res)
        } else if (isFunction && details.constructor.name === 'Promise') {

            details.then(res => res.json()).then(data => {
                res.props = JSON.stringify(data.response)
                addPropsToIndex(res)
            })
        }
    })
})

app.listen(2345, () => {
    console.log('running')
})