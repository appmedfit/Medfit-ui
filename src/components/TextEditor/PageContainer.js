import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import BlockStyleToolbar, {
  getBlockStyle,
} from "./blockStyles/BlockStyleToolbar";
import "./TextEditor.css";
import { useState } from "react";

const PageContainer = (props) => {
  const { bookingInfo: selectedBooking } = useSelector(
    (state) => state.booking
  );
  const [editorState, setEditorState] = useState(null);
  const [isReadOnly, setReadOnly] = useState(true);
  const { currentUser } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );
  const getInitialState = () => {
    let initialEditorState = null;
    const storeRaw = selectedBooking.prescribtion;

    if (storeRaw && storeRaw !== "") {
      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      initialEditorState = EditorState.createWithContent(rawContentFromStore);
    } else {
      console.log("else");
      initialEditorState = EditorState.createEmpty();
    }
    return initialEditorState;
  };

  useEffect(() => {
    setEditorState(getInitialState());
    setReadOnly(true);
  }, [selectedBooking.id]);

  const onChange = (editorState) => {
    console.log(editorState);
    setEditorState(editorState);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const readOnlyhandle = () => {
    setReadOnly((i) => !i);
  };
  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const onBoldClick = (event) => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };
  const submithandle = () => {
    console.log(editorState);
    const rawDraftContentState = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    readOnlyhandle();
    props.handleSubmit(rawDraftContentState);
  };
  return (
    <>
      {editorState && (
        <div className="editorContainer">
          {!isReadOnly && (
            <div className="toolbar">
              <BlockStyleToolbar
                editorState={editorState}
                onToggle={toggleBlockType}
              />
              <button className="styleButton" onClick={onUnderlineClick}>
                U
              </button>
              <button className="styleButton" onClick={onBoldClick}>
                <b>B</b>
              </button>
              <button className="styleButton" onClick={onItalicClick}>
                <em>I</em>
              </button>
            </div>
          )}
          <div
            className="editors"
            style={{ height: isReadOnly ? "310px" : "230px" }}
          >
            <Editor
              blockStyleFn={getBlockStyle}
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={onChange}
              readOnly={isReadOnly}
            />
          </div>
          {currentUser &&
            currentUser.role == "doctor" &&
            (isReadOnly ? (
              <button
                className="btn Button-Prescription "
                onClick={readOnlyhandle}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn Button-Prescription "
                onClick={submithandle}
              >
                submit
              </button>
            ))}
        </div>
      )}
    </>
  );
};

export default PageContainer;
