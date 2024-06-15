import * as vscode from 'vscode';
import InlineSuggestionProvider from './providers/inline-suggestion.provider';
import VBoostViewProvider from './views/vboost.view';

export function activate(context: vscode.ExtensionContext) {

    const configurationView = vscode.window.registerWebviewViewProvider('vboostView', new VBoostViewProvider(context));
    const codeCompletitionProvider = vscode.languages.registerInlineCompletionItemProvider({ scheme: '*' }, new InlineSuggestionProvider());

    context.subscriptions.push(configurationView, codeCompletitionProvider);
}

export function deactivate() { }
