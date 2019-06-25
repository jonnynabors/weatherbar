require("dotenv").config();
import * as vscode from "vscode";
import { Weather } from "./weather";
import { weatherData } from "./data";
import { getWeather } from "./network";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "weatherbar" is now active!');
  let statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    20000
  );

  let disposable = vscode.commands.registerCommand(
    "extension.weatherBar",
    async () => {
      // TODO: Make this request on a timer
      // TODO: Investigate various config options for frequency of API call
      // TODO: Actually make the API work
      const identifier = weatherData.weather[0].main;
      console.log(
        "zip code",
        await getWeather(
          vscode.workspace.getConfiguration("weatherBar.config").get("name")
        )
      );
      //   @ts-ignore
      statusBarItem.text = Weather[identifier];
      statusBarItem.show();
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
