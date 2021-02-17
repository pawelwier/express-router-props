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

routes.map(route => {
    app.get(route.path, (req, res) => {
        const params = req.params
        const functionParams = Object.keys(params).length ? params[Object.keys(params)[0]] : null

        const getDetails = route.details
        const isFunction = typeof getDetails === 'function'

        if (!isFunction || getDetails(functionParams).constructor.name !== 'Promise') {
            const details = isFunction ? getDetails(functionParams) : getDetails;
            switch (typeof details) {
                case 'string': res.props = details
                    break;
                case 'number': res.props = details.toString()
                    break;
                case 'object': res.props = JSON.stringify(details)
                    break;
            }
            addPropsToIndex(res)
        } else if (isFunction && getDetails().constructor.name === 'Promise') {

            getDetails(functionParams).then(res => res.json()).then(data => {
                res.props = JSON.stringify(data.response)
                addPropsToIndex(res)
            })
        }
    })
})

app.listen(2345, () => {
    console.log('running')
})