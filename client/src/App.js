import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Document from "./Document";
import EditorSidebar from "./components/layouts/EditorSidebar";
import Dashboard from "./components/layouts/Dashboard";
// import Dashboard from "./components/layouts/dashboard";
// import io from "socket.io-client";

function App() {
  var socket;
  const [socketConnected, setSocketConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const demoUser = {
    userName: "Raj",
    name: "rajesh singh",
    _id: "4422245571",
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(`file`, file);
    formData.append("filename", file.name);
    formData.append("email", email);
    formData.append("subject", message);
    formData.append("message", subject);

    console.log("filename", file.name);

    // const userdata = {
    //   email: email,
    //   subject: message,
    //   message: subject,
    // };

    // var config = {
    //   method: "post",
    //   url: "http://localhost:4000/api/v1/sendMail",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: data,
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //Some changes

    const config = { headers: { "content-type": "multipart/form-data" } };

    // const userData = {
    //   email: email,
    //   subject: subject,
    //   message: message,
    //   file: file,
    // };

    console.log("formData", formData);
    debugger;
    try {
      const { data } = await axios.post("api/v1/sendMail", formData, config);

      console.log("data", data);
    } catch (e) {
      console.log("dta error", e);
    }
  };

  const uploadFile = (e) => {
    debugger;
    const newfile = e.target.files[0];
    if (newfile) {
      let reader = new FileReader();

      reader.onload = (e) => {
        console.log("result", reader.result);
        if (reader.readyState === 2) {
          setFile(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // useEffect(() => {
  //   console.log("demouser", demoUser);
  //   socket = io(EndPoint);
  //   socket.emit("setup", demoUser);
  //   socket.on("connection", () => setSocketConnected(true));
  // }, []);

  const [text, setText] = useState("");
  return (
    <>
      {/* <EditorSidebar /> */}
      <Dashboard />
    </>
  );
}

export default App;
