import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.generateFiles",
    async () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage(
          "Please open a workspace folder to generate files."
        );
        return;
      }

      const folderPath = workspaceFolders[0].uri.fsPath;

      const featureName = await vscode.window.showInputBox({
        prompt: "Enter the feature name",
      });
      if (!featureName) return;

      const featurePath = path.join(folderPath, featureName);

      // File templates
      const templates = [
        {
          name: `${featureName}_bloc.dart`,
          content: `class ${featureName}Bloc {}`,
        },
        {
          name: `${featureName}_event.dart`,
          content: `class ${featureName}Event {}`,
        },
        {
          name: `${featureName}_state.dart`,
          content: `class ${featureName}State {}`,
        },
      ];

      try {
        // Create directory
        fs.mkdirSync(featurePath, { recursive: true });

        // Generate files
        templates.forEach((template) => {
          const filePath = path.join(featurePath, template.name);
          fs.writeFileSync(filePath, template.content);
        });

        vscode.window.showInformationMessage(
          `Files for "${featureName}" generated successfully.`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
