import React, { Component } from 'react';


class Test extends Component {
    state = { 
        count : 1
     }
    render() { 
        return ( 
            <div>
                {count}
            </div>
         );
    }
}
 
export default Test;