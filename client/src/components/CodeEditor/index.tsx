import { useEffect, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { historyField } from '@codemirror/commands';

const stateFields = { history: historyField };

const extensions = [javascript({ typescript: true })];

interface ICodeEditor {
    onChange: FunctionConstructor;
    functionDefinition: string;
}

export default function CodeEditor(props: ICodeEditor) {
    const editor = useRef();
    const serializedState = localStorage.getItem('value');
    const value = localStorage.getItem('codeState') || props.functionDefinition;
    const initialState = serializedState
        ? {
              json: JSON.parse(serializedState || ''),
              fields: stateFields,
          }
        : undefined;
    const { setContainer } = useCodeMirror({
        container: editor.current,
        extensions,
        theme: okaidia,
        // theme: dracula,
        value: value,
        onChange: props.onChange,
        minHeight: '400px',
        initialState: initialState,
    });

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    }, [editor.current]);

    useEffect(() => {
        console.log(setContainer);
    }, []);
    return <div ref={editor} />;
}
