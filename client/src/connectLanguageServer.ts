// import { listen } from "@codingame/monaco-jsonrpc";
// import {
//   CloseAction,
//   ErrorAction,
//   MonacoLanguageClient,
//   createConnection,
// } from "@codingame/monaco-languageclient";
// // import { MonacoLanguageClient } from "monaco-languageclient";
// // import {
// //   CloseAction,
// //   createConnection,
// //   ErrorAction,
// //   MessageConnection,
// //   MonacoLanguageClient,
// // } from "@codingame/monaco-languageclient";
// import ReconnectingWebSocket from "reconnecting-websocket";
// import { MessageConnection } from "vscode-jsonrpc";

// const createLanguageClient = (connection: MessageConnection) =>
//   new MonacoLanguageClient({
//     name: "Lua Language Client",
//     clientOptions: {
//       documentSelector: ["lua"],
//       // Disable the default error handler.
//       errorHandler: {
//         error: () => ErrorAction.Continue,
//         closed: () => CloseAction.DoNotRestart,
//       },
//     },
//     connectionProvider: {
//       get: (errorHandler, closeHandler) =>
//         Promise.resolve(
//           createConnection(connection, errorHandler, closeHandler)
//         ),
//     },
//   });

// export const connectLanguageServer = (url: string) =>
//   listen({
//     webSocket: new ReconnectingWebSocket(url) as WebSocket,
//     onConnection: (connection) => {
//       const languageClient = createLanguageClient(connection);
//       const disposable = languageClient.start();
//       connection.onClose(() => disposable.dispose());
//     },
//   });
