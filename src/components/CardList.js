import React from 'react';
import Card from './Card';

const Cardlist = ({ robots }) => {  //pass robots dynamically with props
    return (
        <div>
            {
                robots.map((user, i) => {  //loop through robots and assign to user
                    return (
                        <Card           // return card with props assigned
                            key={i} 
                            id={robots[i].id} 
                            name={robots[i].name} 
                            email={robots[i].email}
                        />
                     );
                })
            }
        </div>
    );
}

export default Cardlist;