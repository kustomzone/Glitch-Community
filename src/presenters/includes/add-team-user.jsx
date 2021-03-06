import React from 'react';

import AddTeamUserPop from '../pop-overs/add-team-user-pop.jsx';
import PopoverContainer from '../pop-overs/popover-container.jsx';

const AddTeamUser = (props) => (
  <PopoverContainer>
    {({visible, togglePopover}) => (
      <span className="add-user-container">
        <button onClick={togglePopover} className="button button-small button-tertiary add-user">Add</button>
        {visible && <AddTeamUserPop {...props} togglePopover={togglePopover}/>}
      </span>
    )}
  </PopoverContainer>
);

export default AddTeamUser;