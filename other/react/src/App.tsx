import React from "react";
import "./App.css";
import { Card, CardBody, CardButton, CardHeader } from "./components/Card";

function App() {
  return (
    <div className="App">
      <Card>
        <CardHeader variant="youtube">flickr</CardHeader>
        <CardBody>
          <div>
            Explore some of the photos I've taken over the last few years as a
            hobbyist photographer.
          </div>
          <div>
            <a href="http://flickr.com/JeeZeh" target="_blank">
              <CardButton text="explore" />
            </a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
