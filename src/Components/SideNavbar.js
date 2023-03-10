import React from 'react';
import {useSelector, useDispatch} from 'react-redux/es/exports';
import {SideNavbarContainer, Sidenavbar, Overlay} from '../Styles/SideNavbar';
import logo from '../Assets/Logo.png';
import {FaTimes} from 'react-icons/fa';
import {navbar} from '../Redux/Actions/AnimationAction';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Button from '../Components/Button';
import {isLogin as login} from '../Redux/Actions/AnimationAction';

export default function SideNavbar() {
  let navbarToggle = useSelector((state) => state.animations.navbar);
  let isLogin = window.localStorage.getItem('token');
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const closeNavbar = () => {
    dispatch(navbar());
  };

  const scrollTop = () => {
    dispatch(navbar());
    navigate('/');
    let hero = document.querySelector('.hero');
    hero.scrollIntoView({block: 'end', behavior: 'smooth'});
  };

  let scrollServices = () => {
    let service = document.querySelector('.service');
    service.scrollIntoView({block: 'center', behavior: 'smooth'});
    dispatch(navbar());
    navigate('/');
  };

  let scrollFaq = () => {
    let faq = document.querySelector('.faq');
    faq.scrollIntoView({block: 'center', behavior: 'smooth'});
    dispatch(navbar());
    navigate('/');
  };

  let scrollWhy = () => {
    let why = document.querySelector('.why');
    why.scrollIntoView({block: 'center', behavior: 'smooth'});
    dispatch(navbar());
    navigate('/');
  };

  let scrollTestimonial = () => {
    let testi = document.querySelector('.testi');
    testi.scrollIntoView({block: 'center', behavior: 'smooth'});
    dispatch(navbar());
    navigate('/');
  };

  let removeToken = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  if (navbarToggle === true) {
    return (
      <React.Fragment>
        <Sidenavbar>
          <SideNavbarContainer>
            <Link to="/" onClick={scrollTop}>
              <img src={logo} alt="Logo" />
            </Link>
            <li onClick={scrollServices}>Our Services</li>
            <li onClick={scrollWhy}>Why Us</li>
            <li onClick={scrollTestimonial}>Testimonial</li>
            <li onClick={scrollFaq}>FAQ</li>
            {isLogin ? (
              <Link to="">
                <Button action={removeToken}>Logout</Button>
              </Link>
            ) : (
              <Link to="/login" onClick={closeNavbar}>
                <Button>Login</Button>
              </Link>
            )}
            <Link
              to="/admin"
              onClick={() => {
                closeNavbar();
                dispatch(login(true));
              }}
            >
              <Button>Admin</Button>
            </Link>
            <FaTimes className="close" onClick={closeNavbar}></FaTimes>
          </SideNavbarContainer>
        </Sidenavbar>
        <Overlay></Overlay>
      </React.Fragment>
    );
  } else {
    return null;
  }
}
