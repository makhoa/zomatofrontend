import React from "react";
import QuickSearchItem from "./QuickSearchItem";

class QuickSearch extends React.Component{
    render (){
        const {mealtypedata }= this.props;

        return (
            <div >
            
                <div className="search">
                <b>Quick Searches</b> 
                </div>

                <div className="discover">Discover Restaurants by type of meal</div>
                <div className="container"> 

                    <div className="row">
                            {mealtypedata.map ((item) => {
                                return   <QuickSearchItem QuickSearchItemData ={item}/>
                            })}

                

                    </div>

                </div>
                
                <div>
                <footer className="ft">
                    <span className="ft-edu">&copy; 2021 Edureka!<span className="footext"> All Rights Reserved</span></span>
                    <span className="ft-author"> Author:Makhoa</span>
                </footer>
                </div>


            </div>
        )
    }

}
export default QuickSearch;