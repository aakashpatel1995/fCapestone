import React, {Component} from 'react'
import items from './data'
import Client from "./Contentful";
Client.getEntries({
    
}).then(response => console.log(response.items));   

const RoomContext = React.createContext();
// <RoomContext.Provider value ={'hello'}

class RoomProvider extends Component {
    state = {
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading: true
    };
    // getData
getData = async () =>{
    try{
let response = await Client.getEntries(
    {content_type: "beachResortRoom",
    order: "sys.createdAt"
    }
);
let rooms = this.formatData(response.items);
let featuredRooms = rooms.filter(room => 
    room.featured  === true);
this.setState({
    rooms,
    sortedRooms:rooms,
    featuredRooms,
    loading:false

});

    }
    catch(error){
        console.log(error);
    }
}
    componentDidMount() {
   this.getRooms()
    }
    formatData(items) {
        let tempItems = items.map(item => {

            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields,images,id};
            return room;
        });
        return tempItems;
    }
    getRooms = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room =>  room.slug === slug)
        return room ;

    };
    render() {
        return (<RoomContext.Provider value = {{...this.state,getRooms:this.getRooms}}>
         {this.props.children}
          </RoomContext.Provider>
);

    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return (
        <RoomConsumer>
        {value => <Component {...props} context ={value} />}
        </RoomConsumer>
        );
    };
}
export {RoomProvider, RoomConsumer, RoomContext};