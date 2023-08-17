import React from 'react';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { historyField } from '@codemirror/commands';
import Confetti from 'react-dom-confetti';

//loaders
import { TailSpin, Audio, ColorRing } from 'react-loader-spinner';

const stateFields = { history: historyField };
//icons
import { MdVerified, MdSmsFailed } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

//components
import Header from '../../components/Header';
import CodeEditor from '../../components/CodeEditor';

//BaseUrl
import BaseUrl from '../../utils/baseUrl';
import getAccessToken from '../../utils/getAccessToken';
//custom hook
import getChallenge from '../../hooks/useChallenge';
import { useParams } from 'react-router-dom';

//interface for the challenge
import { IChallenge } from '../../interfaces/challengeInterface';
import { ToastContainer, toast } from 'react-toastify';

const SolvePage = () => {
    const [solution, setSolution] = React.useState(' ');
    const [isModal, setIsModal] = React.useState(false);
    const [state, setState] = React.useState('Uploading...');
    const [passed, setPassed] = React.useState(false);
    const [isDone, setIsDone] = React.useState(true);
    const [isCorrect, setIsCorrect] = React.useState(false);
    //control the code editor
    const onChange = React.useCallback(
        (value: string, viewUpdate: viewUpdate) => {
            console.log('value', value);
            localStorage.setItem('codeState', value);
            setSolution(value);
            const state = viewUpdate.state.toJSON(stateFields);
            localStorage.setItem('progress', JSON.stringify(state));
        },
        []
    );

    //route params
    const params = useParams();

    const modalClass = clsx(
        'absolute',
        !isModal && 'hidden',
        'flex',
        'justify-center',
        'items-center',
        'top-0',
        'right-0',
        'left-0',
        'h-[100%]',
        'w-[100%]'
    );
    //
    const config = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 70,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: '10px',
        height: '10px',
        perspective: '500px',
        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
    };

    const challenge: IChallenge = getChallenge(params.id);
    async function submitCode(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        setIsDone(false);
        console.log(solution);
        const token = getAccessToken();
        const headers = {
            Authorization: token ? `Bearer ${token}` : null,
            // Other headers if needed
        };
        await BaseUrl.post(
            `/solve/${params.id}`,
            { code: solution },
            { headers }
        )
            .then((res) => {
                const { url } = res.data;
                console.log(url);
                setIsModal(true);
                setState((prev) => 'Processing...');
                setTimeout(() => {
                    (async () =>
                        await BaseUrl.get(`/solution/${url}`)
                            .then((res) => {
                                console.log(res.data);
                                const { correct } = res.data;
                                if (correct === undefined) {
                                    toast.error('No solution found');
                                }
                                setIsDone((prev) => !prev);
                                if (correct) {
                                    setIsCorrect(true);
                                    setPassed(true);
                                    setState('Passed🥳🥳🥳');
                                    localStorage.removeItem('codeState');
                                } else {
                                    setIsCorrect(false);
                                    setState('Failed😕😕😕');
                                }

                                setTimeout(() => {
                                    setPassed(false);
                                    setIsModal(false);
                                    setIsDone(true);
                                    setState('Uploading');
                                }, 5000);
                            })
                            .catch((err) => {
                                console.log(err);
                                toast.error(
                                    'Failed to load solution, Server Error'
                                );
                            }))();
                }, 10000);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Server Error');
            });
    }
    if (!challenge) {
        return (
            <div>
                <Header />
                {/* error message incase loading challenge failed */}
                <div className="h-[60%] flex items-center flex-col w-[100vw] mb-8 text-lg text-emerald-950">
                    <div className="flex justify-center items-center h-[40%]">
                        <img
                            src="/internal-server-error.png"
                            alt="error-robot"
                            className="block max-w-[480px] md:max-w-[360px]"
                        />
                    </div>
                    <div className="mb-9 flex-1">
                        <p className="text-center text-base">
                            Sorry Failed to load challenge
                            <Link className="ml-2" to="/">
                                See Other Challenges
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative ">
            <Header />
            <section className="mt-8">
                <h1 className="text-lg font-mono capitalize text-emerald-950 font-bold mb-3">
                    Solve Coding Challenge
                </h1>
                <div className="grid lg:grid-cols-2 gap-10 overflow-hidden h-[72vh] text-emerald-950">
                    {/* left area for the question */}
                    <div className="flex flex-col gap-4 overflow-y-auto text-sm">
                        {/* Title */}

                        <div className="grid gap-2">
                            <Markdown>#### **Title**</Markdown>
                            <Markdown>{challenge.title}</Markdown>
                        </div>
                        <Markdown> #### **Description**</Markdown>
                        <div className="grid gap-2 text-sm">
                            <Markdown>{challenge.description}</Markdown>
                        </div>
                        {/* sample input and sample output*/}
                        <div className="grid gap-2">
                            <Markdown>#### **Output**</Markdown>
                            <SyntaxHighlighter
                                language="javascript"
                                style={docco}
                            >
                                {challenge.output}
                            </SyntaxHighlighter>
                        </div>
                    </div>

                    {/* right area for the code and run test cases section */}
                    <div className="grid gap-2 rounded-lg overflow-hidden">
                        <div className="rounded-lg overflow-y-auto">
                            <CodeEditor
                                onChange={onChange}
                                functionDefinition={
                                    challenge.functionDefinition
                                }
                            />
                        </div>

                        <div className="flex justify-end ">
                            <button
                                onClick={submitCode}
                                className="transition inline-flex items-center bg-emerald-200 text-emerald-800 border-emerald-800 py-2 px-4 focus:outline-none hover:bg-rose-500 hover:text-rose-50 hover:border-rose-900 rounded text-base my-4 md:mt-0 shadow-sm hover:shadow"
                            >
                                Submit Code
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className={modalClass}>
                {/* modal */}
                <div className="h-[240px] w-[240px] flex relative justify-center opacity-90 items-center text-base rounded-md shadow-lg bg-emerald-500 text-emerald-950">
                    <div className="flex flex-col items-center gap-1 ">
                        {/* <span className="rounded-full h-8 w-8 block bg-sky-800"></span> */}

                        {isDone ? (
                            <>
                                {isCorrect ? (
                                    <MdVerified className="text-2xl  text-emerald-950 mb-1" />
                                ) : (
                                    <MdSmsFailed className="text-2xl  text-red-700 mb-1" />
                                )}
                            </>
                        ) : (
                            <TailSpin
                                height="48"
                                width="48"
                                radius="3"
                                color="white"
                                ariaLabel="loading"
                            />
                        )}

                        <small className="text-slate-50 font-medium">
                            {state}
                        </small>
                    </div>
                    {/* close button */}
                    <Confetti active={passed} config={config} />
                    <button
                        onClick={() => setIsModal(false)}
                        className="absolute top-2 right-2 transition inline-flex items-center rounded-full p-1 focus:outline-none hover:bg-rose-500 border border-rose-950 bg-rose-500 text-rose-950 hover:border-rose-500 hover:text-rose-100 text-base my-4 md:mt-0 shadow-sm hover:shadow"
                    >
                        <AiOutlineClose />
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SolvePage;
