import React from "react"
import Navbar from "../components/Navbar"
import ProductList from "../components/ProductList"
import { base_url, Base_url, product_image_url } from "../config"
import $ from "jquery"
import axios from "axios"
import MyHeader from "../components/Header"

export default class Page extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            token: "",
            action: "",
            name: "",
            price: 0,
            stock: 0,
            image: "",
            uploadFile: true,
            product_id: "",
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }


    // FUNCTION ADD TOKEN FOR AUTH IN HEADERS START
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    // FUNCTION ADD TOKEN FOR AUTH IN HEADER END

    // FUNCTION GET PRODUCT START
    getProduct = () => {
        let url = base_url + "/product"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ products: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    // FUNCTION GET PRODUCT END

    // START ComponentDidMount
    componentDidMount() {
        this.getProduct()
    }
    // END ComponentDidMount


    // FUNCTION ADD START
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            product_id: 0,
            name: "",
            price: 0,
            stock: 0,
            image: null,
            uploadFile: true
        })
    }
    // FUNCTION ADD END

    // FUNCTION EDIT START
    Edit = selectedItem => {
        $("#modal_product").modal("show")
        this.setState({
            action: "update",
            product_id: selectedItem.product_id,
            name: selectedItem.name,
            price: selectedItem.price,
            stock: selectedItem.stock,
            image: selectedItem.image,
            uploadFile: false
        })
    }
    // FUNCTION EDIT END

    // FUNCTION SAVE START
    saveProduct = event => {
        event.preventDefault()
        $("#modal_product").modal("hide")
        let form = new FormData()
        form.append("product_id", this.state.product_id)
        form.append("name", this.state.name)
        form.append("price", this.state.price)
        form.append("stock", this.state.stock)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/product"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getProduct()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getProduct()
                })
                .catch(error => console.log(error))
        }
    }
    // FUNCTION SAVE END

    // FUNCTION DELETE START
    dropProduct = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/product/" + selectedItem.product_id
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getProduct()
                })
                .catch(error => console.log(error))
        }
    }
    // FUNCTION DELETE END

    render() {
        return (
            <div>
                <MyHeader color="tosca" title="Product List" src="https://drive.google.com/uc?id=1og4-jZsZ9sFd6QsXTssCJNK5ub_zeQVu">
                    "You're more successful when you have fun. So let's have fun and made a plot twist"
                </MyHeader>

                <div className="container my-5">
                    <div className="row">
                        {this.state.products.map(item => (
                            <ProductList
                                key={item.product_id}
                                name={item.name}
                                price={item.price}
                                stock={item.stock}
                                image={product_image_url + "/" + item.image}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.dropProduct(item)}
                            />
                        ))}
                    </div>

                    <div className="row">
                        <button className="btn btn-success mx-auto" onClick={() => this.Add()}>
                            Add Product
                        </button>
                    </div>
                </div>

                {/* modal product  */}
                <div className="modal fade" id="modal_product">
                    <div className="modal-dialog">
                        <div className="modal-content mt-4">
                            <div className="modal-header bg-info text-white">
                                <h4 className="text-center mx-auto">
                                    <strong>Form Product</strong>
                                </h4>
                            </div>
                            <div className="modal-body ">
                                <form onSubmit={ev => this.saveProduct(ev)}>
                                    <div className="row">
                                        <div className="col-4">
                                        <img src={product_image_url + "/" + this.state.image} className="modal-image img-thumbnail mx-auto mb-2"/>
                                        {this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                            onClick={() => this.setState({ uploadFile: true })}>
                                            Change Product Image
                                        </button>
                                    ) : (
                                            <div>
                                                <strong>Product Image</strong>
                                                <input type="file" className="form-control mb-1"
                                                    onChange={ev => this.setState({ image: ev.target.files[0] })}

                                                    required
                                                />
                                            </div>
                                        )}
                                        </div>

                                    <div className="col-8 mb-2"> 
                                        <strong>Product Name</strong>
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.name}
                                            onChange={ev => this.setState({ name: ev.target.value })}
                                            required
                                        />

                                        <strong>Product Stock</strong>
                                        <input type="number" className="form-control mb-1"
                                            value={this.state.stock}
                                            onChange={ev => this.setState({ stock: ev.target.value })}
                                            required
                                        />

                                        <strong>Product Price</strong>
                                        <input type="number" className="form-control mb-1"
                                            value={this.state.price}
                                            onChange={ev => this.setState({ price: ev.target.value })}
                                            required
                                        />
                                            </div>
                                    </div>

                                        <button type="submit" className="btn btn-block btn-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                                            <path d="M8.354 10.354l7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                            </svg>
                                            <t/> Simpan
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
