"use client";
type Props = {};
import { useConfigureMonacoWorkers, LuaEditor } from "../client/src/main";

export const Editor: React.FC<Props> = () => {
  useConfigureMonacoWorkers();
  // runLuaReact();
  return (
    <div id="editor-container" style={{ height: "100vh", width: "80%" }}>
      <LuaEditor />{" "}
    </div>
  );
};
