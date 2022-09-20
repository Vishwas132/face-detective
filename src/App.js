import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/SignOut/SignOut";
import Logo from "./components/Logo/Logo";
import ImageLink from "./components/ImageLink/ImageLink";
import FaceDetect from "./components/FaceDetect/FaceDetect";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signin",
      user: {
        id: "",
        name: "",
        email: "",
        usageCounter: 0,
        joined: "",
      },
    };
  }

  updateUser = (userState) => {
    this.setState({ user: userState });
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  calculateFaceLocation = (result) => {
    const clarifaiFaces = result.outputs[0].data.regions.map(
      (region) => region.region_info.bounding_box
    );
    const image = document.querySelector("#input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = clarifaiFaces.map((clarifaiFace) => {
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
    this.displayFaceBox(boxes);
  };

  fetchData = () => {
    const USER_ID = "vishwas_123";
    const PAT = "66090fdf83e14d509c71fe13b037d26a";
    const APP_ID = "bff0a5af8ec9411d8ef77bd3f7ba363f";
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.calculateFaceLocation(result))
      .catch((error) => console.log("error", error));
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    this.fetchData();
  };

  onRouteChange = (page) => {
    this.setState({ route: page });
  };

  render() {
    let { imageUrl, boxes, route } = this.state;
    if (route === "signin") {
      return (
        <div>
          <Logo />
          <SignIn onRouteChange={this.onRouteChange} updateUser={this.updateUser} />
        </div>
      );
    } else if (route === "register") {
      return (
        <div>
          <Logo />
          <Register
            onRouteChange={this.onRouteChange}
            updateUser={this.updateUser}
          />
        </div>
      );
    } else if (route === "home") {
      return (
        <div className="center">
          <div className="home-navigation">
            <Logo />
            <Navigation onRouteChange={this.onRouteChange} />
          </div>
          <ImageLink
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceDetect imageUrl={imageUrl} boxes={boxes} />
        </div>
      );
    }
  }
}

export default App;
