import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
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
        name: "",
        email: "",
        usageCount: 0,
        joined: "",
      },
    };
  }

  deleteUser = () => {
    fetch("http://localhost:3001/delete", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: this.state.user.email }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  resetHomePage = () => {
    this.setState({ boxes: [] });
    this.setState({ imageUrl: "" });
  };

  updateUser = (userState) => {
    this.setState({
      user: {
        name: userState.name,
        email: userState.email,
        usageCount: userState.usage_count,
        joined: userState.joined,
      },
    });
  };

  incrementCounter = () => {
    fetch("http://localhost:3001/detect", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: this.state.user.email }),
    })
      .then((response) => response.json())
      .then((usage_count) => {
        this.setState(
          Object.assign(this.state.user, {
            usageCount: usage_count,
          })
        );
      })
      .catch((error) => console.log("error", error));
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
    this.setState({ boxes: boxes });
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
      .then((result) => {
        if (result.outputs[0].data.regions) {
          this.incrementCounter();
          this.calculateFaceLocation(result);
        } else {
          console.error(result.outputs[0].data.regions);
        }
      })
      .catch((error) => console.log("error", error));
  };

  changeInputState = (event) => {
    this.setState({ input: event.target.value });
  };

  detectFaces = () => {
    this.setState({ imageUrl: this.state.input });
    this.fetchData();
  };

  changeRoute = (page) => {
    this.setState({ route: page });
  };

  render() {
    let { imageUrl, boxes, route, user } = this.state;
    if (route === "signin") {
      return (
        <div>
          <Logo />
          <SignIn changeRoute={this.changeRoute} updateUser={this.updateUser} />
        </div>
      );
    } else if (route === "register") {
      return (
        <div>
          <Logo />
          <Register
            changeRoute={this.changeRoute}
            updateUser={this.updateUser}
          />
        </div>
      );
    } else if (route === "home") {
      return (
        <div className="center">
          <div className="home-navigation">
            <Logo />
            <Navigation
              changeRoute={this.changeRoute}
              resetHomePage={this.resetHomePage}
              deleteUser={this.deleteUser}
            />
          </div>
          <h2>
            Hi {user.name}! You have used the service {user.usageCount} times
          </h2>
          <ImageLink
            changeInputState={this.changeInputState}
            detectFaces={this.detectFaces}
          />
          <FaceDetect imageUrl={imageUrl} boxes={boxes} />
        </div>
      );
    }
  }
}

export default App;
