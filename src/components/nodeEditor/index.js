import React, { useRef, useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import './style.css';

const NodeEditor = (props) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    /* @TODO need a check for old data that was just a string */
    if(props.state.formData.payload){
      const content = props.state.formData.payload;
      props.state.hidden ?
      setEditorState(EditorState.createEmpty()) :
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))));
    }
  }, [props.state.hidden])

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
        value={props.state.formData.payload}
      />
    </div>
  );
}

export default NodeEditor;