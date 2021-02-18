const isPropsJson = (props) => {
    try {
        JSON.parse(props);
    } catch (err) {
        return props;
    }
    return JSON.parse(props);
}

const makeKeyValuePair = (object) => {
    console.log(Object.keys(object))
    return Object.keys(object).map((key, index) => (
        `${key} => ${Object.values(object)[index]}<br />`
    )).join('')
}

const getHeaderProps = () => {
    const request = new XMLHttpRequest();
    request.open('GET', document.location, false);
    request.send(null);

    let props = request.getResponseHeader('Props')

    props = isPropsJson(props)

    if (typeof props === 'object') {
        let propsToHtml = '';
        if (!props.length) {
            propsToHtml = makeKeyValuePair(props)
        } else {
            props.forEach(prop => {
                propsToHtml += `${makeKeyValuePair(prop)}<br />`
            });
        }
        props = propsToHtml
    }

    document.getElementById('main').innerHTML = props;
    // console.log(props)
}


getHeaderProps()