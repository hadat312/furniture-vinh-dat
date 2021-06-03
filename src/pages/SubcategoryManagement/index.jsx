import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
    Col,
    Input,
    Row,
    Typography,
    Menu,
    Button,
    Table,
    Tag,
    Space
} from 'antd';
import history from '../../utils/history'

import {
    getSubCategoriesAction
} from '../../redux/actions'

import './styles.css'

function CategoryManagementPage(props) {
    const { getSubCategories, subCategories } = props;

    useEffect(() => {
        getSubCategories();
    }, [])

    return (
        <>

        </>
    )


}

const mapStateToProps = (state) => {
    const { subCategories } = state.categoriesReducer;

    return {
        subCategories: subCategories,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSubCategories: (params) => dispatch(getSubCategoriesAction(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagementPage);