"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const graphql_request_1 = require("graphql-request");
const SERVER_URL = 'http://localhost:8080/graphql?';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
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
    let disposable = vscode.commands.registerCommand('extension.swarm-debugging.open', (username) => {
        const account = vscode.window.showQuickPick(['existing account', 'create an account'], {
            placeHolder: 'Do you have a Swarm Debugging account?'
        });
        account.then(function (value) {
            if (value == 'existing account') {
                //login
                openSwarmAccount(context, username);
                console.log('yo');
            }
            else if (value == 'create an account') {
                //create an account
                createSwarmAccount(context, username);
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function createSwarmAccount(context, username) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username) {
            username = (yield vscode.window.showInputBox({ prompt: 'Enter Username' }));
        }
        const query = `mutation developerCreate($user: String!){
		developerCreate(developer:{
			name: $user
		}) {
			id
		}
	}`;
        const variables = {
            user: username
        };
        graphql_request_1.request(SERVER_URL, query, variables).then(data => console.log(data));
    });
}
function openSwarmAccount(context, username) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username) {
            username = (yield vscode.window.showInputBox({ prompt: 'Enter Username' }));
        }
        const query = `query login($user: String!){
		developer(name: $user) {
			id
		}
	}`;
        const variables = {
            user: username
        };
        graphql_request_1.request(SERVER_URL, query, variables).then(data => {
            _;
            if (!data) {
                vscode.window.showErrorMessage("Invalid Username");
            }
            else {
                //display tasks
            }
        });
    });
}
// this method is called when your extension is deactivated
function deactivate() {
    //logout
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map