const NewChildFormReducer = (state, action) => {
  let toggle;

  switch(action.type) {
    case 'HIDDEN':
      return {
        ...state,
        hidden: true,
        terminating: false,
        formData: {
          title: '',
          payload: ''
        }
      };
    case 'NEW_CHILD':
      toggle = !state.hidden;
      return {
        ...state,
        hidden: toggle,
        parentId: action.parentId,
        terminating: false,
        formData: {
          title: '',
          payload: ''
        }
      };
    case 'EDIT_CHILD':
      toggle = !state.hidden;
      const terminating = action.formData.payload === '' ? false : true;
      const { _id, payload, title } = action.formData;
      return {
        ...state,
        hasChildren: action.hasChildren,
        hidden: toggle,
        parentId: action.parentId,
        terminating,
        formData: { _id, title, payload }
      };
    case 'TERMINATING':
      return {
        ...state,
        hidden: false,
        terminating: !state.terminating
      };
    case 'VALUE_CHANGE':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData
        }};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

export default NewChildFormReducer;
