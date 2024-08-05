import Container from '@mui/material/Container';
import logo from '../../assets/icons/logo-black1.svg'
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import './Nav.css';

function Nav() {
   return ( 
            <nav className='nav'>
                <Container>
                    <Box className="nav__inner">
                        <img src={logo} alt="logo" className="logo"/>
                            <Box className="links">
                                    <Link to='/' className='link' href="#">Charactes</Link>
                                    <Link to='/locations' className='link' href="#">Locations</Link>
                                    <Link to='/episodes' className='link' href="#">Episodes</Link>
                            </Box>
                    </Box>
                </Container>
            </nav>
   )
}

export default Nav;