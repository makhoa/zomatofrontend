import React from 'react';
import '../Styles/Home.css';
import axios  from 'axios';
import QuickSearch from './QuickSearch';
import Wallpaper from './Wallpaper';

class Home extends React.Component{

    constructor () {
        super ();
        this.state = {
            Locations:[],
            meal:[]
        }
    } 
    
    componentDidMount (){
        sessionStorage.clear ();
        axios({
            url:`https://zomatobackend21.herokuapp.com/Locations`,
            method:'GET',
            headers:{'Content-Type':'application/json'},
        })
            .then(
                res => {
                    this.setState({Locations:res.data.Locations})
                }
            )
            .catch(
                err =>console.log(err)
            )
            axios({
                url:`https://zomatobackend21.herokuapp.com/MealTypes`,
                method:'GET',
                headers:{'Content-Type':'application/json'},
            })
                .then(
                    res => {
                        this.setState({meal: res.data.MealTypes})
                    }
                )
                .catch(
                    err =>console.log(err)
                )
    }  

    render (){

        const bd = {
            backgroundImage: 'url("./Assets/bg3.jpg")',
            backgroundSize: 'contain',
            backgroundAttachment: 'fixed'
        }

        const {Locations, meal} =this.state;
       

        return (
            <div style={bd}>
                {/* wallpaper part which is a child component of homepage */}
                <Wallpaper locationData={Locations}/>
                <QuickSearch mealtypedata ={meal}/>
                
            </div>
        )
    }
}

export default Home;
