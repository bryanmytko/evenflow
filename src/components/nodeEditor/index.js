import React, { useRef, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

import './style.css';

const NodeEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef(null);

  function focusEditor() {
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

  const onBoldClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));

  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text", backgroundColor: "white" }}
      onClick={focusEditor}
    >
      {/* <button onClick={onBoldClick}>Bold</button> */}
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="Write something!"
      />
    </div>
  );
}

export default NodeEditor;