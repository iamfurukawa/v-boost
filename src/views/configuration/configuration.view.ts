import * as vscode from 'vscode';

class VBoostItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly contextValue: string,
        public readonly additionalProps?: { [key: string]: any }
    ) {
        super(label, collapsibleState);
        this.contextValue = contextValue;
        if (additionalProps) {
            Object.assign(this, additionalProps);
        }
    }
}

class VBoostViewProvider implements vscode.TreeDataProvider<VBoostItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<VBoostItem | undefined | void> = new vscode.EventEmitter<VBoostItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<VBoostItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private context: vscode.ExtensionContext) { }

    getTreeItem(element: VBoostItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: VBoostItem): Thenable<VBoostItem[]> {
        const config = vscode.workspace.getConfiguration('vboost.formData');
        const apiKey = config.get<string>('apiKey');

        if (apiKey) {
            return Promise.resolve(this.getAuthorizedItems());
        } else {
            return Promise.resolve(this.getUnauthorizedItems());
        }
    }

    private getUnauthorizedItems(): VBoostItem[] {
        return [
            new VBoostItem('VBoost', vscode.TreeItemCollapsibleState.None, 'h1'),
            new VBoostItem('powered by OpusBoost', vscode.TreeItemCollapsibleState.None, 'h3', { italic: true }),
            new VBoostItem('email', vscode.TreeItemCollapsibleState.None, 'span'),
            new VBoostItem('', vscode.TreeItemCollapsibleState.None, 'input', { inputType: 'text' }),
            new VBoostItem('password', vscode.TreeItemCollapsibleState.None, 'span'),
            new VBoostItem('', vscode.TreeItemCollapsibleState.None, 'input', { inputType: 'password' }),
            new VBoostItem('entrar', vscode.TreeItemCollapsibleState.None, 'button')
        ];
    }

    private getAuthorizedItems(): VBoostItem[] {
        return [
            new VBoostItem('VBoost', vscode.TreeItemCollapsibleState.None, 'h1'),
            new VBoostItem('powered by OpusBoost', vscode.TreeItemCollapsibleState.None, 'h3', { italic: true }),
            new VBoostItem('você já está autorizado', vscode.TreeItemCollapsibleState.None, 'p'),
            new VBoostItem('sair', vscode.TreeItemCollapsibleState.None, 'button')
        ];
    }
}

export default VBoostViewProvider;