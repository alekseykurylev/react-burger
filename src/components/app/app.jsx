import "../../styles/global.module.scss";
import AppHeader from "../app-header/app-header";
import Constructor from "../page/constructor/constructor";

const App = () => {
  return (
    <>
      <AppHeader />
      <main>
        <Constructor />
      </main>
    </>
  );
};

export default App;
