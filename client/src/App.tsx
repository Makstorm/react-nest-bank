import AppRouter from "./components/AppRouter";
import Page from "./containers/page";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <Page>
      {/* <PhoneDisplay> */}
      <AppRouter />
      {/* </PhoneDisplay> */}
    </Page>
  );
}

export default App;
