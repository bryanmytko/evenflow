const NewChildFormReducer = (state, action) => {
  let toggle;

  switch(action.type) {
    case 'HIDDEN':
      return { ...state, hidden: true, terminating: false, formData: { title: '', payload: '' }};
    case 'NEW_CHILD':
      toggle = !state.hidden;
      return { ...state, hidden: toggle, parentId: action.parentId, terminating: false };
    case 'EDIT_CHILD':
      toggle = !state.hidden;
      const terminating = action.formData.payload === '' ? false : true;
      return { ...state,
        hidden: toggle,
        parentId: action.parentId,
        terminating,
        formData: { title: action.formData.title, payload: action.formData.payload }
      };
    case 'TERMINATING':
      return { ...state, hidden: false, terminating: !state.terminating };
    case 'VALUE_CHANGE':
      return { ...state, formData: { ...state.formData, ...action.formData }};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

export default NewChildFormReducer;
