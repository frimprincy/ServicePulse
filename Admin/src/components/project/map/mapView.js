import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import firebase from 'firebase'

const mapStyles = {
    width: '100%',
    height: '100%'
  };
export class MapStats extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {} ,         //Shows the infoWindow to the selected place upon a marker
        lat:null,
        lng:null,
        ProvidersData:[]
      };


      
      componentDidMount() {
        if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const coords = pos.coords;
            this.setState({
            
                lat:coords.latitude,
                lng:coords.longitude
              
            });
           
        })
        }
       
        const ref=firebase.database().ref('AssignedProviders')
        ref.on("value",snapshot=>{
         const providers=snapshot.val()
         if(providers!==null){
        const ProvidersDataList =Object.keys(providers).map(key=>({
         ...providers[key],
         uid:(Math.random())
        }));
        this.setState({
            
         ProvidersData:ProvidersDataList,
            loading:true
        })
     }
        })
      }
      

      onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    
    if(this.state.lat!=null && this.state.ProvidersData.length){
      const providers=this.state.ProvidersData
    
      const providersList=providers.map(provider=>{
        const coords={
          lat:provider.lat,
          lng:provider.lng
        }
    
        return(
          
          <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
           lat:this.state.lat,
           lng:this.state.lng
          }}
         key={provider.id}
        >

           <Marker
          onClick={this.onMarkerClick}
          name={provider.destination}
          coordinates={coords}
        />
       
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>

        </Map>
      
        )
      })

    return (
      <div>{providersList}</div>
       

      );
    }else{
        return(
            <div>loading ..</div>
        )
    }
  }
}



export default GoogleApiWrapper({
    apiKey: 'AIzaSyDNUc1tvYgj2Rx8yMOCcdHsWpyfh_dlOqI'
  })(MapStats);