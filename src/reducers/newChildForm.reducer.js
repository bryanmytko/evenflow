const NewChildFormReducer = (state, action) => {
  switch(action.type) {
    case 'HIDDEN':
      return { ...state, hidden: true, formData: { title: '', payload: '' }};
    case 'NEW_CHILD':
      return { ...state, hidden: false, parentId: action.parentId, terminating: false };
    case 'TERMINATING':
      return { ...state, hidden: false, terminating: true };
    case 'VALUE_CHANGE':
      return { ...state, formData: { ...state.formData, ...action.formData }};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

export default NewChildFormReducer;
