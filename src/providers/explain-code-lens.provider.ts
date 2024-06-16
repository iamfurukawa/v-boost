import * as vscode from 'vscode';

class ExplainCodeLensProvider implements vscode.CodeLensProvider {
    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] {
        const codeLenses: vscode.CodeLens[] = [];
        const regex = /function\s+(\w+)\s*\(/g;
        let match;

        while ((match = regex.exec(document.getText())) !== null) {
            const line = document.lineAt(document.positionAt(match.index).line);
            const range = new vscode.Range(line.range.start, line.range.end);
            codeLenses.push(new vscode.CodeLens(range, {
                title: "Explicar código",
                command: "vboost.explainCode",
                arguments: [document.getText(range)]
            }));
        }

        return codeLenses;
    }

    public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
        return codeLens;
    }
}

export default ExplainCodeLensProvider;