import React from "react"
import $ from "jquery"

export default class Card extends React.Component {


    render(){
        return(
            <div class="col-md-4 card-container">
            <div class="card card-flip">
              <div class="front card-block">
                <span class="card-img-top fa" style="font-size: 4em">&#xf118;</span>
                <h4 class="card-title">{this.props.type}</h4>
                <h6 class="card-subtitle text-muted">Front Sub-title</h6>
                <p class="card-text">{this.props.count}</p>
              </div>
              <div class="back card-block">
                <p>Some example text</p>
                <a href="#" class="btn btn-outline-primary">Read More</a>
              </div>
            </div>
          </div>
        )
    }
}

$(document).ready(function() {
    var front = document.getElementsByClassName("front");
    var back = document.getElementsByClassName("back");
  
    var highest = 0;
    var absoluteSide = "";
  
    for (var i = 0; i < front.length; i++) {
      if (front[i].offsetHeight > back[i].offsetHeight) {
        if (front[i].offsetHeight > highest) {
          highest = front[i].offsetHeight;
          absoluteSide = ".front";
        }
      } else if (back[i].offsetHeight > highest) {
        highest = back[i].offsetHeight;
        absoluteSide = ".back";
      }
    }
    $(".front").css("height", highest);
    $(".back").css("height", highest);
    $(absoluteSide).css("position", "absolute");
})