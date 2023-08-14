import CodeMirror from '@uiw/react-codemirror';
import { historyField } from '@codemirror/commands';

// When custom fields should be serialized, you can pass them in as an object mapping property names to fields.
// See [toJSON](https://codemirror.net/docs/ref/#state.EditorState.toJSON) documentation for more details
const stateFields = { history: historyField };

export default function EditorWithInitialState() {
    const serializedState = localStorage.getItem('myEditorState');
    const value = localStorage.getItem('myValue') || '';

    return (
        <CodeMirror
            value={value}
            initialState={
                serializedState
                    ? {
                          json: JSON.parse(serializedState || ''),
                          fields: stateFields,
                      }
                    : undefined
            }
            onChange={(value, viewUpdate) => {
                localStorage.setItem('myValue', value);

                const state = viewUpdate.state.toJSON(stateFields);
                localStorage.setItem('myEditorState', JSON.stringify(state));
            }}
        />
    );
}
