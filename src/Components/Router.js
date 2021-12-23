import { BrowserRouter as Routers, Route } from 'react-router-dom';
import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import Header from './Header';

function Router (){
    return (
        <Routers>
                 <Header />
                <Route exact path ="/" component={Home} />
                <Route path ="/filter" component={Filter} />
                <Route path ="/Details" component={Details} />
          
        </Routers>
    )  

}

export default Router;