import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import html2pdf from "html-to-pdf-js";
import jsPDF from "jspdf";
import createImagePlugin from "@draft-js-plugins/image";
import ReactDOMServer from "react-dom/server";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import "./styles.css";

const Document = () => {
  const [description, setDescription] = useState({
    htmlValue: "",
    editorState: EditorState.createEmpty(),
  });

  const imagePlugin = createImagePlugin();

  const onEditorStateChange = async (editorValue) => {
    const editorStateInHtml = draftToHtml(
      convertToRaw(editorValue.getCurrentContent())
    );

    setDescription({
      htmlValue: editorStateInHtml,
      editorState: editorValue,
    });
  };

  const onSave = async () => {
    const worker = await html2pdf(description.htmlValue);

    console.log("worker", worker);

    console.log(description.htmlValue);

    let element = (
      <div style={{ display: "flex", flexWrap: "wrap" }}>Sample Text</div>
    );
    // const doc = await new jsPDF("p", "pt", "letter");

    // doc.html(ReactDOMServer.renderToString(description.htmlValue), {
    //   callback: function (doc) {
    //     doc.save("sample.pdf");
    //   },
    // });

    // console.log("description", doc);
  };

  return (
    <div className="App">
      <Editor
        toolbarHidden={false}
        editorState={description.editorState}
        onEditorStateChange={onEditorStateChange}
        placeholder="hello placeholder"
        plugins={[imagePlugin]}
      />
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default Document;
