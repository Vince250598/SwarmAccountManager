// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { request } from 'graphql-request'

const SERVER_URL = 'http://localhost:8080/graphql?';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	/*let disposable = vscode.commands.registerCommand('extension.swarm-debugging.open', (user?: string) => {
		//connect to server and fetch user and later password
		openSwarmAccount(context, user);
	});

	context.subscriptions.push(disposable);*/

	let disposable = vscode.commands.registerCommand('extension.swarm-debugging.open', (username?: string) => {
		const account = vscode.window.showQuickPick(['existing account', 'create an account'], {
			placeHolder: 'Do you have a Swarm Debugging account?'
		});

		account.then(function(value) {
			if(value == 'existing account'){
				//login
				openSwarmAccount(context, username)
				console.log('yo');
			} else if(value == 'create an account'){
				//create an account
				createSwarmAccount(context, username)
			}
		})

	})

	context.subscriptions.push(disposable);
}

async function createSwarmAccount(context: vscode.ExtensionContext, username?: string) {
	if(!username) {
		username = (await vscode.window.showInputBox({prompt: 'Enter Username'}))
	}

	const query = `mutation developerCreate($user: String!){
		developerCreate(developer:{
			name: $user
		}) {
			id
		}
	}`

	const variables = {
		user: username
	}

	request(SERVER_URL, query, variables).then(data =>
		console.log(data));
}

async function openSwarmAccount(context: vscode.ExtensionContext, username?: string) {
	if(!username) {
		username = (await vscode.window.showInputBox({prompt: 'Enter Username'}))
	}

	const query = `query login($user: String!){
		developer(name: $user) {
			id
		}
	}`
	const variables = {
		user: username
	}

	request(SERVER_URL, query, variables).then(data => {_
		if(!data){
			vscode.window.showErrorMessage("Invalid Username");
		}else {
			//display tasks
			
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {
	//logout
}
