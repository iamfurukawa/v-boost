import * as vscode from 'vscode';
import AuthorizedPage from './authorized/authorized.page';
import UnauthorizedPage from './unauthorized/unauthorized.page';
import AuthenticationService from '../services/auth.service';

class VBoostViewProvider implements vscode.WebviewViewProvider {
    private webviewView?: vscode.WebviewView;

    constructor(readonly context: vscode.ExtensionContext) { }

    resolveWebviewView(webviewView: vscode.WebviewView) {
        this.webviewView = webviewView;
        webviewView.webview.options = {
            enableScripts: true
        };

        this.updateWebviewContent();

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
        const config = vscode.workspace.getConfiguration('vboost.data');
        const apiKey = config.get<string>('apiKey');

        if (apiKey) {
            return new AuthorizedPage(webview, this.context.extensionUri).getHtml();
        } else {
            return new UnauthorizedPage(webview, this.context.extensionUri).getHtml();
        }
    }

    private updateWebviewContent() {
        if (this.webviewView) {
            this.webviewView.webview.html = this.getHtmlForWebview(this.webviewView.webview);
        }
    }

    private async handleLogin(email: string, password: string) {
        const { apiKey } = await AuthenticationService.signIn(email, password);
        const config = vscode.workspace.getConfiguration();
        config.update('vboost.data', { email, apiKey }, vscode.ConfigurationTarget.Global).then(() => {
            this.updateWebviewContent();
        });
    }

    private handleLogout() {
        const config = vscode.workspace.getConfiguration();
        config.update('vboost.data', { email: '', apiKey: '' }, vscode.ConfigurationTarget.Global).then(() => {
            this.updateWebviewContent();
        });
    }
}

export default VBoostViewProvider;