import {
  IWebSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from "vscode-ws-jsonrpc";
import {
  createConnection,
  createServerProcess,
  forward,
} from "vscode-ws-jsonrpc/server";
import { Message } from "vscode-languageserver";
import { resolve } from "path";

// const isInitializeRequest = (message: RequestMessage) =>
//   message.method === InitializeRequest.type.method;

export const launch = (socket: IWebSocket) => {
  const reader = new WebSocketMessageReader(socket);
  const writer = new WebSocketMessageWriter(socket);

  const socketConnection = createConnection(reader, writer, () =>
    socket.dispose()
  );
  const serverConnection = createServerProcess(
    "Lua",
    resolve(
      process.cwd(),
      "server/lua-language-server/bin/lua-language-server/"
    )
  );
  if (serverConnection) {
    forward(socketConnection, serverConnection, (message) => {
      if (Message.isNotification(message)) {
        // message.params.processId = process.pid;
        if (message.method === "testNotification") {
          // handle testNotification
        }
      }
      return message;
    });
  }
};
