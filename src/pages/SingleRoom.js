import React, { Component } from 'react'
import defaultBCG from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from "../components/StyledHero"
export default class SingleRoom extends Component {
  constructor(props){
    super(props)
//console.log(this.props);
this.state ={

  slug:this.props.match.params.slug,
  defaultBCG
};
  }
  static contextType = RoomContext;

  //componentDidMount(){}
  render() {
    const {getRooms} = this.context;
    const room = getRooms(this.state.slug);
    if(!room){
      return <div className="error">
      <h3>No such room found </h3>
      <Link to ="/rooms/" className="btn-primary">
      Return to Rooms</Link></div>
    }
    const {name,description,capacity,size,price,extras,breakfast,pets,images} =room;
    return (
      <>
      <StyledHero img ={images[0] || this.state.defaultBCG}><Banner title={`${name} room`} ><Link to ="/rooms" className ="btn-primary">Return to Rooms</Link></Banner>
    </StyledHero>
      <section className="single-room">
      <div className="single-room-images">
        {images.map((item,index)=>{
          return <img key={index} src={item} alt={name} />;
        })}
      </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>max capacity : {capacity > 1 ? `${capacity} people`: `${capacity} person`}</h6>
            <h6>{pets?"pets allowed" : "no pets" }</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
      <h6>extras</h6>
      <ul className="extras">
      {extras.map((item,index)=>{
        return <li key={index}>- {item}</li>;
      })}
        
      </ul>
        
      </section>

    </>
    );
    
  }
}
