import React from 'react';


const Rank = ({name, entries}) => {
    return (
        <div>
      <div className = 'f3 white'>
        {`${name}, Your entries number is ...`}
      </div>
      <div className = 'f2 white'>
      {entries}
    </div>
    </div>
    )
} 

export default Rank;