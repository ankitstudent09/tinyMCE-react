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
        return this.props.content.map((element, index) => {
            return (
                <React.Fragment key={index}>
                <div key={index} dangerouslySetInnerHTML={{__html: element.html}}>
                  </div>
                </React.Fragment>
                   
            )
          });
        // return(
        //     <div dangerouslySetInnerHTML={{__html: this.props.data}}>
        //     </div>
        // )
    }
}

Content.propTypes = {
    content: PropTypes.string
  };

export default Content;