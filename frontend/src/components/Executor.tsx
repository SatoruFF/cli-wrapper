import { useState, useEffect } from "react";
import { GetTags, ExecuteCommand } from "../../wailsjs/go/main/App";

const Executor = ({ config }: any) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (config?.projects?.builder?.projectPath) {
      GetTags(config.projects.builder.projectPath, 10)
        .then((tags) => setTags(tags))
        .catch((err) => console.error("Error fetching tags:", err));
    }
  }, [config]);

  const handleExecute = () => {
    if (selectedTag && config?.projects?.builder?.commands) {
      const commandArgs = config.projects.builder.commands.map((arg: string) =>
        arg.replace("{{version}}", selectedTag)
      );
      ExecuteCommand(commandArgs[0], commandArgs.slice(1))
        .then((output) => console.log("Command output:", output))
        .catch((err) => console.error("Error executing command:", err));
    }
  };

  return (
    <section>
      <h2>Executor</h2>
      <div>
        <label>Select Tag:</label>
        <select onChange={(e) => setSelectedTag(e.target.value)}>
          <option value="">Select a tag</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleExecute} disabled={!selectedTag}>
        Run Command
      </button>
    </section>
  );
};

export default Executor;
