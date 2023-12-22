import AppRouter from "./components/AppRouter";
import Page from "./containers/page";

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
