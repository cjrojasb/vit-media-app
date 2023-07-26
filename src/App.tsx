import { Panel } from "@cjrojasb/personal-ui-package";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="container m-auto py-4">
      <Panel className="">
        <UserList />
      </Panel>
    </div>
  );
}

export default App;
