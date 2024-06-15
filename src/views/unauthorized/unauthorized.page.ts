import * as vscode from 'vscode';

class UnauthorizedPage {

    constructor(readonly webview: vscode.Webview, readonly extensionUri: vscode.Uri) { }

    getHtml(): string {
        const styleResetUri = this.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'reset.css'));
        const styleVSCodeUri = this.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'vscode.css'));
        const styleMainUri = this.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'unauthorized.css'));

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
          <span>E-mail</span>
          <input type="text" id="email">
          <span>Password</span>
          <input type="password" id="password">
          <button onclick="login()">Entrar</button>
          <script>
            const vscode = acquireVsCodeApi();
            function login() {
              const email = document.getElementById('email').value;
              const password = document.getElementById('password').value;
              vscode.postMessage({ command: 'login', email, password });
            }
          </script>
        </body>
        </html>
      `;
    }
}

export default UnauthorizedPage;