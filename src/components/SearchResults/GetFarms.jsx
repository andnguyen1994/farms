import React, { Component } from 'react'
import { Table, Alert } from 'antd'

class GetFarms extends Component {
  // TODO: add columns, fix sort
  render () {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location'
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website'
      }
    ]

    const renderValue = () => {
      if (this.props.error) {
        return <Alert message={this.props.error} type='error' />
      } else if (this.props.farmsTableData.length === 0) {
        // TODO: fix this
        return <Alert message='There are no farms in range' type='warning' />
      } else {
        return (
          <Table
            bordered
            dataSource={this.props.farmsTableData}
            columns={columns}
            pagination={false}
          />
        )
      }
    }

    return <div>{renderValue()}</div>
  }
}

export default GetFarms
