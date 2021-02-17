import React from "react"
import Navbar from "../components/Navbar"
import CustomerList from "../components/CustomerList"
import { base_url, customer_image_url } from "../config.js";
import $ from "jquery"
import axios from "axios"
import MyHeader from "../components/Header"


export default class Page extends React.Component{
    constructor(){
        super()
        this.state = {
            customers: [],
            token: "",
            action: "",
            name: "",
            phone: "",
            address: "",
            image: "",
            username: "",
            password: "",
            uploadFile: true,
            fillPassword: true,
            customer_id: "",
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    // FUNCT FOR AUTH START
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    // FUNCT FOR AUTH END

    //FUNCTION GET CUSTOMER START
    getCustomers = () => {
        let url = base_url + "/customer"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({customers: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    //FUNCTION GET CUSTOMER END


    // FUNCT DIDMOUNT FOR CALL DATA CUSTOMER START
    componentDidMount(){
        this.getCustomers()
    }
    // FUNCT DIDMOUNT FOR CALL DATA CUSTOMER END


    //FUNCT ADD DATA START
    Add = () => {
        $("#modal_customer").modal("show")
        this.setState({
            action: "insert",
            customer_id: 0,
            name: "",
            address: "",
            phone: "",
            image: null,
            username: "",
            password: "",
            fillPassword: true,
            uploadFile: true
        })
    }
    //FUNCT ADD DATA END

    
    //FUNCT EDIT DATA START
    Edit = selectedItem => {
        $("#modal_customer").modal("show")
        this.setState({
            action: "update",
            customer_id: selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address,
            image: null,
            username: selectedItem.username,
            password: "",
            uploadFile: false,
            fillPassword: false,
        })
    }
    //FUNCT EDIT DATA END

    // FUNCT DELETE START
    dropCustomer = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/customer/" + selectedItem.customer_id
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        }
    }
    // FUNCT DELETE END

    // FUNCT SAVE START
    saveCustomer = event => {
        event.preventDefault()
        $("#modal_customer").modal("hide")
        let form = new FormData()
        form.append("customer_id", this.state.customer_id)
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("address", this.state.address)
        form.append("username", this.state.username)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        if (this.state.fillPassword) {
            form.append("password", this.state.password)
        }

        let url = base_url + "/customer"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        }
    }
    // FUNCT SAVE END



    render(){
        return (
            <div>
                <MyHeader color="yellow" title="Customer List" src="https://drive.google.com/uc?id=1zqN5mDLWElM_TNAX-QcLR7buI63XaSf6">
                        "Customer is king and queen. But, don't trade your authenticity for approval"
                </MyHeader>
               <div className="container my-3">
                   <div className="row">
                       { this.state.customers.map( item => (
                           <CustomerList
                           key = {item.customer_id}
                           name = {item.name}
                           phone = {item.phone}
                           address = {item.address}
                           image = { customer_image_url + "/" + item.image}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropCustomer(item)}
                            />
                       )) }
                   </div>
                   <div className="row">
                    <button className="btn btn-success mx-auto" onClick={() => this.Add()}>
                        Add Customer
                    </button>
                   </div>
                </div>

                 {/* modal customer  */}
                 <div className="modal fade" id="modal_customer">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4 className="mx-auto"><strong>Form Customer</strong></h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveCustomer(ev)} >
                                     <strong>Customer Name</strong>
                                     <input type="text" className="form-control mb-2"
                                     value={this.state.name}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                     />
                                    <strong>Customer Phone</strong>
                                     <input type="text" className="form-control mb-2"
                                     value={this.state.phone}
                                     onChange={ev => this.setState({phone: ev.target.value})}
                                     required
                                     />
                                    <strong>Customer Address</strong>
                                     <input type="text" className="form-control mb-2"
                                     value={this.state.address}
                                     onChange={ev => this.setState({address: ev.target.value})}
                                     required
                                     />
                                    <strong>Username</strong>
                                     <input type="text" className="form-control mb-3"
                                     value={this.state.username}
                                     onChange={ev => this.setState({username: ev.target.value})}
                                     required
                                     />

                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-2 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Customer Image
                                        </button>
                                    ) : (
                                        <div>
                                            <strong>Customer Image</strong>
                                            <input type="file" className="form-control mb-2"
                                            onChange={ev => this.setState({image: ev.target.files[0]})}
                                            required
                                            />
                                        </div>
                                    ) }

                                    { this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-2 btn-block"
                                        onClick={() => this.setState({fillPassword: true})}>
                                            Change Password
                                        </button>
                                    ) : (
                                        <div>
                                            <strong>Password</strong>
                                            <input type="password" className="form-control mb-2"
                                            value={this.state.password}
                                            onChange={ev => this.setState({password: ev.target.value})}
                                            required
                                            />
                                        </div>
                                    ) }
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }

}
