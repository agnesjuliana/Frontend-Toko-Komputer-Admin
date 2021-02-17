import React from 'react'

export default class ProductList extends React.Component {
    render() {
        return (
            <div className="col-lg-4 col-sm-12 my-2">
                <br></br>
                <div className="card border-info">

                    <div className="card-header">
                        <span className="dot pink"></span>
                        <span className="dot tosca"></span>
                        <span className="dot yellow"></span>
                    </div>

                    <div className="card-body">
                        <img src={this.props.image} className="card-img-top"
                            height="200" width="200" alt={this.props.name} />

                        <h5 className="text-info text-center text-capitalize">
                            <strong>{this.props.name}</strong>
                        </h5>
                        <h6 className="text-danger text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                            </svg>
                            {this.props.price}
                        </h6>
                        <h6 className="text-dark text-center">
                            Stock: {this.props.stock}
                        </h6>
                    </div>

                    <div className="card-footer bg-transparent mx-auto">
                        {/* edit button */}
                        <button className="btn btn-sm btn-primary m-1"
                            onClick={this.props.onEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            <t/> Edit
                        </button>

                        {/* dellete button */}
                        <button className="btn btn-sm btn-danger m-1"
                            onClick={this.props.onDrop}>
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}