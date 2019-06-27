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
        .get("zipCode") as number;

      // add validation to ensure user has configured a 5 character ZIP
      if (zipCode.toString().length !== 5) {
        vscode.window.showErrorMessage(
          `WeatherBar: The ZIP Code ${zipCode} is invalid.`
        );
        return;
      }

      await showWeatherAsEmoji(zipCode, statusBarItem);

      const intervalInMinutes = vscode.workspace
        .getConfiguration("weatherBar")
        .get("intervalInMinutes") as number;

      if (intervalInMinutes !== undefined) {
        // user has set an interval
        setInterval(async () => {
          await showWeatherAsEmoji(zipCode, statusBarItem);
        }, intervalInMinutes * 60000);

        // DO SOME MINUTES TO SECONDS FOO
      }
      // if interval is set, check weather on that interval
      // define minimum interval
    }
  );

  vscode.commands.executeCommand("extension.weatherBar");
  context.subscriptions.push(disposable);
}

async function showWeatherAsEmoji(
  zipCode: number,
  statusBarItem: vscode.StatusBarItem
) {
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

// this method is called when your extension is deactivated
export function deactivate() {}
