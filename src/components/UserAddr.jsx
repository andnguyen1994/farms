import React, { Component } from "react";
import { Button, Form, Input, Select, Icon } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

class UserAddr extends Component {
  constructor(props) {
    super(props);
  }
  //Needs to cancel previous geoquery and then push new query
  handleSubmit = event => {
    event.preventDefault();
    this.props.sendUserInfo(
      this.props.form.getFieldValue("userAddr"),
      Number(this.props.form.getFieldValue("range"))
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const tailFormItemLayout = {
      wrapperCol: {
        span: 4,
        offset: 4
      }
    };
    const divStyle = {
      display: "inline-block",
      padding: "50px"
    };

    return (
      <div style={divStyle}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("userAddr", {
              rules: [
                {
                  type: "string"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="environment"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                style={{ width: 300 }}
                placeholder="Address"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("range", { initialValue: "10" })(
              <Select style={{ width: 100 }}>
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
