import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import html2pdf from "html-to-pdf-js";
import jsPDF from "jspdf";
import createImagePlugin from "@draft-js-plugins/image";
import ReactDOMServer from "react-dom/server";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import { RichUtils } from "draft-js";

const Document = () => {
  const [description, setDescription] = useState({
    htmlValue: "",
    editorState: EditorState.createEmpty(),
  });
  const [images, setImages] = useState([]);

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

  function uploadImageCallBack(file) {
    let uploadedImages = [];

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    uploadedImages.push(imageObject);
    setImages([...images, { uploadedImages }]);

    console.log(images);

    // return new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("POST", "https://api.imgur.com/3/image");
    //   xhr.setRequestHeader("Authorization", "Client-ID cbfa47e2716388b");
    //   const data = new FormData();
    //   data.append("image", file);
    //   xhr.send(data);
    //   xhr.addEventListener("load", () => {
    //     const response = JSON.parse(xhr.responseText);
    //     resolve(response);
    //   });
    //   xhr.addEventListener("error", () => {
    //     const error = JSON.parse(xhr.responseText);
    //     reject(error);
    //   });
    // });
  }

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
        // toolbarCustomButtons={<button onClick={onSave}>Save</button>}
        editorClassName="bg-white max-w-screen-md mx-auto px-4 py-2 my-10 min-h-[297mm]"
        toolbarStyle={{
          border: "none",
          padding: "10px 5px",
          borderRadius: "none",
        }}
        toolbarCustomButtons={[
          <div className="float-right last:ml-auto px-2">
            <button
              className="bg-[#70BF7B] hover:bg-[#579860] transition px-4 py-2 rounded text-white font-bold"
              onClick={onSave}
            >
              Save
            </button>
          </div>,
        ]}
        toolbarClassName="sticky top-16 left-0 right-0 z-50 border-none"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            // "fontFamily",
            "list",
            "textAlign",
            // "link",
            // "embedded",
            "image",
            // "remove",
            "history",
          ],
        }}
        editorState={description.editorState}
        onEditorStateChange={onEditorStateChange}
        placeholder="Start Typing..."
        plugins={[imagePlugin]}
        // toolbar={{
        //   image: {
        //     uploadCallback: uploadImageCallBack,
        //     alt: { present: true, mandatory: false },
        //   },
        // }}

        // toolbar={{
        //   inline: { inDropdown: true },
        //   list: { inDropdown: true },
        //   textAlign: { inDropdown: true },
        //   link: { inDropdown: true },
        //   history: { inDropdown: true },
        //   inputAccept:
        //     "application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel",
        // }}
      />
    </div>
  );
};

export default Document;
