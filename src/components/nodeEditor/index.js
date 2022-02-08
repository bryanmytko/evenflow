import React, { useRef, useState } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import './style.css';

const NodeEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
  // convertFromRaw(props.value)
  //  EditorState.createWithContent()
   EditorState.createEmpty()
  );

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