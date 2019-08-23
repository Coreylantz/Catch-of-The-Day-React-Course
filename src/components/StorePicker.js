import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  myInput = React.createRef();

  goToStore = event => {
    // 1. stop from from submitting
    event.preventDefault();
    // 2. get text from input
    // console.log(this.myInput.current.value)
    const storeName = this.myInput.current.value;
    // 3. change the page to /store/whatever
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input 
          type="text" 
          ref={this.myInput}
          required 
          placeholder="Store Name" 
          defaultValue={getFunName()} 
        />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;