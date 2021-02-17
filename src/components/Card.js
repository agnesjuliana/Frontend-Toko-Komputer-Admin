import React from "react"

export default class Card extends React.Component {
    render(){
        return(
            <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
            <div className="card">
                <div className="card-header">
                    <span className="dot pink"></span>
                    <span className="dot tosca"></span>
                    <span className="dot yellow"></span>
                </div>
                <div className= {"card-body bg-"+this.props.color}>
                    <h4 className="text-dark text-center">
                        <strong>{this.props.type}</strong>
                    </h4>
                    <h1 className="text-white text-center">
                        <strong>{this.props.count}</strong>
                    </h1>
                </div>
            </div>
            </div>
        )
    }
}