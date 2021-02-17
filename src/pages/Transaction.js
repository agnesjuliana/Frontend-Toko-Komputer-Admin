import React from "react"
import Navbar from "../components/Navbar"
import TransactionList from "../components/TransactionList"
import { base_url, product_image_url } from "../config.js";
import $ from "jquery"
import axios from "axios"
import MyHeader from "../components/Header"


export default class Page extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            transaction: [],
            selectedItem: null
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    // FUNCTION GET TRANSACTION START
    getTransaction = () => {
        let url = base_url + "/transaksi"

        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({transaction: response.data})
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
    // FUNCTION GET TRANSACTION END

    componentDidMount(){
        this.getTransaction()
    }

    render(){
        return(
            <div>
                <MyHeader color="pink" title="Transaction List" src="https://drive.google.com/uc?id=1HJa1U_8RbW44pZbHEeaWWIpaqK2b_8U5">
                        "Grateful is important"
                </MyHeader>

                <div className="container my-5">
                    { this.state.transaction.map(item => (
                        <TransactionList
                        key = {item.transaksi_id}
                        transaction_id = {item.transaksi_id}
                        customer_name = {item.customer.name}
                        customer_address = {item.customer.address}
                        time = {item.waktu}
                        products = {item.detail_transaksi}
                         />
                    )) }
                </div>
            </div>
        )
    }
}
