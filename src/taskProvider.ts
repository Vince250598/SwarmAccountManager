import * as vscode from 'vscode';

export class TaskProvider implements vscode.TreeDataProvider<TreeTask> {

    constructor(private context: vscode.ExtensionContext){}

    public async getChildren(task?: TreeTask): Promise<TreeTask[]> {

        let tasks = await 


    }



}

class TreeTask extends vscode.TreeItem {

    url: string;

    constructor(
        url: string,
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.url = url;
    }

}

function fetchTasks(developerID: number) {
    
	const query = `query tasks($id: Int){
		tasks(developerId: $id) {
			
		}
	}`
	const variables = {
		id: developerID
	}

	request(SERVERURL, query, variables).then(data => {_
		if(!data){
			vscode.window.showErrorMessage("Invalid Username");
		}else {
			//display tasks
			vscode.window.createTreeView
		}
	});
}