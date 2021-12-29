import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../Styles/Details.css';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '2px solid #800080',
        width: '58%'
    },
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            restId: undefined,
            galleryModalIsOpen: false,
            menuItemsModalIsOpen: false,
            formModalIsOpen: false,
            menuItems: [],
            subTotal: 0,
            userName: undefined,
            userEmail: undefined,
            userAddress: undefined,
            userContact: undefined
        }
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const {restaurant} = qs;

        axios({
            url:`https://zomatobackend21.herokuapp.com/RestaurantData/${restaurant}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.RestaurantData, restId: restaurant })
            })
            .catch(err => console.log(err))

    }

    handleModal = (state, value) => {
        const {restId} = this.state;
        if (state == "menuItemsModalIsOpen" && value == true) {
            axios({
                url:`https://zomatobackend21.herokuapp.com/Items/${restId}`,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    this.setState({ menuItems: res.data.MenuItems })
                })
                .catch(err => console.log(err))
        }
        this.setState({ [state]: value });
    }

    addItems = (index, operationType) => {
        let total = 0;
        const items = [...this.state.menuItems];
        const item = items[index];

        if (operationType == 'add') {
            item.qty += 1;
        }
        else {
            item.qty -= 1;
        }
        items[index] = item;
        items.map((item) => {
            total += item.qty * item.price;
        })
        this.setState({ menuItems: items, subTotal: total });
    }

    handleFormDataChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }
    getData = (data) => {
        return fetch(`https://zomatobackend21.herokuapp.com/Payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    } 
        


    handlePayment = () => {
        const {subTotal, userEmail} = this.state;
        if (!userEmail) {
            alert('Please fill this field and then Proceed...');
        }
        else {
            // Payment API Call 
            const paymentObj = {
                amount: subTotal,
                email: userEmail
            };

            this.getData(paymentObj).then(response => {
                var information = {
                    action: "https://securegw-stage.paytm.in/order/process",
                    params: response
                }
                this.post(information)
            }) 
        }
    }

    render() {

        const bd = {
            backgroundImage: 'url("./Assets/bg3.jpg")',
            backgroundSize: 'contain',
            backgroundAttachment: 'fixed'
        }

        const {restaurant, galleryModalIsOpen, menuItemsModalIsOpen, formModalIsOpen, menuItems, subTotal} = this.state;
        return (
            <div style={bd}>
                <div>
                    <img src={`../${restaurant.image}`} alt="No Image, Sorry for the Inconvinience" className="resImage" />
                    <button className="button" onClick={() => this.handleModal('galleryModalIsOpen', true)}>Click to see Image Gallery</button>
                </div>
                <div className="heading">{restaurant.name}</div>
                <button className="btn-order" onClick={() => this.handleModal('menuItemsModalIsOpen', true)} >Place Online Order</button>

                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" checked />
                        <label for="tab-1">Overview</label>

                        <div className="content">
                            <div className="about">About this place</div>
                            <div className="head">Cuisine</div>
                            <div className="value">{restaurant && restaurant.cuisine && restaurant.cuisine.map(cuisine => `${cuisine.name}, `)}</div>
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377; {restaurant.min_price} for two people(approx)</div>
                        </div>
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" />
                        <label for="tab-2">Contact</label>
                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">{restaurant.contact_number}</div>
                            <div className="head">{restaurant.name}</div>
                            <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles}>
                    <div>
                        <div className="material-icons" style={{
                             float:'right',
                              marginBottom: '1px' }} onClick={() => this.handleModal('galleryModalIsOpen', false)}>Close
                        </div>
                       <Carousel
                            showThumbs={false}>
                            {restaurant && restaurant.thumb && restaurant.thumb.map((item) => {
                                return <div>
                                    <img src={`../${item}`} width="600px" height="500px" />
                                </div>
                            })}
                        </Carousel> 
                    </div>
                </Modal>

                <Modal
                    isOpen={menuItemsModalIsOpen}
                    style={customStyles}
                    
                >   <div >
                        <div  className="material-icons" style={{ 
                            float: 'right', 
                            marginBottom: '10px' }} onClick={() => this.handleModal('menuItemsModalIsOpen', false)}>Close
                        </div>

                        <div style={{height:'550px'}}>
                            <h3 className="restaurant-name" style={{color:'darkblue',fontWeight:'bolder'}}>{restaurant.name}</h3>
                            <h3 className="item-total" style={{color:'darkblue',fontWeight:'lighter'}}>SubTotal : &#8377;{subTotal}</h3>
                            <button className="btn btn-danger order-button"
                                onClick={() => {
                                    this.handleModal('menuItemsModalIsOpen', false);
                                    this.handleModal('formModalIsOpen', true);
                                }}> Pay Now </button>

                            {menuItems.map((item, index) => {
                                return <div style={{ 
                                    width: '44rem',
                                     marginTop: '10px', 
                                     marginBottom: '10px',
                                      borderBottom: '2px solid #dbd8d8' }}>

                                    <div className="card" style={{ width: '43rem', margin: 'auto' ,marginLeft: '50px'}}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{
                                                 paddingLeft: '15px',
                                                  paddingBottom: '15px',
                                                  marginLeft: '-1px', }}>
                                                      
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <img className="card-img-center title-img" src={`../${item.image}`} />
                                                {item.qty == 0 ? <div>
                                                    <button className="add-button" style={{
                                                         position: 'absolute',
                                                         top: '82% !important',
                                                         left: '85% !important',
                                                         color: 'midnightblue',
                                                    }} onClick={() => this.addItems(index, 'add')}>Add</button>
                                                </div> :
                                                    <div className="add-number">
                                                        <button onClick={() => this.addItems(index, 'subtract')}>-</button>
                                                        <span class="qty">{item.qty}</span>
                                                        <button onClick={() => this.addItems(index, 'add')}>+</button>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>

                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={formModalIsOpen}
                    style={customStyles}
                   
                >
                    <div >
                        <div className="material-icons" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('formModalIsOpen', false)}>Close</div>
                        <h2>{restaurant.name}</h2>
                        <div>
                            <label>Name : </label>
                            <input class="form-control" style={{ width: '70%' }}
                                type="text" placeholder="Enter your Name" onChange={(event) => this.handleFormDataChange(event, 'userName')} />
                        </div>
                        <div>
                            <label>Email : </label>
                            <input class="form-control" style={{ width: '70%' }}
                                type="text" placeholder="Enter your Email" onChange={(event) => this.handleFormDataChange(event, 'userEmail')} />
                        </div>
                        <div>
                            <label>Address: </label>
                            <input class="form-control" style={{ width: '70%' }}
                                type="text" placeholder="Enter your Address" onChange={(event) => this.handleFormDataChange(event, 'userAddress')} />
                        </div>
                        <div>
                            <label>Contact Number : </label>
                            <input class="form-control" style={{ width: '70%' }}
                                type="tel" placeholder="Enter your Contact Details" onChange={(event) => this.handleFormDataChange(event, 'userContact')} />
                        </div>
                        <button class="btn btn-success"
                            style={{ float: 'right', marginTop: '20px' }} onClick={this.handlePayment}>Proceed</button>
                    </div>
                </Modal>

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

export default Details;
