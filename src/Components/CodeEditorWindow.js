// CodeEditorWindow.js

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import '../App.css'

const CodeEditorWindow = (props) => {
  const changeHandler = (event)=>{
    props.setcode(event)
  }

  return (
    <div className="text-center border border-primary">
      <div className="wraper">
      <Editor
        className="editor"
        height="100%"
        width={`100%`}
        language={props.language ? props.language : 'javascript'}
        defaultValue="// some comment"
        theme={props.theme.value}
        onChange={changeHandler}
        fontSize={"20px"}
      />
      </div>
    </div>
    
  );
};
export default CodeEditorWindow;