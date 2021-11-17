import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Text,
  Editor,
  createEditor,
  Node,
  Range,
  Point,
  Transforms,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSelected,
  useFocused,
  useSlate,
} from "slate-react";
import { withHistory } from "slate-history";
import { cx, css } from "@emotion/css";
import { jsx } from "slate-hyperscript";
import isHotkey from "is-hotkey";
import { useSelector, useDispatch } from "react-redux";
// import imageExtensions from 'image-extensions';
// import isUrl from 'is-url';

import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdImage,
  MdList,
  MdLooksOne,
  MdLooksTwo,
  MdLooks3,
} from "react-icons/md";
import { setBookingInfo } from "../../store/booking.slice";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const ELEMENT_TAGS = {
  A: (el) => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  H3: () => ({ type: "heading-three" }),
  H4: () => ({ type: "heading-four" }),
  H5: () => ({ type: "heading-five" }),
  H6: () => ({ type: "heading-six" }),
  IMG: (el) => ({ type: "image", url: el.getAttribute("src") }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "code" }),
  UL: () => ({ type: "bulleted-list" }),
  TABLE: () => ({ type: "table" }),
  TBODY: () => ({ type: "tbody" }),
  THEAD: () => ({ type: "thead" }),
  TR: () => ({ type: "table-row" }),
  TD: () => ({ type: "table-cell" }),
  TH: () => ({ type: "table-cell-header" }),
  HEADER: () => ({ type: "header" }),
  SECTION: () => ({ type: "section" }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

export const deserialize = (el, mAttrs = {}) => {
  console.log("deserialize:", el, el.nodeType, el.nodeName);
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (el.childNodes[0]) {
    console.log("deserialize:sub", el.childNodes[0], el.childNodes[0].nodeName);
  }
  let children = [];
  if (nodeName === "PRE") {
    if (el.childNodes[0] && el.childNodes[0].nodeName === "CODE") {
      parent = el.childNodes[0];
    }
    console.log("deserialize:pre:", parent, parent.childNodes);
    children = Array.from(parent.childNodes).map((e) => {
      return {
        text: e.textContent,
        code: true,
      };
    });
  } else {
    children = Array.from(parent.childNodes).map(deserialize).flat();
  }

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);

    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};

export default function RichEditor(props) {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editorRef = useRef();
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  const editor = editorRef.current;
  // const editor = useMemo(() => withReact(createEditor()), []);
  editor.history = {
    redos: [],
    undos: [],
  };
  const dispatch = useDispatch();
  const { bookingInfo: selectedBooking } = useSelector(
    (state) => state.booking
  );
  const [value, setValue] = useState(selectedBooking.prescribtion);

  console.log("in slate editor", selectedBooking.prescribtion, "val", value);
  useEffect(() => {
    setValue(selectedBooking.prescribtion);
  }, [selectedBooking.id]);
  return (
    <div>
      {JSON.stringify(value)}
      {}
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          console.log("in onchnage", value);
          setValue(value);
          // dispatch(
          //   setBookingInfo({
          //     ...selectedBooking,
          //     prescribtion: value,
          //   })
          // );
          // const ops = opts.operations
          //   .filter((o) => {
          //     if (o) {
          //       return (
          //         o.type !== "set_selection" &&
          //         o.type !== "set_value" &&
          //         (!o.data || !o.data.has("source"))
          //       );
          //     }

          //     return false;
          //   })
          //   .toJS()
          //   .map((o) => ({ ...o, data: { source: "one" } }));
          // console.log("ops", ops);
        }}
      >
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <BlockButton format="heading-one" icon="heading-one" />
          <BlockButton format="heading-two" icon="heading-two" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>
        <Editable
          className="slate-editor"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "code":
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      );
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "link":
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  let iconCompo = null;
  switch (icon) {
    case "heading-one":
      iconCompo = <MdLooksOne size={24} />;
      break;
    case "heading-two":
      iconCompo = <MdLooksTwo size={24} />;
      break;
    case "heading-three":
      iconCompo = <MdLooks3 size={24} />;
      break;
    case "format_quote":
      iconCompo = <MdFormatQuote size={24} />;
      break;
    case "format_list_numbered":
      iconCompo = <MdFormatListNumbered size={24} />;
      break;
    case "format_list_bulleted":
      iconCompo = <MdFormatListBulleted size={24} />;
      break;
  }

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {iconCompo}
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  let iconCompo = null;
  switch (icon) {
    case "format_bold":
      iconCompo = <MdFormatBold size={24} />;
      break;
    case "format_italic":
      iconCompo = <MdFormatItalic size={24} />;
      break;
    case "format_underlined":
      iconCompo = <MdFormatUnderlined size={24} />;
      break;
    case "code":
      iconCompo = <MdCode size={24} />;
      break;
  }

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {iconCompo}
    </Button>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
));

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        padding: 1px 11px 8px;
        border-bottom: 2px solid #eee;
      `
    )}
  />
));

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  )
);

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      "material-icons",
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
));
