import PropTypes from 'prop-types';
import Header from './Header'

export default function Page({children}) {
    return (
    <div>
        <Header></Header>
        <h1>Hello Page</h1>
        {children}
    </div>
    )
}

Page.propTypes = {
    children : PropTypes.any
}