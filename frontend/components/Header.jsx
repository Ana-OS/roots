import Link from 'next/link';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';
import styled from 'styled-components';

const Logo = styled.h1`
    font-size:4rem;
    margin-left: 2rem;
    position: relative;
    z-index:2;
    background: var(--green);
    transform: skew(-7deg);
    a{
        color:white;
        text-decoration: none;
        text-transform: uppercase;
        padding: .5rem 1rem;
    }
`;

const HeaderStyles = styled.header`
    .bar {
        border-bottom: 10px solid var(--black, black);
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
    }
    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid var(--black, black);
    }
`;

export default function Header(){
    return(
        <HeaderStyles>
            <div className="bar">
                {/* Link tag copmes from next js */}
                <Logo> 
                    <Link href="/">Roots</Link>
                </Logo>
                <Nav/>
            </div>
            <div className="sub-bar">
                <Search/>
            </div>
            <Cart />
        </HeaderStyles>
    )
}