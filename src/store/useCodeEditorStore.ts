import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { CodeEditorState } from "@/types";
import { create } from "zustand";
import * as monaco from 'monaco-editor';

const getInitialState=()=>{
    if(typeof window === 'undefined'){
        return {
            language: 'javascript',
            fontSize: 17,
            theme: 'vs-dark',
        }
    }

    const language = localStorage.getItem('editor-language') || 'javascript';
    const fontSize = localStorage.getItem('editor-fontSize') || '17';
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
        runCode: async ()=>{}
        
    }
})