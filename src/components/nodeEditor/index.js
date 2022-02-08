import React, { useRef, useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import './style.css';

const NodeEditor = (props) => {
  const [editorState, setEditorState] = useState(() => {
    console.log('Props value:', props.state.formData.payload)
    if(false && props.state) {
      const contentState = convertFromRaw(JSON.parse(props.state.formData.payload));
      return EditorState.createWithContent(contentState);
    }
   
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if(props.state.formData.payload === '') setEditorState(EditorState.createEmpty())
  }, [props.state.formData])

  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if(newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  const handleOnChange = (editorState) => {
    setEditorState(editorState);

    props.dispatch({ type: 'VALUE_CHANGE', formData: {
      payload: JSON.stringify(convertToRaw(editorState.getCurrentContent())) }
    });
  }

  return (
    <div className="editorTextarea" onClick={focusEditor}>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={handleOnChange}
        handleKeyCommand={handleKeyCommand}
        placeholder={'Type something...'}
      />
    </div>
  );
}

export default NodeEditor;