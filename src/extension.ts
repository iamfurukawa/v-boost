import * as vscode from 'vscode';
import InlineSuggestionProvider from './inline-suggestion-provider';

let timeout: NodeJS.Timeout | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {

    const codeCompletitionProvider = vscode.languages.registerInlineCompletionItemProvider({ scheme: '*' }, new InlineSuggestionProvider());

    const textChangeListener = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
        console.log('textChangeListener')
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            // Sua ação a ser executada após 2 segundos de pausa na digitação
            console.log('Usuário parou de digitar por 5 segundos.');
            vscode.window.showInformationMessage('Usuário parou de digitar por 5 segundos.');
        }, 5000);
    });

    context.subscriptions.push(codeCompletitionProvider, textChangeListener);
}

export function deactivate() { }
