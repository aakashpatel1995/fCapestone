import React, { Component } from 'react'
import Title from './Title';
import { FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
    state = { 
        services: [
            // {
            //     icon:<FaCockTail />,
            //     title:"free cocktails",
            //     info:"lorem ipsum "
            // },
            {
                icon:<FaHiking />,
                title:"free cocktails",
                info:'Due to Party and function we provide free cocktails,cocktails are people choice ,with alcohol or without alcohol '
            },
            {
                icon:<FaShuttleVan />,
                title:"free Pickup",
                info:'We provide free shuttle services for the customer who are coming with a family or who are looking for helping hands from airport and railway'
            },
            {
                icon:<FaBeer />,
                title:"free Beer",
                info:'10 beers are free for every customer who purchased royal room we are providing free beer for 2 weeks from today and flavour we provide whichever you like'
            },
        ]
    }
  render() {
    return (
        <section className="services">
<Title title="services" />
        <div className="services-center">
        {this.state.services.map((item,index) => {
            return <article key={index} className="services">
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
            </article>

        })}
        </div>
        
        </section>
    )
  }
}
