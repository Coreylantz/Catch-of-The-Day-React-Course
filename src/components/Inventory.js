import React from "react";
import PropTypes from "prop-types"
import firebase from 'firebase';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";


class Inventory extends React.Component {
  static propsTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeId: PropTypes.string,
  }

  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({user});
      }
    })
  }

  authHandler = async authData => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, {context: this});
    console.log(store);
    // 2. claim it if there is no owner
    if(!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. Set the state of the inventory component to the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({uid: null})
  }

  render() {
    const logout = <button onClick={this.logout}>Logout</button>
    // check if user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    // check if user is not owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
      <div>
        <p>Sorry you are not the owner</p>
        {logout}
      </div>)
    }

    // User must be owner render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} fish={this.props.fishes[key]} />)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>

    )
  }
}

export default Inventory;