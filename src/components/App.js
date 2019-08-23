import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import base from '../base';

import sampleFishes from  "../sample-fishes";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)});
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  };

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(
      params.storeId, 
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    // use this to clean up 
    base.removeBinding(this.ref);
  };


  addFish = fish => {
    // take a copy of fishes state
    const fishes = {...this.state.fishes};
    // Add our fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // Update our steate object
    this.setState({fishes})
  };

  updateFish = (key, updateFish) => {
    // Take a copy of the current state
    const fishes = {...this.state.fishes};
    // update the state
    fishes[key] = updateFish;
    // Set that to state
    this.setState({fishes});
  }

  deleteFish = key => {
    // Take a copy of state
    const fishes = {...this.state.fishes};
    // update the state
    fishes[key] = null;
    // update state
    this.setState({fishes});
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }

  addToOrder = (key) => {
    // Take a copy of state
    const order = {...this.state.order}
    // Add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // Call setState to update our state object
    this.setState({order});
  }

  removeFromOrder = key => {
    // Take a copy of state
    const order = {...this.state.order};
    // Remove from order or update the number in our order
    delete order[key];
    // Set state
    this.setState({order});
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu"> 
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key} 
                addToOrder={this.addToOrder} 
                details={this.state.fishes[key]}
                index={key} />
            ))}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder} />
        <Inventory 
          loadSampleFishes={this.loadSampleFishes} 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          fishes={this.state.fishes} />
      </div>
    )
  }
}

export default App;