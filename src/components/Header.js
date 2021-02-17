import React from 'react'

export default class Header extends React.Component{
    render(){
        return(
            <div className="myheader">
            <div className={"main-box "+ this.props.color}>
                <div className="card title-card">
                    <div className="card-header">
                        <span className="dot pink"></span>
                        <span className="dot tosca"></span>
                        <span className="dot yellow"></span>
                    </div>
                    <div className="card-body">
                        <h1 className="text-dark text-center">
                            <strong>{this.props.title}</strong>
                        </h1>
                        <h5 className="text-center">
                            {this.props.children}
                        </h5>
                    </div>
                </div>

                <img src={this.props.src} className="header-pic" />
            </div>
        </div>
        )
    }
}