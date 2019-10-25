import store from '../store'



export const addTinyContent = (currentEid) => (dispatch, getState) => {

    const state = getState();
    // console.log('store data from tinyActions',state);
    let newCount = state.tinyReducer.content.length + 1
    console.log('currentEid from tinyActions',currentEid);

    let content = state.tinyReducer.content;
    let index = content.findIndex((obj) => {
        return obj.id == currentEid;
    })

    let newContent = {};
    newContent.id = newCount
    newContent.html = `<p data-id=${newCount} class=\"paragraphNumeroUno\"> I am a new content to the element with count ${newCount} </p><div class=expand data-id=${newCount}>+</div>`;
    content.splice(index + 1, 0, newContent);
    dispatch({
        type: "FETCH_CONTENT",
        payload: content
    })
}
