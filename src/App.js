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
      imageUrl: "",
      faceBoxes: [],
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
    this.setState({ faceBoxes: [] });
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

  changeRoute = (page) => {
    this.setState({ route: page });
  };

  changeInputState = (event) => {
    this.setState({ imageUrl: event.target.value });
  };

  calculateFaceLocation = (apiResult) => {
    const clarifaiFaces = apiResult.map(
      (region) => region.region_info.bounding_box
    );
    const image = document.querySelector("#input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    const faceBoxes = clarifaiFaces.map((clarifaiFace) => {
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
    this.setState({ faceBoxes: faceBoxes });
  };

  detectFaces = () => {
    fetch("http://localhost:3001/detect", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.user.email,
        imageUrl: this.state.imageUrl,
      }),
    })
      .then((response) => response.json())
      .then(({ usage_count, apiResult }) => {
        this.calculateFaceLocation(apiResult);
        this.setState(
          Object.assign(this.state.user, {
            usageCount: usage_count,
          })
        );
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    let { imageUrl, faceBoxes, route, user } = this.state;
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
          <FaceDetect imageUrl={imageUrl} faceBoxes={faceBoxes} />
        </div>
      );
    }
  }
}

export default App;
