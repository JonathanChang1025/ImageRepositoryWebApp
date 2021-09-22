import './App.css';
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import UploadImagePage from "./UploadImagePage";
import MyImagesPage from "./MyImagesPage";

function App() {

  return (
    <div className="App">
      <Header setUserData/>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/myimages" component={ MyImagesPage } />
        <Route path="/uploadimage" component={ UploadImagePage } />
      </Switch>
    </div>
  );
}

export default App;
