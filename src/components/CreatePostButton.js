import React from 'react';
import { Modal, Button, message } from 'antd';
import { WrappedCreatePostForm} from "./CreatePostForm"
import $ from 'jquery';
import {API_ROOT, TOKEN_KEY, POS_KEY, AUTH_PREFIX} from "../constants"

export class CreatePostButton extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.form.validateFields((err, values) => {
           if (!err) {
               this.setState({confirmLoading: true,});
               const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
               const formData = new FormData();
               formData.set('lat', lat);
               formData.set('lon', lon);
               formData.set('message', values.message);
               formData.set('image', values.image[0]);

               $.ajax({
                   url: `${API_ROOT}/post`,
                   method: 'POST',
                   data: formData,
                   headers: {
                       Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
                   },
                   processData: false,
                   contentType: false,
                   dataType: 'text',
               }).then(() => {
                   message.success("You created a post!");
                   this.props.loadNearbyPosts().then(() => {
                       this.setState({
                           visible: false,
                           confirmLoading: false,
                       });
                   });
               }, (response) => {
                   message.error(response.responseText);
               }).catch((error) => {
                   console.log(error);
               });
           }
        });
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    saveFromRef = (form) => {
        this.form = form;
    }
    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Post</Button>
                <Modal title="Create New Post"
                       visible={visible}
                       onOk={this.handleOk}
                       okText="Create"
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <WrappedCreatePostForm ref={this.saveFromRef}/>
                </Modal>
            </div>
        );
    }
}
