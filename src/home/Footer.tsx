import React from 'react';

class Footer extends React.Component {
    style = {
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        height: '25px',
        width: '100%'
    }

    render(){
        return(
            <footer style={this.style}>
                2021 <span>&#169;</span> SAP
            </footer>
        )
    }
}

export default Footer;