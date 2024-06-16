import * as vscode from 'vscode';
import InlineSuggestionProvider from './providers/boost-inline-suggestion.provider';
import VBoostViewProvider from './views/vboost.view';
import ExplainCodeLensProvider from './providers/explain-code-lens.provider';

export function activate(context: vscode.ExtensionContext) {

    vscode.commands.registerCommand('vboost.explainCode', (code: string) => {
        vscode.window.showInformationMessage(`Explicação do código: ${code}`);
    });

    const codeLensProvider = vscode.languages.registerCodeLensProvider({ language: '*' }, new ExplainCodeLensProvider());
    const configurationView = vscode.window.registerWebviewViewProvider('vboostView', new VBoostViewProvider(context));
    const codeCompletitionProvider = vscode.languages.registerInlineCompletionItemProvider({ scheme: '*' }, new InlineSuggestionProvider());

    context.subscriptions.push(codeLensProvider, configurationView, codeCompletitionProvider);
}

export function deactivate() { }
