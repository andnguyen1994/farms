import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import { farmRef, locationRef } from "API/databases.js";
import GeoFire from "geofire";
import { connect } from "react-redux";
import { geocode } from "../Actions/Geocode";
import GEOCODE_KEY from "../API/GoogleConfig";

const mapDispatchToProps = dispatch => {
  return {
    geocode: address => dispatch(geocode(address))
  };
};

const FormItem = Form.Item;

class AddFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //TODO: find a way to differentiate geocode request here vs userAddress, add items to list
  handleSubmit = event => {
    event.preventDefault();
    const geofire = new GeoFire(locationRef);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let loc = values["location"];
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${GEOCODE_KEY}`;
        let key = farmRef.push(values).key;
        fetch(url)
          .then(resp => resp.json())
          .then(data => {
            if (data.status === "OK") {
              geofire
                .set(key, [
                  data.results[0].geometry.location.lat,
                  data.results[0].geometry.location.lng
                ])
                .then(
                  function() {
                    console.log("Success!");
                  },
                  function(error) {
                    console.log("Error: " + error);
                  }
                );
            } else {
              alert(
                "Geocode was not successful for the following reason: " +
                  data.status
              );
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Name">
            {getFieldDecorator("name", {
              rules: [
                {
                  type: "string"
                },
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Address">
            {getFieldDecorator("location", {
              rules: [
                {
                  type: "string"
                },
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Website">
            {getFieldDecorator("website", {
              rules: [
                {
                  type: "string"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedAddFarm = connect(
  null,
  mapDispatchToProps
)(Form.create()(AddFarm));

export default WrappedAddFarm;
