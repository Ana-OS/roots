import Link from 'next/link';
import Nav from './Nav';
import styled from 'styled-components';

const Logo = styled.h1`a{color:red}`

export default function Header(){
    return(
        <header>
            <div className="bar">
                {/* Link tag copmes from next js */}
                <Logo> 
                    <Link href="/">Roots</Link>
                </Logo>
            </div>
            <div className="sub-bar">
                <p>Search</p>
            </div>
            <Nav/>
        </header>
    )
}