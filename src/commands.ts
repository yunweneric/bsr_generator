import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

class ExtensionCommands {
  static generateBlocs(
    featureName: string,
    folderPath: string,
    featurePath: string
  ) {
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
}
