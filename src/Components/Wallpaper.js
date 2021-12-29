import React from 'react';
import '../Styles/Home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component{
    constructor() {
        super();
        this.state = {
            restaurants: [],
            inputText: undefined,
            suggestions: []
        }
    }
    
    
    
    handleLocationChange = (event) => {
        const location_id = event.target.value;
        sessionStorage.setItem(`location_id`,location_id);

        axios({
            url:`https://zomatobackend21.herokuapp.com/RestaurantData/${location_id}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurants: res.data.RestaurantData })
            })
            .catch(err => console.log(err))

    }

    handleInputChange = (event) => {
        const {restaurants} = this.state;
        const inputText = event.target.value;

        let suggestions = [];
        suggestions = restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions });
    }

    selectingRestaurant = (resObj) => {
        this.props.history.push(`/Details?restaurant=${resObj._id}`);
    }

    showSuggestion = () => {
        const {suggestions, inputText } = this.state;

        if (suggestions.length == 0 && inputText == undefined) {
            return null;
        }
        if (suggestions.length > 0 && inputText == '') {
            return null;
        }
        if (suggestions.length == 0 && inputText) {
            return <ul >
                <li style={{color:'whitesmoke',color:'rgb(63, 62, 62)'}} className='li-home'>No Search Results Found</li>
            </ul>
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (
                    <li key={index} onClick={() => this.selectingRestaurant(item)} className='li-home'>
                        {`${item.name} - ${item.locality},
                        ${item.city}`}
                    </li>))
                }
            </ul>
        );

    }

    render (){
   
        const {locationData}= this.props;

        return (
            <div>

            <div className="mobilegrid" >

            <img src="./Assets/view.jpg" className="image" alt = "restaurant"/>

            </div>
            {/*<div className="logiin-home" >
                <button onclick=" window.location.href = 'loginpage.html'" className="bdanger"  data-bs-toggle="button">Login</button>
                <button onclick="window.location.href = 'CreateAccount.html'" className="bdanger " data-bs-toggle="button">Create Account</button>
            </div>*/}
            

            <div className="main-home ">

                <div className="logo-home"><b>e!</b> </div> 
                <div className="logotext-home">Find the best Restaurants,Cafes,and Bars</div>

                <div >
                    <select className="logoselect-home" onChange={this.handleLocationChange}>
                        <option value="0" style={{color: 'lightgrey'}}  > Select Location </option>
                
                        {locationData.map ((item) => {
                            return <option value={item.location_id} style={{color: 'grey'}} > { `${item.name},${item.city}`} </option>
                        })}
                        
                    </select>
                    <div className="logoinput-home" >
                        <span className="fas fa-search-location searchicon"></span>
                            <input type="text" placeholder=" Search for Restaurants" 
                             onkeyup="refreshMap(chosenMapKind)" onChange={this.handleInputChange} id="searchRes"/>
                            {this.showSuggestion()} 
                    </div>
                </div>
            </div>

        </div>
            
        )
    }
}

export default withRouter(Wallpaper);
