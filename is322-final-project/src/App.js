import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Map from './components/map/Map'
import Grid from './components/grid/Grid'
import Profile from './components/profile/Profile'
import PageTabs from './components/PageTabs'
import './styles/app.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <PageTabs/>
        <div>
          <Route path="/" exact component={Map} />
          <Route path="/listings" component={Grid} />
          <Route path="/profile" component={Profile} />
          {/* <Route path="/page/:id" component={VariablePage} /> */}
        </div>
      </BrowserRouter>
    </div>
  )
}

class AppOld extends React.Component {
  state = {
    view: 'page1'
  }
  
  onViewChange(view) {
    this.setState({ view });
  }

  wrapPage(jsx) {
    const { view } = this.state;
    return (
      <div className="container">
        <PageTabs currentView={view}
                  onViewChange={this.onViewChange.bind(this)}/>
        {jsx}
      </div>
    );
  }

  render() {
    const { view } = this.state;

    switch (view) {
      case 'page1':
        return (this.wrapPage(<Map />));
      case 'page2':
        return (this.wrapPage(<Grid />));
      case 'page3':
        return (this.wrapPage(<Profile />));
      default:
        return (this.wrapPage(<h2>Invalid Tab, choose another</h2>));
    }

  }
}

export default App;