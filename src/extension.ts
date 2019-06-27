require("dotenv").config();
import * as vscode from "vscode";
import { Weather } from "./weather";
import { getWeather, WeatherData } from "./network";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "weatherbar" is now active!');
  let statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    20000
  );
  statusBarItem.text = Weather["Default"];

  // The function below is executed on a manual invocation of Weather Bar
  let disposable = vscode.commands.registerCommand(
    "extension.weatherBar",
    async () => {
      const zipCode = vscode.workspace
        .getConfiguration("weatherBar")
        .get("zipCode");
      // add validation to ensure user has configured a 5 character ZIP
      if (typeof zipCode !== "number" || zipCode.toString().length !== 5) {
        vscode.window.showErrorMessage(
          `WeatherBar: The ZIP Code ${zipCode} is invalid.`
        );
        return;
      }

      try {
        const currentWeather = (await getWeather(zipCode)) as [WeatherData];
        //   @ts-ignore
        statusBarItem.text = `${Weather[currentWeather[0].main]} ${
          currentWeather[0].description
        }`;
      } catch (error) {
        console.error("Error occurred while fetching weather for zip", zipCode);
        // TODO: HANDLE ERRORS
      }

      statusBarItem.show();
    }
  );

  vscode.commands.executeCommand("extension.weatherBar");
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
