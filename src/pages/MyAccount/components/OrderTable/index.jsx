import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './orderTable.css'
function OrderTable(props) {
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Joe Black',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Jim Green',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park',
  //   },
  // ];
  // getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={node => {
  //           this.searchInput = node;
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({ closeDropdown: false });
  //             this.setState({
  //               searchText: selectedKeys[0],
  //               searchedColumn: dataIndex,
  //             });
  //           }}
  //         >
  //           Filter
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
  //       : '',
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select(), 100);
  //     }
  //   },
  //   render: text =>
  //     this.state.searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[this.state.searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  // function handleSearch(selectedKeys, confirm, dataIndex){
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // }
  // function handleReset(clearFilters) {
  //   clearFilters();
  //   setSearchText('');
  // }
  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //     width: '30%',
  //     ...this.getColumnSearchProps('name'),
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     key: 'age',
  //     width: '20%',
  //     ...this.getColumnSearchProps('age'),
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     key: 'address',
  //     ...this.getColumnSearchProps('address'),
  //   },
  // ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      date: "30/09/2020",
      price: 80000,
      address: 'New York No. 1 Lake Park',
      // tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      date: "20/09/2019",
      price: 1500000,
      address: 'London No. 1 Lake Park',
      // tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      date: "15/8/2020",
      price: 2000000,
      address: 'Sidney No. 1 Lake Park',
      // tags: ['cool', 'teacher'],
    },
  ];

  const columns = [
    {
      title: 'Đơn hàng',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <Space size="middle">
          <span>
            {record.price.toLocaleString()} vnđ
          </span>
        </Space>
      ),
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: tags => (
    //     <>
    //       {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (//record.address, record.name....
        <Space size="middle">

          <Button>Xem chi tiết</Button>
        </Space>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={data} />
  );
}
export default OrderTable;