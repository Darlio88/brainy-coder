import * as React from 'react';
import Markdown from 'react-markdown';
import { javascript } from '@codemirror/lang-javascript';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ToastContainer, toast } from 'react-toastify';
//components
import Header from '../../components/Header';
import CodeEditor from '../../components/CodeEditor/codeEditorCustom';

//baseurl
import BaseUrl from '../../utils/baseUrl';
import getAccessToken from '../../utils/getAccessToken';

const sampleFunctionDescription = `
//Make sure to add function defintion
//test cases as should be added below as illustrated
function add(num1, num2){
//Enter your code here

return num1 + num2;
}

//do not change the code below
console.log(add(1,2))
console.log(add(2,4))
`;
const sampleTitle = `Add two numbers`;
const sampleDescription = `
Write a function that takes in two numbers and returns 
the sum of the numbers given
`;
const sampleOutput = `
3
4
`;
const Create = () => {
    const [description, setDescription] = React.useState('');
    const [functionDescription, setFunctionDescription] = React.useState('');
    const [output, setOutput] = React.useState('');
    const [title, setTitle] = React.useState('');

    //control description change
    const onDescription = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    //control sample input change
    const onFunctionDescription = React.useCallback((value: string) => {
        setFunctionDescription(value);
    }, []);

    //control sample output change
    const onOutput = React.useCallback((value: string) => {
        setOutput(value);
    }, []);

    //control title change
    const onTitle = (event :React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    async function createChallenge(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        console.log(e);
        if (!(title || description || functionDescription || output)) {
            toast.error('All fields are required');
            return;
        }
        const token = getAccessToken();
        const headers = {
            Authorization: token ? `Bearer ${token}` : null,
            // Other headers if needed
        };
        await BaseUrl.post(
            '/create',
            {
                title,
                description,
                functionDefinition: functionDescription,
                output,
            },
            {
                headers,
            }
        )
            .then((res) => {
                console.log(res.data);
                toast.success('Congs, Challenge Created!!!');
                setDescription('');
                setOutput('');
                setFunctionDescription('');
                setTitle('');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Server error, Failed to create Challenge');
            });
    }
    return (
        <>
            <Header />
            <section className="mt-8 mb-6 text-emerald-950 text-base">

                <div className="grid lg:grid-cols-2 gap-6 h-[72vh] overflow-hidden mt-5 mb-8 pt-6 pb-8">

                    {/* creation of Code challenge */}
                    <div className="overflow-y-auto grid gap-3 overflow-x-hidden px-4 pb-8">
                    <h1 className="text-lg font-mono capitalize text-emerald-950 font-bold">
                    Create Coding Challenge{' '}
                    <small className="block text-xs font-extralight">
                        (Use the initial sample on the left as your guide)
                    </small>
                    </h1>
                        {/* Title area */}
                        <div className='p-1'>
                            <h4 className='font-semibold text-base'> Title:</h4>
                            <div className="rounded-md overflow-hidden m-2 grid">
                                <input 
                                    value={title}
                                    onChange={onTitle}
                                    className='px-3 py-2 m-1 outline-none rounded bg-emerald-100 focus:border focus:border-emerald-950'
                                />
                            </div>
                        </div>
                        {/* description area */}
                        <div className="grid gap-2">
                            <h4 className='font-semibold text-base'> Description:</h4>
                            <div className="rounded-md overflow-hidden m-2 grid ">
                                <textarea
                                 className='px-3 py-2 m-1 outline-none rounded bg-emerald-100 focus:border focus:border-emerald-950'
                                    value={description}
                                    onChange={onDescription}
                                    rows={10}
                                />
                            </div>
                        </div>
                        {/* function definition area */}
                        <div className='max-w-[100%]'>
                            <h4 className='font-semibold text-base'> Function Definition:</h4>
                            <div className="rounded-md overflow-hidden m-2">
                                <CodeEditor
                                    value={functionDescription}
                                    onChange={onFunctionDescription}
                                    minHeight="180px"
                                    
                                    extension={[
                                        javascript({ typescript: true }),
                                    ]}
                                />
                            </div>
                        </div>
                        {/* sample input area */}
                        <div>
                        <h4 className='font-semibold text-base'> Output:</h4>
                           
                            <div className="rounded-md overflow-hidden m-2">
                                <CodeEditor
                                    value={output}
                                    onChange={onOutput}
                                    minHeight="50px"
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div>
                            <button
                                onClick={createChallenge}
                                className="transition inline-flex items-center bg-emerald-200 text-emerald-800 border-emerald-800 py-2 px-4 focus:outline-none hover:bg-rose-500 hover:text-rose-50 hover:border-rose-900 rounded text-base mt-4 md:mt-0 shadow-sm hover:shadow"
                            >
                                Submit Challenge
                            </button>
                        </div>
                    </div>

                    {/* Preview of the coding Challenge Created */}
                    <div className="flex flex-col gap-4 overflow-y-auto text-sm pb-8">
                        {/* Title */}

                        <div className="grid gap-2">
                            <Markdown>#### **Title**</Markdown>
                            <Markdown>
                                {title.length > 0 ? title : sampleTitle}
                            </Markdown>
                        </div>
                        <Markdown> #### **Description**</Markdown>
                        <div className="grid gap-2 text-sm">
                            <Markdown>
                                {description.length > 0
                                    ? description
                                    : sampleDescription}
                            </Markdown>
                        </div>
                        {/* sample input and sample output*/}
                        <div className="grid gap-2">
                            <Markdown>#### **Function Definition**</Markdown>
                            <SyntaxHighlighter
                                style={docco}
                                language="javascript"
                            >
                                {functionDescription.length > 0
                                    ? functionDescription
                                    : sampleFunctionDescription}
                            </SyntaxHighlighter>
                            <Markdown>#### **Output**</Markdown>
                            <SyntaxHighlighter
                                style={docco}
                                language="javascript"
                            >
                                {output.length > 0 ? output : sampleOutput}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Create;
