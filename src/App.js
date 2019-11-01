import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Content from './Content';

import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";

import { EditorConfig } from './config/EditorConfig'

import { connect } from 'react-redux'
import store from './store'



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [{ "id": 1, "html": "<p data-id=0 class=\"paragraphNumeroUno\"> I am a new content to the element with count 1 </p><div contentEditable=\"false\" class=expand data-id=1>+</div>" }]
    }

    this.editorConfig = {
      plugins: EditorConfig.plugins,
      selector: '.element-list',
      formats: EditorConfig.formats,
      menubar: false,
      statusbar: false,
      inline: true,
      object_resizing: false,
      fixed_toolbar_container: '#tinymceToolbar',
      content_style: EditorConfig.contentStyle,
      toolbar: EditorConfig.toolbar,
      image_advtab: false,
      setup: (editor) => {
        editor.on("click", (e) => {
          if (e.target.className == "expand") {
            this.changed(e);
          }

        })

      }
    }

  }


  componentDidMount() {
    console.log("I am in componentDidMount")
    tinymce.init(this.editorConfig)
  }

  componentDidUpdate() {
    console.log("I am in componentDidUpdate")
    tinymce.init(this.editorConfig)
  }

  changed = (e) => {
    console.log("I am clicked");
    let newCount = this.props.content.length + 1
    var currentEid = e.target.getAttribute('data-id');
    console.log(currentEid);
    var content = this.props.content;
    var index = content.findIndex((obj, a) => {
      return obj.id == currentEid;
    })
    var newContent = {};
    newContent.id = newCount
    newContent.html = `<p data-id=${newCount} class=\"paragraphNumeroUno\"> ${newCount}  I am a new content to the element with count </p><div class=expand data-id=${newCount}>+</div>`;

    content.splice(index + 1, 0, newContent);
    var incrementContent = this.props.inc + 1;

    store.dispatch({ type: 'FETCH_CONTENT', payload: content })
    // store.dispatch({type:'FETCH_INC', payload: incrementContent})


  }


  render() {
    console.log("set props data for >>>>>>", this.props.inc)
    return (
      <div style={{ marginTop: '40px' }} className="element-list" >
        <Content content={this.props.content} />
      </div>

    );
  }
}

App = connect((state) => {
  return {
    content: state.tinyReducer.content,
    inc: state.tinyReducer.inc
  }
})(App)

export default App;
