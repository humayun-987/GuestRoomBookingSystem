import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function Navbar() {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);

  return (
    <>
    
 
    

    <MDBNavbar id='navbar' expand='lg' light style={{ backgroundColor: '#e3f2fd', padding: '0' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'><img style={{width: '3rem'}} src='./logo.png' /></MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavColorThird(!showNavColorThird)}
        >
          <MDBIcon icon='bars' style={{ariaHidden: 'true'}} />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColorThird} navbar>
          <MDBNavbarNav className='me-auto mb-2 mb-lg-0' style={{marginLeft:'15px' , marginRight:'15px'}}>
            <MDBNavbarItem className='active'>
              <MDBNavbarLink style={{fontWeight: 'bold'}} aria-current='page' href='#about'>
                ABOUT US
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink style={{fontWeight: 'bold'}} href='#conduction'>CONDUCTION</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink style={{fontWeight: 'bold'}} href='#perks'>PERKS</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink style={{fontWeight: 'bold'}} href='#contact'>CONTACT US</MDBNavbarLink>
            </MDBNavbarItem>
            <button type="button"  style={{marginLeft:'50%', backgroundColor: '#0d6efd' , padding: '0.75rem 0.375rem', borderRadius: '0.375rem',color: 'white', border: 'none', fontWeight: '400'}}> <a  href="https://forms.gle/kxrY5TS9Ke85Utvf6" style={{color:'white', }} >Register </a></button>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
  );
}