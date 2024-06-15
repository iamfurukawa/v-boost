import * as vscode from 'vscode';
import InlineSuggestionProvider from './providers/inline-suggestion.provider';
import VBoostViewProvider from './views/configuration/configuration.view';

export function activate(context: vscode.ExtensionContext) {

    const configurationView = vscode.window.registerTreeDataProvider('vboostView', new VBoostViewProvider(context));
    const codeCompletitionProvider = vscode.languages.registerInlineCompletionItemProvider({ scheme: '*' }, new InlineSuggestionProvider());

    context.subscriptions.push(configurationView, codeCompletitionProvider);
}

export function deactivate() { }
