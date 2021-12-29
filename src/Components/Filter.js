import React from 'react';
import '../Styles/Filter.css';
import queryString from 'query-string';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class Filter extends React.Component{
    constructor () {
        super ();
        this.state = {
            Restaurants:[],
            Locations: [],
            Mealtype: undefined,
            Location:undefined,
            Cuisine: [],
            Low_cost: undefined,
            High_cost: undefined,
            Sort: 1,
            Page: 1,
            itemsPerPage:[]
     
        }
    }

    componentDidMount () { 
        
        const qs = queryString.parse (this.props.location.search);

        const {Mealtype, Location} = qs;
        const filterobj = {
            Mealtype:Number(Mealtype),
            Location:Number(Location),
        };

        axios({
            url:`https://zomatobackend21.herokuapp.com/Filter`,
            method:'POST',
            headers:{'Content-Type':'application/json'},
            data: filterobj
        })
            .then(
                res => {
                    this.setState({ Restaurants:res.data.RestaurantData, 
                        itemsPerPage:res.data.itemsPerPage,
                        Mealtype, Location})
                }
            )

            .catch(
                err =>console.log(err)
            )

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
    }


    handleSortChange = (Sort) => {
        const { Mealtype, Cuisine, Location, Low_cost, High_cost, Page } = this.state;

        const filterObj = {
            Mealtype:Number(Mealtype),
            Location:Number(Location),
            Cuisine: Cuisine.length > 0 ? Cuisine : undefined,
            Low_cost,
            High_cost,
            Sort,
            Page
        };

        axios({
            url:`https://zomatobackend21.herokuapp.com/Filter`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ Restaurants:res.data.RestaurantData,
                    itemsPerPage:res.data.itemsPerPage,
                     Sort})
            })
            .catch(err => console.log(err))
    }

    handleCostChange = (Low_cost, High_cost) => {
        const { Mealtype, Cuisine, Location, Sort, Page } = this.state;

        const filterObj = {
        
            Mealtype:Number(Mealtype),
            Location:Number(Location),
            Cuisine: Cuisine.length > 0 ? Cuisine : undefined,
            Low_cost,
            High_cost,
            Sort,
            Page
        };

        axios({
            url:`https://zomatobackend21.herokuapp.com/Filter`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ Restaurants:res.data.RestaurantData,
                    itemsPerPage:res.data.itemsPerPage,
                     Low_cost, High_cost})
            })
            .catch(err => console.log(err))
    }

    handleLocationChange = (event) => {
        const Location = event.target.value;
        const { Mealtype, Cuisine,  Low_cost, High_cost,Sort, Page } = this.state;

        const filterObj = {
            Mealtype:Number(Mealtype),
            Cuisine: Cuisine.length > 0 ? Cuisine : undefined,
            Location:Number(Location) ,
            Low_cost,
            High_cost,
            Sort,
            Page
        };

        axios({
            url:`https://zomatobackend21.herokuapp.com/Filter`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ Restaurants:res.data.RestaurantData,
                    itemsPerPage:res.data.itemsPerPage,
                    Location})
            })
            .catch(err => console.log(err))
    }

    handleNavigate = (res_Id) => {
        this.props.history.push(`/Details?restaurant=${res_Id}`)
    }



    handleCuisineChange = (cuisine_id) => {
        const { Mealtype, Cuisine, Location, Low_cost, High_cost,Sort,Page } = this.state;

        const index = Cuisine.indexOf(cuisine_id);
        if (index >= 0) {
            Cuisine.splice(index, 1);
        }
        else {
            Cuisine.push(cuisine_id);
        }

        const filterObj = {
            Mealtype:Number(Mealtype),
            Location:Number(Location),
            Cuisine: Cuisine.length > 0 ? Cuisine : undefined,
            Low_cost,
            High_cost,
            Sort,
            Page,
        };

        axios({
            url:`https://zomatobackend21.herokuapp.com/Filter`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ Restaurants:res.data.RestaurantData,
                      itemsPerPage:res.data.itemsPerPage,
                      Cuisine })
            })
            .catch(err => console.log(err))
    }

    handlePageClick =(event) => {
        const { Mealtype, Cuisine, Location, Low_cost, High_cost,Sort,itemsPerPage } = this.state;

        let Page = event.selected;
        this.setState({Page})

        const filterObj = {
            Mealtype:Number(Mealtype),
            Cuisine: Cuisine.length > 0 ? Cuisine : undefined,
            Location:Number(Location) ,
            Low_cost,
            High_cost,
            Sort,
            Page,
            itemsPerPage:itemsPerPage

        };

        axios({
            url:`https://zomatobackend21.herokuapp.com/Filter`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ Restaurants:res.data.RestaurantData,
                    itemsPerPage:res.data.itemsPerPage,
                   })
            })
            .catch(err => console.log(err))
    }
    render (){

        const bd = {
            backgroundImage: 'url("./Assets/bg3.jpg")',
            backgroundSize: 'contain',
            backgroundAttachment: 'fixed'
        }

        const {Restaurants} = this.state;
        const {Locations} = this.state;
        const {itemsPerPage} = this.state;

        return (
            <div style= {bd}>
                {/**
                <div className=" logopotion">
                    <div className="logo"><b >e!</b></div>
                     <div className=" login">
                        <button className="logtab" onclick="window.location.href = 'loginpage.html'">Login</button>

                        <button className="logtabb" onclick="window.location.href = 'CreateAccount.html'">Create an Account</button>  
                    </div> 
                   

                </div>*/}
                <hr width="100%" color="#80055f" />
                <div className="container">
                    <div className="place"><strong>Breakfast places in Mumbai</strong></div>

                    <div className="row ">
                        <div className="col-lg-4 col-md-4 col-sm-12 filter-left">
                            <div className="main">
                                
                                <div>
                                    <span><strong style={{fontSize:30}}>Filters\Sort</strong></span>
                                    <span className="fa fa-chevron-down arrow" data-bs-toggle="collapse" data-bs-target="#fcollapse"></span>
                                </div>
                                
                                {/*<!--Toggle collapse div wrap-->*/}
                                <div id="fcollapse" className="show">  
                                    <div>
                                        <label className="labell">Select Location</label>
                                    </div>
                                    <select style={{width: 170, height:30, fontSize: 15}}  onChange={this.handleLocationChange}>
                                        <option  value="0" style={{color: 'lightgrey'}}>Select Location</option>
                                        {Locations.map ((item) => {
                                            return <option value={item.location_id} style={{color: 'grey'}} > { `${item.name},${item.city}`} </option>
                                        })}
                                        
                                    </select>
                                    
                                
                                    
                                    <div style={{marginTop: 10}} >
                                        <label className="labell">Cuisine</label>
                                    </div>
                                            
                                    <div>

                                        <input type="checkbox"  name="NOrth Indian"  onChange={() => this.handleCuisineChange(1)}/> <span className="inputt" >North Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox"  name="South Indian" onChange={() => this.handleCuisineChange(2)}/> <span className="inputt" >South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox"  name="Chinese"  onChange={() => this.handleCuisineChange(3)}/> <span className="inputt" >Chinese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox"  name="Fast Food"  onChange={() => this.handleCuisineChange(4)}/> <span className="inputt" >Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox"  name="Street Food"  onChange={() => this.handleCuisineChange(5)}/> <span className="inputt" >Street Food</span>
                                    </div>

                                    <div>
                                        <label className="labell">Cost For Two</label>
                                    </div>

                                    <div>
                                        <input type="radio" name="cost"  onChange = {()=> this.handleCostChange(1,500)}/><span className="inputt" > Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost"  onChange = {()=> this.handleCostChange(500,1000)} /><span className="inputt" > &#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost"  onChange = {()=> this.handleCostChange(1000,1500)} /><span className="inputt" > &#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost"  onChange = {()=> this.handleCostChange(1500,2000)}/><span className="inputt" > &#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input  type="radio" name="cost"  onChange = {()=> this.handleCostChange(2000,50000)} /><span className="inputt" > &#8377; 2000+</span>
                                    </div>
                                        
                                    <div>
                                        <label className="labell">Sort</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="Low to High" name = "Sort" onChange = {()=> this.handleSortChange (1)}/><span className="inputt" > Low to High</span>
                                    </div>
                                    <div>
                                            <input type="radio" value="High to Low"  name = "Sort" onChange = {()=> this.handleSortChange(-1)}/><span className="inputt" > High to Low</span>
                                    </div>
                                    

                                </div> 
                            </div>  
                            
                        </div>

                    


                        <div className="col-lg-8 col-md-8 col-sm-12 filter-right">

                            {Restaurants.length > 0 ?  Restaurants.map ((item) => {
                                return <div className="shops" onClick ={()=> this.handleNavigate(item._id)}>
                                            <table className="tabless">
                                                <tr >
                                                    <td rowspan="3"><img src="./Assets/food1.jpg" className="images" alt = "food2"/></td>
                                                    <td className=" text">{item.name}</td>
                                                </tr>
                                                <tr>
                                                    <td  className=" text2">{item.locality}</td>
                                                </tr>
                                                <tr>
                                                    <td  className=" text2">{item.city}</td>
                                                </tr>
                                            </table><br/>
                                            <hr width="96%" color="lightgrey" />
                                            <table className="tab_filter">
                                                <tr>
                                                    <td  className=" text2">{item.cuisine.map((cuisine) => `${cuisine.name}, `)}</td>
                                                    <td  className=" text22"  >  Bakery</td>
                                                </tr>
                                                <tr>
                                                    <td  className=" text2">COST FOR TWO:   </td>
                                                    <td  className=" text22"  >  &#8377;{item.min_price}</td>
                                                </tr>
                                            </table>
                                        </div>
                            }) : <div className ="no-elements"> No Results Found... </div>}
                                <div style={{marginLeft:'15px'}}> <ReactPaginate
                                    previousLabel={'prev'}
                                    nextLabel={'next'}
                                    pageCount={3}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={2}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                 /></div>
                              
                           
                        </div> 

                    </div>

                </div>


                <div>
                    <footer className="ft">
                        <span className="ft-edu">&copy; 2021 Edureka!<span className="footext" > All Rights Reserved</span></span>
                        <span className="ft-author"> Author:Makhoa</span>
                    </footer>
                </div> 
        

            </div>
        )
    }
}

export default Filter;
