import React, { Component } from 'react'
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';

export default class AddListing extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            desc: "",
            rules: "",
            price: "",
            type: "",
            status: "",
            rooms: [
                {
                    name: "",
                    type: ""
                }
            ]
        }
    }

    render() {
        return (
            <form>
                <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                <CustomInput
                    labelText="Description"
                    id="description"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                <CustomInput
                    labelText="Rules"
                    id="rules"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                <CustomInput
                    labelText="Price"
                    id="price"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                <CustomInput
                    labelText="Type"
                    id="type"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                <CustomInput
                    labelText="Rooms"
                    id="rooms"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                <Button color="primary">Add Property</Button>
            </form>
        )
    }
}
