import { useRef, useEffect } from "react";

import * as monaco from "monaco-editor";
export default function Editor() {
  const editorRef = useRef(null);
  const editor = useRef(null);
  const initEditor = () => {
    editor.current = monaco.editor.create(editorRef.current, {
      language: "javascript", // 设置编辑器语言
      theme: "vs-dark", // 设置编辑器主题
      value: "const str = 'hello,word'", // 设置编辑器内容
    });
  };
  useEffect(() => {
    initEditor();
    return () => {
      editor.current.dispose();
    };
  }, []);
  return <div ref={editorRef} style={{ height: "100%", width: "100%" }}></div>;
}
