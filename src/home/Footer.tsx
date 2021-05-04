import React from 'react';

class Footer extends React.Component {
    style = {
        backgroundColor: '#554348',
        color: '#93B7BE',
        textAlign: 'center',
        height: '25px',
        width: '100%',
        position: 'fixed',
        bottom: '0px',
        fontWeight: 'bold'
    }

    render(){
        return(
            <footer style={this.style}>
                2021 <span>&#169;</span> Greenwood Auto Parts
            </footer>
        )
    }
}

export default Footer;