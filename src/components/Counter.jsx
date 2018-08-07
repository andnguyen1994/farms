import React, { Component } from "react";
import { connect } from "react-redux";
import { click } from "../Actions/AcionTest";
import { Form } from "antd";

const mapStateToProps = state => {
  return { count: state.counterReducer.count };
};

const mapDispatchToProps = dispatch => {
  return {
    click: (clickType, value) => dispatch(click(clickType, value))
  };
};

class ConnectedCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleInc = event => {
    event.preventDefault();
    this.props.click("INC", Number(this.state.value));
  };

  handleDec = event => {
    event.preventDefault();
    this.props.click("DEC", Number(this.state.value));
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Counter: {this.props.count}</h1>
        <button onClick={this.handleInc}>Increment</button>
        <button onClick={this.handleDec}>Decrement</button>
        <form>
          <input type="number" onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

const Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ConnectedCounter));

export default Counter;
