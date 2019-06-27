import * as vscode from 'vscode';

export class DevTasksProvider implements vscode.TreeDataProvider<Task>{

private _OnDidChangeTreeData: vscode.EventEmitter<Task | undefined> = new vscode.EventEmitter<Task | undefined>();
readonly onDidChangeTreeData: vscode.Event<Task | undefined> = this._OnDidChangeTreeData.event;

constructor(){
}

refresh(): void {
    this._OnDidChangeTreeData.fire();
}

getTreeItem(element: Task): vscode.TreeItem {
    return element;
}

getChildren(element?: Task): Thenable<Task[]> {

    if(element) {
        return Promise.resolve()
    }

}


}

export class Task extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        private title: string,
        private url: string,
        private product: Product,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return `${this.label}-${this.url}`;
    }

    get description(): string {
        return this.title;
    }

    contextValue = 'task';

}

class Product {
    constructor(private name: string){
    }
}