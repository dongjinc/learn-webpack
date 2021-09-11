function getComponent(){
    return import('lodash').then(({default: _}) => {
        const element = document.createElement('div')
        element.innerHTML = _.join(['Hello', 'webpack'])
        element.addEventListener('click', () => {
            import(/* webpackPrefetch: true */ './obj').then(res => {
                console.log(res)
            })
        })
        return element
    })
}
getComponent().then((component) => {
    document.body.appendChild(component)
})