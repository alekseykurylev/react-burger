import AppHeader from "../app-header/app-header";
import Constructor from "../page/constructor/constructor";
import "../../styles/global.module.scss";
import { data } from "../../utils/data";

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <Constructor data={data} />
      </main>
    </>
  );
}

export default App;
