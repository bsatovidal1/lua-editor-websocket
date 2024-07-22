/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from "vscode";
import {
  RegisteredFileSystemProvider,
  registerFileSystemOverlay,
  RegisteredMemoryFile,
} from "@codingame/monaco-vscode-files-service-override";
import React from "react";
import type { TextChanges } from "@typefox/monaco-editor-react";
import { MonacoEditorReactComp } from "@typefox/monaco-editor-react";
import { useWorkerFactory } from "monaco-editor-wrapper/workerFactory";
import { MonacoEditorLanguageClientWrapper } from "monaco-editor-wrapper";
import { createUserConfig } from "./config";
import { LuaScript } from "./testLuaCode";
import { registerLanguage } from "./registerLanguage";
import { registerFormatting } from "./registerFormatting";
import { LineEndings, QuoteStyle } from "stylua-wasm";

export const useConfigureMonacoWorkers = () => {
  useWorkerFactory({
    ignoreMapping: true,
    workerLoaders: {
      editorWorkerService: () =>
        new Worker(
          new URL(
            "monaco-editor/esm/vs/editor/editor.worker.js",
            import.meta.url
          ),
          { type: "module" }
        ),
    },
  });
};

type Props = {};

export const LuaEditor: React.FC<Props> = () => {
  const testLuaUri = vscode.Uri.file("/workspace/test.lua");
  const fileSystemProvider = new RegisteredFileSystemProvider(false);
  fileSystemProvider.registerFile(
    new RegisteredMemoryFile(testLuaUri, LuaScript)
  );
  registerFileSystemOverlay(1, fileSystemProvider);

  const onTextChanged = (textChanges: TextChanges) => {
    console.log(
      `Dirty? ${textChanges.isDirty}\ntext: ${textChanges.main}\ntextOriginal: ${textChanges.original}`
    );
  };
  registerLanguage();
  registerFormatting({
    // Stylua's `ident_width` and `ident_type` will be set by monaco editor's
    // `tabSize` and `use_spaces`.
    column_width: 80,
    line_endings: LineEndings.Unix,
    quote_style: QuoteStyle.AutoPreferSingle,
    no_call_parentheses: false,
  });

  // const htmlElement = document.getElementById("monaco-editor-root");
  const comp = (
    <MonacoEditorReactComp
      userConfig={createUserConfig(
        "/workspace",
        LuaScript,
        "/workspace/test.lua"
      )}
      style={{
        paddingTop: "5px",
        height: "80vh",
      }}
      onTextChanged={onTextChanged}
      onLoad={(wrapper: MonacoEditorLanguageClientWrapper) => {
        console.log(`Loaded ${wrapper.reportStatus().join("\n").toString()}`);
      }}
      onError={(e) => {
        console.error(e);
      }}
    />
  );
  // ReactDOM.createRoot(htmlElement!).render(<StrictMode>{comp}</StrictMode>);
  return comp;
};
