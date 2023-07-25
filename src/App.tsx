import { Button, Panel } from "@cjrojasb/personal-ui-package";

function App() {
  return (
    <Panel className="bg-white">
      <h1 className="text-3xl font-bold underline text-blue-300">
        Hello world!
      </h1>
      <Button variation="primary" className="p-5">
        Primary
      </Button>
    </Panel>
  );
}

export default App;
