import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "weatherbar" is now active!');
  let statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    20000
  );

  //   statusBarItem.command = "extension.weatherBar";

  let disposable = vscode.commands.registerCommand(
    "extension.weatherBar",
    () => {
      statusBarItem.text = "🌞";
      statusBarItem.show();
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
