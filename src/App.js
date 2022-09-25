import "./App.css";
import React, { Component } from "react";
import Logo from "./components/Logo/Logo";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "signin",
      user: {
        name: "",
        email: "",
        usageCount: 0,
        joined: "",
      },
    };
  }

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

  incrementCount = (usage_count) => {
    this.setState(
      Object.assign(this.state.user, {
        usageCount: usage_count,
      })
    );
  };

  render() {
    let { route, user } = this.state;
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
        <HomePage
          user={user}
          changeRoute={this.changeRoute}
          incrementCount={this.incrementCount}
        />
      );
    }
  }
}

export default App;
