const NewChildFormReducer = (state, action) => {
  switch(action.type) {
    case 'HIDDEN':
      return { ...state, hidden: true, terminating: false, formData: { title: '', payload: '' }};
    case 'NEW_CHILD':
      const toggle = !state.hidden;
      return { ...state, hidden: toggle, parentId: action.parentId, terminating: false };
    case 'TERMINATING':
      return { ...state, hidden: false, terminating: !state.terminating };
    case 'VALUE_CHANGE':
      return { ...state, formData: { ...state.formData, ...action.formData }};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

export default NewChildFormReducer;
