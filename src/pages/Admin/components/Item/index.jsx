import { Button } from 'antd';
import React, { useState } from 'react';
import history from '../../../../utils/history';
import { connect } from 'react-redux';

import './styles.css';

function Item(props) {
    const { userListItem,onDeleteUserList} = props;
    console.log("🚀 ~ file: index.jsx ~ line 10 ~ Item ~ userListItem", userListItem)

    return (
        <>
            <tbody>
                <tr>
                    <td className="user-id">
                        {userListItem.id}
                    </td>

                    <td className="user-name">
                        {userListItem.userName}
                    </td>

                    <td className="user-email">
                        {userListItem.userEmail}
                    </td>

                    <td className="user-remove">
                        <button >
                            <span onClick={() => onDeleteUserList(userListItem.id)}>X</span>
                        </button>
                    </td>

                </tr>
            </tbody>
        </>
    )
}
export default Item;