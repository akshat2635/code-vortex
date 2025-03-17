import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { CodeEditorState } from "@/types";
import { create } from "zustand";
import * as monaco from 'monaco-editor';

const getInitialState=()=>{
    if(typeof window === 'undefined'){
        return {
            language: 'javascript',
            fontSize: 14,
            theme: 'vs-dark',
        }
    }

    const language = localStorage.getItem('editor-language') || 'javascript';
    const fontSize = localStorage.getItem('editor-fontSize') || '14';
    const theme = localStorage.getItem('editor-theme') || 'vs-dark';

    return {
        language: language,
        fontSize: Number(fontSize),
        theme: theme,
    }
}

export const useCodeEditorStore = create<CodeEditorState>((set,get)=>{
    const initialState = getInitialState();
    return {
        ...initialState,
        input: '',
        output: '',
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,

        getCode : () => get().editor?.getValue() || '',

        setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => {
            const savedCode=localStorage.getItem(`editor-code-${get().language}`);
            if(savedCode) editor.setValue(savedCode);

            set({editor});
        },
        setTheme: (theme: string) => {
            localStorage.setItem('editor-theme', theme);
            set({theme});
        },
        setInput: (input: string) => set({input}),
        setFontSize: (fontSize: number) => {
            localStorage.setItem('editor-fontSize', fontSize.toString());
            set({fontSize});
        },
        setLanguage: (language: string) => {
            const code = get().editor?.getValue() || '';
            if(code) localStorage.setItem(`editor-code-${get().language}`, code);

            localStorage.setItem('editor-language', language);
            set({language, output: '', error: null, executionResult: null});
        },
        runCode: async ()=>{
            const {language, getCode,input}=get();
            const code=getCode();
            console.log(code);
            if(!code){
                set({error: 'Code is empty!'});
                return;
            }
            set({isRunning: true, error: null, output: '', executionResult: null});

            try {
                const runtime=LANGUAGE_CONFIG[language].pistonRuntime;
                const response=await fetch("https://emkc.org/api/v2/piston/execute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files : [{content: code}],
                        stdin: input
                    })
                });

                const data=await response.json();
                console.log(data);

                if(data.message){
                    set({error: data.message, executionResult: {code, output: "", error:data.message}});
                    return;
                }

                if(data.compile && data.compile.code !==0){
                    const error = data.compile.stderr || data.compile.output;
                    set({error, executionResult: {code, output: "", error}});
                    return;
                }

                if(data.run && data.run.code !==0){
                    const error = data.run.stderr || data.run.output;
                    set({error, executionResult: {code, output: "", error}});
                    return;
                }

                const output = data.run.output;
                set({output:output.trim(),error:null, executionResult: {code, output:output.trim(), error: null}});


            } catch (error) {
                console.log(error);
                set({error: "Error running the code", executionResult: {code, output: "", error: "Error running the code"}});
            } finally{
                set({isRunning: false});
            }
        }
        
    }
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;