const INITIAL_STATE = {
    content: [{"id": 1, "html":"<p data-id=1 class=\"paragraphNumeroUno\"> I am a new content to the element with count 100 </p><div contentEditable=\"false\" class=expand data-id=1>+</div>"}]
  }


  export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
  
      case 'FETCH_CONTENT': {
        return {
          ...state,
          content: action.payload
        }
      }
      default:
        return state
    }
  }