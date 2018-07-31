import React, { Component } from "react";
import { Button, Form, Input, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

class UserAddr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Fill in Address"
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.geocoder.geocode(
      { address: this.props.form.getFieldValue("userAddr") },
      (results, status) => {
        if (status === "OK") {
          let userCoords = [
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          ];
          this.props.getFarmLocations(userCoords);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      wrapperCol: {
        span: 30
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        span: 4,
        offset: 4
      }
    };

    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("userAddr", {
              rules: [
                {
                  type: "string"
                }
              ]
            })(<Input placeholder="Address" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("range")(
              <Select placeholder="Please select range">
                <Option value="10">10 Miles</Option>
                <Option value="25">25 Miles</Option>
                <Option value="50">50 Miles</Option>
              </Select>
            )}
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

const WrappedUserAddr = Form.create()(UserAddr);

export default WrappedUserAddr;
