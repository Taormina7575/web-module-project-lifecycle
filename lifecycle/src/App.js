import axios from "axios";
import React from "react";
import "./App.css";
import Card from "./components/Card";

class App extends React.Component {
  state = {
    user: {},
    followers: [],
    followersData: [],
    inputValue: ''
  };

  componentDidMount() {
    axios
      .get("https://api.github.com/users/Taormina7575")
      .then((res) => {
        this.setState({
          user: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://api.github.com/users/Taormina7575/followers")
      .then((res) => {
        this.setState({
          followers: res.data,
        });
        this.state.followers.forEach((follower) => {
          axios
            .get(`${follower.url}`)
            .then((res) => {
              this.setState({
                followersData: [...this.state.followersData, res.data],
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({
      user: {},
      followers: [],
      followersData: [],
    })
    axios.get(`https://api.github.com/users/${this.state.inputValue}`)
    .then((res) => {
      console.log(res.data)
      this.setState({
        user: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
    axios
      .get(`https://api.github.com/users/${this.state.inputValue}/followers`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          followers: res.data,
        });
        this.state.followers.forEach((follower) => {
          axios
            .get(`${follower.url}`)
            .then((res) => {
              this.setState({
                followersData: [...this.state.followersData, res.data],
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
      this.setState({
        inputValue: ''
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label> Search User
          <input type='text' placeholder='enter username' value={this.state.inputValue} onChange={this.handleChange}></input>
          </label>
          <button>Submit</button>
        </form>
        <Card props={this.state.user} />
        {this.state.followersData.map((person, idx) => {
          return <Card props={person} key={idx} />;
        })}
      </div>
    );
  }
}
export default App;
