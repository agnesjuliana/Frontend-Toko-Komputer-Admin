import React from "react"
import Navbar from "../components/Navbar"
import Card from "../components/Card"
import axios from "axios"
import { base_url } from "../config"

export default class Page extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            adminName: null,
            productsCount: 0,
            customersCount: 0,
            transactionsCount: 0,
            adminsCount: 0,
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    // FUNCTION HANDLE ACCESS API START
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    // FUNCTION HANDLE ACCESS API END


    // FUNCTION FOR CATCH GET ERROR OCCUR START
    catchErrorGet = (error) => {
        if (error.response) {
            if (error.response.status) {
                window.alert(error.response.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error)
        }
    }
    // FUNCTION FOR CATCH GET ERROR OCCUR END

    // FUNCTION GET PRODUCT COUNT START
    getProduct = () => {
        let url = base_url + "/product"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ productsCount: response.data.length })
            })
            .catch(error => {
                this.catchErrorGet(error)
            })
    }
    // FUNCTION GET PRODUCT COUNT END

    // FUNCTION GET CUSTOMER COUNT START
    getCustomer = () => {
        let url = base_url + "/customer"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({customersCount: response.data.length})
        })
        .catch(error => {
            this.catchErrorGet(error)
        })
    }

    // FUNCTION GET CUSTOMER COUNT END

    // FUNCTION GET TRANSACTION COUNT START
    getTransactions = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({transactionsCount: response.data.length})
        })
        .catch(error => {
            this.catchErrorGet(error)
        })
    }
    // FUNCTION GET TRANSACTION COUNT END

    // FUNCTION GET ADMIN START
    getAdmins = () => {
        let url = base_url + "/admin"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({adminsCount: response.data.length})
        })
        .catch(error => {
            this.catchErrorGet(error)
        })
    }
    // FUNCTION GET ADMIN END

    // FUNCTION GET ADMIN NAME START
    // get name of admin from local storage
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({adminName: admin.name})
    }
    // FUNCTION GET ADMIN NAME END

    // COMPONENT DID MOUNT START
    componentDidMount(){
        this.getCustomer()
        this.getAdmins()
        this.getProduct()
        this.getTransactions()
        this.getAdmin()
    }
    // COMPONENT DID MOUNT END

    render() {
        return (
            <div>
                <div className="myheader">
                    <div className="main-box pink mx-auto"/>
                    <img src="https://drive.google.com/uc?id=1uyxH8U1mskxqogYJTiIGnr1TdfwzigXU" className="hello"/>
                    <img src="https://drive.google.com/uc?id=1joGxuEoozSRHOzze8ENBwYFX27aooYTl" className="admin"/>
                    <img src="https://drive.google.com/uc?id=1j9kuTH6CqU9Hw93SS-KJC25aCLQH6UXH" className="home-pic"/>
                    <h1 className="welcome text-center mx-auto">
                        Welcome Back <br/> <strong>{this.state.adminName}</strong>
                    </h1>
                </div>

                <div className="container-fluid col-10 mb-3">
                    <div className="row my-5 col-8 mx-auto">
                        <h3 className="text-center mx-auto mt-5 mb-2">Made By <strong>Agnes</strong></h3>
                        <h5 className="text-center">Hello! My name is Agnes Juliana, but I prefer to be called Aga. 
                            Now, I'm a student in Vocational High School with a Software 
                            Engineering major. I enjoy to do something new and challenging, 
                            especially something related to IT. Writing is my side activity 
                            that used to remember every stage of my life. 
                            You can find me on Instagram @_julianaaa31
                        </h5>
                        <a className="btn btn-info mx-auto" href="https://agajuliansyah.medium.com/" role="button">Check My Personal Blog!</a>
                    </div>
                    <div className="row">
                        {/* products count */}
                        <Card type = "Products Count" count = {this.state.productsCount} color = "success"/>

                        {/* customer count */}
                        <Card type = "Customers Count" count = {this.state.customersCount} color = "info"/>

                        {/* transactions count */}
                        <Card type = "Transactions Count" count = {this.state.transactionsCount} color = "warning"/>

                        {/* admins count */}
                        <Card type = "Admins Count" count = {this.state.adminsCount} color = "danger"/>

                    </div>
                </div>
            </div>
        )
    }
}
