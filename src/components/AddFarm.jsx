import React, { Component } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { farmRef, locationRef } from 'API/databases.js';
import GeoFire from 'geofire';
import { connect } from 'react-redux';
import { geocode } from 'actions/Geocode';

const mapDispatchToProps = dispatch => {
  return {
    geocode: address => dispatch(geocode(address))
  };
};

const mapStateToProps = state => {
  return { latLng: [state.geocodeReducer.lat, state.geocodeReducer.lng] };
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
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let loc = values['location'];
        await this.props.geocode(loc);
        let key = farmRef.push(values).key;
        console.log(this.props.latLng);
        geofire.set(key, this.props.latLng);
        notification.open({ message: 'Farm Submitted!' });
        this.props.form.resetFields();
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
            {getFieldDecorator('name', {
              rules: [
                {
                  type: 'string'
                },
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Address">
            {getFieldDecorator('location', {
              rules: [
                {
                  type: 'string'
                },
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Website">
            {getFieldDecorator('website', {
              rules: [
                {
                  type: 'string'
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
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddFarm));

export default WrappedAddFarm;
