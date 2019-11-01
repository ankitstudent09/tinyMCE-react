const INITIAL_STATE = {
    content: [{"id": 1, "html":"<p data-id=1 class=\"paragraphNumeroUno\"> 100 I am a new content to the element with count </p><div contentEditable=\"false\" class=expand data-id=1>+</div>"}],
    inc:1
  }


  export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
  
      case 'FETCH_CONTENT': {
        return {
          ...state,
          content: action.payload
        }
      }

      case 'FETCH_INC': {
        return {
          ...state,
          inc: action.payload
        }
      }

      default:
        return state
    }
  }