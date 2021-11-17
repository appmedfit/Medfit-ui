import React, { useState, useMemo, useEffect } from "react";
import { createEditor, Descendant, Element } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const ReadOnlyEditor = (props) => {
  console.log(props.value);
  useEffect(() => {
    console.log("in read");
  });
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate editor={editor} value={props.value} onChange={(value) => {}}>
      <Editable readOnly placeholder="Enter some plain text..." />
    </Slate>
  );
};

export default ReadOnlyEditor;
