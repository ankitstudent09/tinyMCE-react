import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import store from './store'

class NewC extends React.Component {
    constructor(props){
        super(props);        
    }

    componentDidMount() {
        console.log("Component Did Mount child")
        store.dispatch({type:'FETCH_INC', payload: this.props.inc+1})
    }

    componentDidUpdate(){
        console.log("Component Did Update child")
    }

    render() {
            return (
                    <div >
                       Incremented value: {this.props.inc}
                    </div>   
            )                   
    }
}


NewC = connect((state)=> {
   return  {
        inc: state.tinyReducer.inc
    }
})(NewC)

export default NewC;