import React, { useRef, useState, useEffect } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';

import './style.css';

const NodeEditor = (props) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    if(props.state.hidden) return setEditorState(EditorState.createEmpty());

    if(props.state.formData.payload){
      const content = props.state.formData.payload;
      try {
        const parsedContent = JSON.parse(content);
        setEditorState(
          EditorState
            .createWithContent(convertFromRaw(parsedContent))
        );
      } catch(err) {
        /* This is gross but we need to support legacy content which was a raw string */
        setEditorState(
          EditorState
          .createWithContent(ContentState.createFromText(content))
        );
      }
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

    props.dispatch({
      type: 'VALUE_CHANGE',
      formData: {
        payload: JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        )
      }
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
        spellCheck={true}
      />
    </div>
  );
}

export default NodeEditor;
