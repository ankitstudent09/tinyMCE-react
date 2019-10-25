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

import { addTinyContent } from './Actions/tinyActions'

import { connect } from 'react-redux'
import store from './store'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [{"id": 1, "html":"<p data-id=0 class=\"paragraphNumeroUno\"> I am a new content to the element with count 1 </p><div contentEditable=\"false\" class=expand data-id=1>+</div>"}]
    }

    this.editorConfig = {
      plugins: EditorConfig.plugins,
      selector: '.element-list',
      formats: EditorConfig.formats,
      menubar: false,
      statusbar: false,
      inline: true,
      object_resizing : false,
      fixed_toolbar_container: '#tinymceToolbar',
      content_style: EditorConfig.contentStyle,
      toolbar: EditorConfig.toolbar,
      image_advtab: false,
      setup: (editor) => {
        editor.on("click", (e)=>{
          if(e.target.className == "expand"){
            console.log("clicked expand");
            let newCount = this.state.content.length + 1
            // let addCount = this.setState({count: newCount})
      
            let currentEid = e.target.getAttribute('data-id');
            console.log(currentEid);
      
            let content = this.state.content;
      
            let index =  content.findIndex((obj,a)=>{
              return obj.id==currentEid;
            })
            let newContent = {};
            newContent.id = newCount
            newContent.html = `<p data-id=${newCount} class=\"paragraphNumeroUno\"> I am a new content to the element with count ${newCount} </p><div class=expand data-id=${newCount}>+</div>`;
          
            content.splice(index+1,0,newContent);

            store.dispatch({type:'FETCH_CONTENT', payload: content})
            this.setState({content: content}) 
          }

        })

      }
    }
    
  }


  componentDidMount() {
    console.log("I am in componentDidMount")
    tinymce.init(this.editorConfig)
  }

  componentDidUpdate(){
    console.log("I am in componentDidUpdate")
    tinymce.init(this.editorConfig)
}

  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target);
    console.log('Content in e:', e);

  }

  handleClickChange = (e) => {
    // console.log('Content was updated:', e.target.getContent());
    console.log('Content was clicked:', e);
    console.log("tag Name", e.target.localName)
    if(e.target.localName =="dfn"){
      alert("dfn tag found");
    }

    if(e.target.className == "expand"){
      console.log("clicked expand");
      let newCount = this.state.content.length + 1
      // let addCount = this.setState({count: newCount})

      let currentEid = e.target.getAttribute('data-id');
      console.log(currentEid);

      let content = this.state.content;

      let index =  content.findIndex((obj,a)=>{
        return obj.id==currentEid;
      })
      let newContent = {};
      newContent.id = newCount
      newContent.html = `<p data-id=${newCount} class=\"paragraphNumeroUno\"> I am a new content to the element with count ${newCount} </p><div class=expand data-id=${newCount}>+</div>`;
    
    
      content.splice(index+1,0,newContent);
      this.setState({content: content}) 
    }

  //   console.log("Node Name",window.tinymce.activeEditor.selection.getNode().nodeName);


  //   window.tinymce.activeEditor.dom.bind(window.tinyMCE.activeEditor.dom.select('span#parent'), "mouseclick",
  //   function () {
  //     let selection = window.tinyMCE.activeEditor.selection.getContent();
  //   console.log("active selection", selection)
  //   window.tinyMCE.activeEditor.selection.setContent(selection + " new text ");
  //     // window.tinyMCE.activeEditor.setContent(" new text ");
  //     window.tinymce.activeEditor.dom.removeClass(window.tinyMCE.activeEditor.dom.select('a.myhidden'), 'hidden');
  //   }
  // );

    // let selection = window.tinyMCE.activeEditor.selection.getContent();
    // console.log("active selection", selection)
    // window.tinyMCE.activeEditor.selection.setContent(selection + " new text ");
  }

  addContent = () => {
    let selection = window.tinyMCE.activeEditor.selection.getContent();
    console.log("active selection", selection)
    window.tinyMCE.activeEditor.selection.setContent(selection + " new text ");
  }

  addFootnote = () => {
    let selection = window.tinyMCE.activeEditor.selection.getContent();
    console.log("active selection", selection)
    window.tinyMCE.activeEditor.selection.setContent(selection + "*");
  }

  addGlossary = () => {
    let selection = window.tinyMCE.activeEditor.selection.getContent();
    console.log("active selection", selection)
    if(selection){
      window.tinyMCE.activeEditor.selection.setContent("<u>" +selection + "</u>");
    }
  }

  addFormatting = () => {
    window.tinymce.activeEditor.formatter.register('mycustomformat', {
      inline: 'h1',
      styles: {color: '#ff0000'}
    });
   
    window.tinymce.activeEditor.formatter.apply('h2');
    console.log("format", window.tinymce.activeEditor.formatter.get())
  }

  changed = () => {
    console("I am clicked");
  }


  newContent = (content) => {
    return content.map((element) => {
      return (
        // element.html
        <Content data={element.html} />
        // <div dangerouslySetInnerHTML={{__html:element.html}}></div>
      )
    });
  }

  mouseHoverChange = () => {
  //   window.tinymce.activeEditor.dom.bind(window.tinyMCE.activeEditor.dom.select('span#parent'), "mouseover",
  //   function () {
  //     let selection = window.tinyMCE.activeEditor.selection.getContent();
  //   console.log("active selection", selection)
  //   window.tinyMCE.activeEditor.selection.setContent(selection + " new text ");
  //     // window.tinyMCE.activeEditor.setContent(" new text ");
  //     window.tinymce.activeEditor.dom.removeClass(window.tinyMCE.activeEditor.dom.select('a.myhidden'), 'hidden');
  //   }
  // );
  }

  render() {
    let ab = '.test::before{content:"R"}';
    // var content = "<div id='tinymceToolbar'>123</div><div class='test'><p urn='123'>This is the initial <dfn>content</dfn> of <span> the </span> editor </p> <span class='expand'>*</span> <p urn='987'>This is the initial <b><i><dfn>content</dfn></i></b> of <span> the </span> editor </p> <span id='parent'>+</span> <p urn='a'>hello</p><p urn='b'>Hi</p><p urn='c'>How</p></div>"
    console.log("set props data for >>>>>>", this.props.content)
    return (
      <React.Fragment>
        {/* <button onClick={this.addContent}>Add content</button>
        <button onClick={this.addFootnote}>Add Footnote</button>
        <button onClick={this.addGlossary}>Add Glossary</button>
        <button onClick={this.addFormatting}>Heading 2</button> */}

      {/* <Editor
        value= {'<div id="content">'+this.newContent(this.state.content)+'</div>'}
        apiKey='va3ez4wkzndulx92tsgond1eucjga09pty2i3s0bweckqrpb'
        init={{
          height: 550,
          width: 1200,
          menubar: false,
          inline: true,
          fixed_toolbar_container: '#tinymceToolbar',
          selector: '#newTinyEdit1',
          contentStyle:ab,
          plugins: [
            'advcode advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'code undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        tagName='newTinyEdit1'
        textareaName='#newTinyEdit1'
        onClick={this.handleClickChange}
        onMouseOver={this.mouseHoverChange}
      /> */}


      <div style={{marginTop:'40px'}} className="element-list">
       {this.newContent(this.props.content)}
      </div>
      </React.Fragment>
    );
  }
}

App = connect((state) => {
  return {
    content: state.tinyReducer.content
  }
})(App)

export default App;
