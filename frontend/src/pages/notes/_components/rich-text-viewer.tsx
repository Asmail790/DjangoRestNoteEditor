import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SubScript from "@tiptap/extension-subscript";
import { useEffect } from "react";

type RichTextViewerProps = {
  jsonContent: any;
};

const RichTextViewer: React.FC<RichTextViewerProps> = (props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: props.jsonContent,
  });

  useEffect(() => {
    if (editor === null) {
      return;
    }
    editor.setEditable(false);
  }, [editor]);

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export { RichTextViewer };
