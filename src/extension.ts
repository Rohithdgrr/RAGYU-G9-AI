import * as vscode from 'vscode';
import { G9AIChatProvider } from './G9AIChatProvider';

export function activate(context: vscode.ExtensionContext) {
  const chatProvider = new G9AIChatProvider(context);

  const chatView = vscode.window.registerWebviewViewProvider(
    'g9ai.chatView',
    chatProvider,
    {
      webviewOptions: {
        retainContextWhenHidden: true
      }
    }
  );

  const openChatCommand = vscode.commands.registerCommand(
    'g9ai.openChat',
    () => {
      vscode.commands.executeCommand('workbench.view.extension.g9ai-container');
    }
  );

  const newChatCommand = vscode.commands.registerCommand(
    'g9ai.newChat',
    () => {
      chatProvider.newChat();
    }
  );

  context.subscriptions.push(chatView, openChatCommand, newChatCommand);

  console.log('G9 AI extension is now active!');
}

export function deactivate() {
  console.log('G9 AI extension is deactivated');
}
