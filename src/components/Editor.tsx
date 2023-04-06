import { useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { tags as t } from "@lezer/highlight";

interface EditorProps {
  socketRef: any;
  roomId: string | undefined;
  onCodeChange: (code: string) => void;
}

const Editor = ({ roomId, onCodeChange }: EditorProps) => {
  console.log(roomId);
  return (
    <CodeMirror
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
      value="
      console.log('FUNCIONA CRLLLLLLLLLLLLLLLLLLLLLLLLL');
      // ESTA BUGADO VOU DORMIR FDS
      "
      style={{
        minHeight: "calc(100vh - 20px)",
        fontSize: "20px",
        lineHeight: "1.6",
      }}
      extensions={[langs.javascript()]}
      onChange={(value) => onCodeChange(value)}
    />
  );
};

export default Editor;
