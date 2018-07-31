import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import firebase from "../firebase.js";
import GeoFire from "geofire";

const FormItem = Form.Item;

class AddFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = event => {
    event.preventDefault();
    const farmRef = firebase.database().ref("Farms");
    const geofire = new GeoFire(firebase.database().ref("Locations"));
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let loc = values["location"];
        let key = farmRef.push(values).key;
        this.props.geocoder.geocode({ address: loc }, function(
          results,
          status
        ) {
          if (status === "OK") {
            geofire
              .set(key, [
                results[0].geometry.location.lat(),
                results[0].geometry.location.lng()
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
              "Geocode was not successful for the following reason: " + status
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

const WrappedAddFarm = Form.create()(AddFarm);

export default WrappedAddFarm;
