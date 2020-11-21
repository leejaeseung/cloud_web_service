import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import App from 'shared/App'
import {hot} from 'react-hot-loader'

const Root = () => {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    )
}

export default hot(module)(Root)