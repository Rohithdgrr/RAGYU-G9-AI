import * as vscode from 'vscode';
import { getNonce } from './utils';

export class G9AIChatProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly _context: vscode.ExtensionContext) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        this._context.extensionUri
      ]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(
      message => {
        switch (message.type) {
          case 'getConfig':
            this.sendConfig();
            break;
          case 'saveSession':
            this.saveSession(message.data);
            break;
          case 'loadSessions':
            this.loadSessions();
            break;
          case 'deleteSession':
            this.deleteSession(message.sessionId);
            break;
        }
      },
      undefined,
      this._context.subscriptions
    );
  }

  private sendConfig() {
    const config = vscode.workspace.getConfiguration('g9ai');
    const apiKey = config.get<string>('apiKey', '');
    const model = config.get<string>('model', 'gemini-1.5-flash');
    const maxTokens = config.get<number>('maxTokens', 8192);

    this._view?.webview.postMessage({
      type: 'config',
      data: { apiKey, model, maxTokens }
    });
  }

  private saveSession(sessionData: any) {
    const sessions = this._context.globalState.get<any[]>('g9_sessions', []);
    const existingIndex = sessions.findIndex(s => s.id === sessionData.id);

    if (existingIndex >= 0) {
      sessions[existingIndex] = sessionData;
    } else {
      sessions.unshift(sessionData);
    }

    this._context.globalState.update('g9_sessions', sessions);
  }

  private loadSessions() {
    const sessions = this._context.globalState.get<any[]>('g9_sessions', []);
    this._view?.webview.postMessage({
      type: 'sessions',
      data: sessions
    });
  }

  private deleteSession(sessionId: string) {
    const sessions = this._context.globalState.get<any[]>('g9_sessions', []);
    const filtered = sessions.filter(s => s.id !== sessionId);
    this._context.globalState.update('g9_sessions', filtered);
  }

  public newChat() {
    this._view?.webview.postMessage({
      type: 'newChat'
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource};">
  <title>G9 AI</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #000000;
      color: #ffffff;
      overflow: hidden;
    }
    #root {
      width: 100%;
      height: 100vh;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}">
    // VS Code API
    const vscode = acquireVsCodeApi();
    
    // Expose vscode to window for React app
    window.vscode = vscode;
  </script>
  <script nonce="${nonce}" src="${webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'out', 'webview', 'assets', 'index.js'))}"></script>
</body>
</html>`;
  }
}
