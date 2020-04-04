import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pageTabs.css'

class PageTabs extends React.Component {
  state = { 
    currentPage: '/',
    // currentPage: this.props.isMobile ? '/restauraunts' : '/',
    isMobile: false
  }

  isActiveTab(tabName) {
    // if (this.props.isMobile) {
    //   return 'nav-link active'
    // }
    return (tabName === this.state.currentPage) ? 'nav-link active' : 'nav-link';
  }

  // componentDidMount() {
  //   if (this.props.isMobile) {
  //     this.setState({
  //       currentPage: '/restauraunts'
  //     })
  //   }
  // }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleWindowSizeChange);
  // }  

  handleWindowSizeChange = () => {
    // const isMobile = width <= 500;
    const width = window.innerWidth;
    if (width <= 600) {
      this.setState({ 
        currentPage: '/'
       });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isMobile !== this.props.isMobile) {
      if (this.props.isMobile) {
        this.setState({
          currentPage: '/restauraunts'
        })
      }
    }
  } 

  onTabClick(event, tabName) {
    this.setState({ currentPage: tabName })
  }

  render () {
    // console.log('this.props.isMobile: ', this.props.isMobile)
    if (!this.props.isMobile) {
      return (
        <ul className='nav page-tabs'>
          <h1 className="nav-title">
            <Link className={this.isActiveTab('/')} id="nav-title" to="/"
            onClick={event => this.onTabClick(event, '/')}
            style={{ textDecoration: 'none' }}
            >
              FoodHub
          </Link>    
          </h1>
          <div className="nav-item-wrapper">
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/')} to="/"
                          onClick={event => this.onTabClick(event, '/')}
                          style={{ textDecoration: 'none' }}
                          >
                      Map
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/restauraunts')} to="/restauraunts"
                          onClick={event => this.onTabClick(event, '/restauraunts')}
                          style={{ textDecoration: 'none' }}
                          >
                      Restauraunts
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/profile')} to="/profile"
                          onClick={event => this.onTabClick(event, '/profile')}
                          style={{ textDecoration: 'none' }}
                          >
                      Profile
                  </Link>
              </li>
          </div>
        </ul>
      )
    } else {
      return (
        <ul className='nav page-tabs'>
          <h1 className="nav-title">
            <Link className={this.isActiveTab('/')} id="nav-title" to="/"
            onClick={event => this.onTabClick(event, '/')}
            style={{ textDecoration: 'none' }}
            >
              FoodHub
          </Link>    
          </h1>
          <div className="nav-item-wrapper">
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/')} to="/"
                          onClick={event => this.onTabClick(event, '/')}
                          style={{ textDecoration: 'none' }}
                          >
                      Restauraunts
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link className={this.isActiveTab('/profile')} to="/profile"
                          onClick={event => this.onTabClick(event, '/profile')}
                          style={{ textDecoration: 'none' }}
                          >
                      Profile
                  </Link>
              </li>
          </div>
        </ul>
      )
    }
    
  }

};

export default PageTabs;