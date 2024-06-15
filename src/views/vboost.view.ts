import * as vscode from 'vscode';
import AuthorizedPage from './authorized/authorized.page';
import UnauthorizedPage from './unauthorized/unauthorized.page';

class VBoostViewProvider implements vscode.WebviewViewProvider {
    constructor(readonly context: vscode.ExtensionContext) { }

    resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = {
            enableScripts: true
        };

        webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'login':
                    this.handleLogin(message.email, message.password);
                    return;
                case 'logout':
                    this.handleLogout();
                    return;
            }
        });
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const config = vscode.workspace.getConfiguration('vboost.formData');
        const apiKey = config.get<string>('apiKey');

        if (apiKey) {
            return new AuthorizedPage(webview, this.context.extensionUri).getHtml();
        } else {
            return new UnauthorizedPage(webview, this.context.extensionUri).getHtml();
        }
    }


    private handleLogin(email: string, password: string) {
        // Simulate API key retrieval
        const apiKey = 'dummy-api-key';
        const config = vscode.workspace.getConfiguration();
        config.update('vboost.formData', { email, apiKey }, vscode.ConfigurationTarget.Global);
        vscode.commands.executeCommand('workbench.action.reloadWindow');
    }

    private handleLogout() {
        const config = vscode.workspace.getConfiguration();
        config.update('vboost.formData', { email: '', apiKey: '' }, vscode.ConfigurationTarget.Global);
        vscode.commands.executeCommand('workbench.action.reloadWindow');
    }
}

export default VBoostViewProvider;