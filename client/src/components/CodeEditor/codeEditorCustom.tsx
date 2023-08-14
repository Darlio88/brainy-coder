import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { dracula } from '@uiw/codemirror-theme-dracula';
const code = `## Title

\`\`\`jsx
function Demo() {
  return <div>demo</div>
}
\`\`\`

\`\`\`bash
# Not dependent on uiw.
npm install @codemirror/lang-markdown --save
npm install @codemirror/language-data --save
\`\`\`

[weisit ulr](https://uiwjs.github.io/react-codemirror/)

\`\`\`go
package main
import "fmt"
import { dracula } from '@uiw/codemirror-theme-dracula';
func main() {
  fmt.Println("Hello, 世界")
}
\`\`\`
`;

type IProps = {
    value: string;
    onChange: (value: string) => void;
    theme?: string;
    minHeight: string;
    extension?: any;
};
export default function MarkdownCodeEditor(props: IProps) {
    return (
        <CodeMirror
            theme={dracula}
            minHeight={props.minHeight}
            onChange={props.onChange}
            value={props.value}
            extensions={
                props.extension || [
                    markdown({
                        base: markdownLanguage,
                        codeLanguages: languages,
                    }),
                ]
            }
        />
    );
}
