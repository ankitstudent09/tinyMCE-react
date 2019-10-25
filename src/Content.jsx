import React from 'react'
import PropTypes from 'prop-types';

class Content extends React.Component {
    constructor(props){
        super(props);        
    }

    componentDidMount() {
        console.log("Component Did Mount child")
    }

    componentDidUpdate(){
        console.log("Component Did Update child")
    }

    render() {
        return(
            <div dangerouslySetInnerHTML={{__html: this.props.data}}>
            </div>
        )
    }
}

Content.propTypes = {
    content: PropTypes.string
  };

export default Content;