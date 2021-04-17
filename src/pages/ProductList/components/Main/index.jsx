import { Row } from 'antd';
import React from 'react';

import { connect } from 'react-redux';
import Item from './components/Item';
import './main.css';
function Main(props) {
  const { productList } = props;
  // function renderItem() {
  //   return productList.map((productItem, productIndex) => {
  //     return (
  //       <Item
  //         key={productItem.id}
  //         image={productItem.image}
  //         title={productItem.title}
  //         price={productItem.price}
  //         discount={productItem.discount}
  //       />
  //     )
  //   })
  // }
  
  return (
    <div className="main-container">
      <Row gutter={[8, 40]}>
        {/* Dùng hàm render ra từng Card */}
        {/* {renderItem()} */}
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Row>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   const { productList } = state.taskReducer;
//   return {
//     productList: productList,
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTask: (params) => dispatch(addTaskAction(params)),
//     editTask: (params) => dispatch(editTaskAction(params)),
//     deleteTask: (params) => dispatch(deleteTaskAction(params)),
//   };
// }

//export default: là export mặc định cho cả trang, là duy nhất
// export default connect(mapStateToProps)(Main);
export default Main;