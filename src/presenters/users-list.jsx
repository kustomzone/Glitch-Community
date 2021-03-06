import React from 'react';
import PropTypes from 'prop-types';

import PopoverContainer from './pop-overs/popover-container.jsx';
import {ANON_AVATAR_URL} from '../models/user.js';

function addDefaultSrc(event) {
  event.target.src = ANON_AVATAR_URL;
}

const UserAvatar = ({
  alt, 
  userAvatarUrl,
}) => (
  <img onError={addDefaultSrc} className="user-list-avatar" width="32px" height="32px" src={userAvatarUrl} alt={alt}/>
);

UserAvatar.propTypes = {
  alt: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
};

const UserTile = ({
  userLink,
  tooltipName, 
  style,
  alt, 
  userAvatarUrl,
  extraClass="",
}) => (
  <a className={`user ${extraClass}`} href={userLink} data-tooltip={tooltipName} data-tooltip-left="true" style={style}>
    <UserAvatar userAvatarUrl={userAvatarUrl} alt={alt} />
  </a>
);

UserTile.propTypes = {
  userLink: PropTypes.string,
  tooltipName: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  extraClass: PropTypes.string,
};

export const PopulatedUsersList = ({users, extraClass="" }) => (
  <ul className={`users ${extraClass}`}>
    {users.map((user, key) => (
      <li key={key}>
        <UserTile {...user} />
      </li>
    ))}
  </ul>
);

PopulatedUsersList.propTypes = {
  users: PropTypes.array.isRequired,
  extraClass: PropTypes.string,
};

const glitchTeamAvatar = "https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fglitch-team-avatar.svg?1489266029267";
const UsersList = ({glitchTeam=false, users, ...props}) => {
  if(glitchTeam) {
    users = [{
      userLink: null,
      tooltipName: "Glitch-Team",
      style: {backgroundColor:"#74ecfc"},
      alt: "Glitch Team Avatar",
      userAvatarUrl: glitchTeamAvatar,
      extraClass: "made-by-glitch",
    }];
  }
  return <PopulatedUsersList users={users} {...props}/>;
};

UsersList.propTypes = {
  glitchTeam: PropTypes.bool,
};

export default UsersList;

const UserPopoverTile = ({
  tooltipName, 
  style,
  alt, 
  userAvatarUrl,
  children,
}) => (
  <PopoverContainer>
    {({visible, togglePopover}) => (
      <div className="button-wrap">
        <button onClick={togglePopover} className="user button-unstyled" data-tooltip={tooltipName} data-tooltip-left="true" style={style}>
          <UserAvatar userAvatarUrl={userAvatarUrl} alt={alt} />
        </button>
        {!!visible && children(togglePopover)}
      </div>
    )}
  </PopoverContainer>
);

UserPopoverTile.propTypes = {
  userLink: PropTypes.string,
  tooltipName: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  extraClass: PropTypes.string,
  children: PropTypes.func.isRequired,
};

export const UserPopoversList = ({users, children}) => (
  <ul className="users">
    {users.map((user, key) => (
      <li key={key}>
        <UserPopoverTile {...user}>
          {(togglePopover) => children(user, togglePopover)}
        </UserPopoverTile>
      </li>
    ))}
  </ul>
);

UserPopoversList.propTypes = {
  users: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
};