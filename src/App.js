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

import NewC from './NewC';


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
            this.changed(e);
            // let newCount = this.state.content.length + 1
            // // let addCount = this.setState({count: newCount})
      
            // let currentEid = e.target.getAttribute('data-id');
            // console.log(currentEid);
      
            // let content = this.state.content;
      
            // let index =  content.findIndex((obj,a)=>{
            //   return obj.id==currentEid;
            // })
            // let newContent = {};
            // newContent.id = newCount
            // newContent.html = `<p data-id=${newCount} class=\"paragraphNumeroUno\"> I am a new content to the element with count ${newCount} </p><div class=expand data-id=${newCount}>+</div>`;
          
            // content.splice(index+1,0,newContent);

            // store.dispatch({type:'FETCH_CONTENT', payload: content})
            // // this.setState({content: content}) 
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

  // componentWillReceiveProps(nextProps){
  //   if(this.props.inc != nextProps.inc){
  //     console.log("componentWillReceiveProps")
  //   this.setState({'content':null})
  //   tinymce.remove()
  //   this.forceUpdate()
  //   }
  // }

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

  changed = (e) => {
    console.log("I am clicked");
    let newCount = this.props.content.length + 1
            // let addCount = this.setState({count: newCount})
      
            var currentEid = e.target.getAttribute('data-id');
            console.log(currentEid);
      
            var content = this.props.content;
      
            var index =  content.findIndex((obj,a)=>{
              return obj.id==currentEid;
            })
            var newContent = {};
            newContent.id = newCount
            newContent.html = `<p data-id=${newCount} class=\"paragraphNumeroUno\"> ${newCount}  I am a new content to the element with count </p><div class=expand data-id=${newCount}>+</div>`;
          
            content.splice(index+1,0,newContent);
            var incrementContent = this.props.inc + 1;

            store.dispatch({type:'FETCH_CONTENT', payload: content})
            // debugger;
            // store.dispatch({type:'FETCH_INC', payload: incrementContent})

            
  }


  newContent = (content) => {
    return content.map((element, index) => {
      return (
          <Content data={element.html} index={index} />
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

  increment = () => {
    store.dispatch({type:'FETCH_INC', payload: this.props.inc+1})
  }

  render() {
    console.log("set props data for >>>>>>", this.props.inc)
    return (
        <div style={{marginTop:'40px'}} className="element-list" key='1234567890' >
          <Content content={this.props.content} />
    
       {/* {this.newContent(this.props.content)} */}
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
