import React from "react";
import {withRouter} from 'react-router-dom';


class QuickSearchItem extends React.Component {
    
    handleNavigate = (mealtype_id) => {
       const location_id = sessionStorage.getItem(`location_id`);
       if (location_id) {
        this.props.history.push(`/Filter?Mealtype=${mealtype_id}&Location=${location_id}`);
       }
       else
       {
        this.props.history.push(`/Filter?Mealtype=${mealtype_id}`);
       }
        
    };

    render (){

            const { QuickSearchItemData} = this.props;
            return (

                    <div key={ QuickSearchItemData._id} className="col-lg-4  col-md-6  col-sm-12 grid" onClick={() => this.handleNavigate (QuickSearchItemData.mealtype_id) }>
                       
                            <div className="giv">
                                <img src={`./${QuickSearchItemData.image}`} className="images" alt = "Breakfast"/>
                            </div>

                            <div className="give">
                                <div className="gridtitle">{ QuickSearchItemData.name}</div>
                                <div className="griddescription">{ QuickSearchItemData.content}</div>
                            </div>
                        
                    </div>

          
            )
    }

}
export default withRouter (QuickSearchItem) ;