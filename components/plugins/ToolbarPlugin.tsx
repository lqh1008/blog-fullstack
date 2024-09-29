import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, TextFormatType, ElementFormatType } from "lexical";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatElement = (format: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  return (
    <div className="toolbar">
      <button onClick={() => formatText("bold")}>加粗</button>
      <button onClick={() => formatText("italic")}>斜体</button>
      <button onClick={() => formatText("underline")}>下划线</button>
      <button onClick={() => formatElement("left")}>左对齐</button>
      <button onClick={() => formatElement("center")}>居中</button>
      <button onClick={() => formatElement("right")}>右对齐</button>
    </div>
  );
};

export default ToolbarPlugin;