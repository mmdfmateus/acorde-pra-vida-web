import "./AddChords.css";

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Form, Button, Select } from "antd";
import YouTube from "react-youtube";

import AddChordsForm from "./AddChordsForm";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

export default function AddChordsPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [chordsHtmlString, setChordsHtmlString] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    let result = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setChordsHtmlString(result);
  };

  return (
    <>
      <Row
        gutter={[0, 24]}
        className="row"
        justify="space-around"
      >
        <Col>
          <h1>Adicionar nova cifra</h1>
        </Col>
      </Row>
      <Row
        gutter={[0, 24]}
        justify="space-around"
      >
        <Col sm={20} xl={12}>
          <Card className="rankingCard editorCard">
            <Editor
              editorClassName="editor"
              wrapperClassName="editor-wrapper"
              toolbarClassName="editortoolbar"
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "history",
                ],
              }}
            />
          </Card>
        </Col>
        {/* <Card >
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: textArea }}
          ></div>
        </Card> */}
        <Col sm={20} xl={11} className="col">
          <Card className="rankingCard ChordsInfo" title="Informações da música">
            <Row
              gutter={[0, 24]}
              justify="space-around"
              align="middle"
            >
              <AddChordsForm
                onYoutubeVideoUpdate={setYoutubeVideoId}
                chordsHtmlString={chordsHtmlString}
              ></AddChordsForm>
            </Row>
            <Row
              gutter={[0, 24]}
              justify="space-around"
              align="middle"
            >
              <Card className="videoPlayer" title="Video">
                <Form></Form>
                <YouTube
                  videoId={youtubeVideoId}
                  opts={{
                    height: "360",
                    width: "480",
                  }}
                />
              </Card>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={0} justify="space-around" align="middle">
        <Col span={10}></Col>
        <Col span={10}></Col>
      </Row>
    </>
  );
}
