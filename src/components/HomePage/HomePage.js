import React from "react";
import Navigation from "../Navigation/Navigation";
import ImageLink from "../ImageLink/ImageLink";
import FaceDetect from "../FaceDetect/FaceDetect";
import Logo from "../Logo/Logo";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      imageUrl: "",
      faceBoxes: [],
    };
  }

  changeInputState = (event) => {
    this.setState({ imageUrl: event.target.value });
  };

  resetHomePage = () => {
    this.setState({ faceBoxes: [] });
    this.setState({ imageUrl: "" });
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
    fetch(`${process.env.REACT_APP_BASE_URL}/detect`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.props.user.email,
        imageUrl: this.state.imageUrl,
      }),
    })
      .then((response) => response.json())
      .then(({ usage_count, apiResult }) => {
        if (usage_count && apiResult) {
          this.calculateFaceLocation(apiResult);
          this.props.incrementCount(usage_count);
        } else {
          throw Error("API result undefined");
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { user, changeRoute } = this.props;
    return (
      <div className="center">
        <div className="home-navigation">
          <Logo />
          <Navigation
            changeRoute={changeRoute}
            resetHomePage={this.resetHomePage}
            email={user.email}
          />
        </div>
        <h2>
          Hi {user.name}! You have used the service {user.usageCount} times
        </h2>
        <ImageLink
          changeInputState={this.changeInputState}
          detectFaces={this.detectFaces}
        />
        <FaceDetect
          imageUrl={this.state.imageUrl}
          faceBoxes={this.state.faceBoxes}
        />
      </div>
    );
  }
}

export default HomePage;
