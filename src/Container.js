import React from 'react'
import { connect } from 'react-redux'
import store from './store'
import App from './App'

class Container extends React.Component {
    constructor(props){
        super(props)

    }

    render(){
        return (
            <App inc={this.props.inc} />
        )
    }

}

Container = connect((state) => {
    return {
        inc: state.tinyReducer.inc
    }
})(Container)

export default Container;