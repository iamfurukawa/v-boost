import * as vscode from 'vscode';

class AuthorizedPage {

    constructor(readonly webview: vscode.Webview, readonly extensionUri: vscode.Uri) {}

    getHtml(): string {
        const styleResetUri = this.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'reset.css'));
        const styleVSCodeUri = this.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'vscode.css'));
        const styleMainUri = this.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'authorized.css'));

        return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>VBoost</title>
          <link href="${styleResetUri}" rel="stylesheet">
          <link href="${styleVSCodeUri}" rel="stylesheet">
          <link href="${styleMainUri}" rel="stylesheet">
        </head>
        <body>
          <h1>VBoost</h1>
          <p class="poweredBy">powered by OpusBoost</p>
          <button onclick="logout()">Deseja sair?</button>
          <script>
            const vscode = acquireVsCodeApi();
            function logout() {
              vscode.postMessage({ command: 'logout' });
            }
          </script>
        </body>
        </html>
      `;
    }
}

export default AuthorizedPage;