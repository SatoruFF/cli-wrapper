import { parseJSON } from "../utils/parseJson";

const Settings = ({ setConfig }: any) => {
  let fileName;
  const loadConfig = async (e: any) => {
    const file = e.target.files[0];
    fileName = file?.name;
    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const content = event?.target?.result;
        try {
          const jsonData = parseJSON(content);
          setConfig(jsonData);
        } catch (error) {
          console.error("Error with parse JSON:", error);
        }
      };

      reader.readAsText(file);
    }
  };
  return (
    <section>
      <h2>Select config</h2>
      <input type="file" accept=".json" onChange={loadConfig} />
      {fileName && <p>Выбранный конфиг: {fileName}</p>}
    </section>
  );
};

export default Settings;
