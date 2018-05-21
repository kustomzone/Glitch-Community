//
// Profile.jsx!  I export TeamProfile and UserProfile.
//

import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../includes/loader.jsx';
import Thanks from './thanks.jsx';
import AddTeamUser from '../includes/add-team-user.jsx';
import {EditableDescription, StaticDescription} from './description-field.jsx';
import UserInfoPop from '../pop-overs/user-info-pop.jsx';
import {UserPopoversList} from '../users-list.jsx';

const TeamUsers = ({users, currentUserIsOnTeam, removeUserFromTeam}) => (
  <UserPopoversList users={users}>
    {(user, togglePopover) => <UserInfoPop togglePopover={togglePopover} user={user} currentUserIsOnTeam={currentUserIsOnTeam} removeUserFromTeam={() => removeUserFromTeam(user)} />}
  </UserPopoversList>
);

TeamUsers.propTypes = {
  users: PropTypes.array.isRequired,
  currentUserIsOnTeam: PropTypes.bool.isRequired,
  removeUserFromTeam: PropTypes.func.isRequired,
};

const Avatar = ({
  avatarStyle,
  isAuthorized,
  description,
  name,
  thanksCount,
  updateDescription,
  descriptionPlaceholder,
  Fields,
  AvatarButtons,
  UsernameTooltip,
}) => {
  return (
    <div className="user-avatar-container">
      <div className="user-avatar" style={avatarStyle}>
        { isAuthorized && AvatarButtons }
      </div>
      <div className="user-information">
        { !!name && (
          <h1 className="username">{name}
            {UsernameTooltip}
          </h1>
        )}
        {Fields}
        { thanksCount > 0 && <Thanks count={thanksCount}/> }
        {isAuthorized
          ?
          <EditableDescription
            initialDescription={description}
            updateDescription={updateDescription}
            placeholder={descriptionPlaceholder}
          />
          :
          <StaticDescription description={description} />}
      </div>
    </div>
  );
};

Avatar.propTypes = {
  avatarStyle: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  name: PropTypes.string,
  thanksCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  updateDescription: PropTypes.func.isRequired,
  descriptionPlaceholder: PropTypes.string.isRequired,
  Fields: PropTypes.element,
  AvatarButtons: PropTypes.element,
  UsernameTooltip: PropTypes.element,
};


const TeamAvatar = ({
  currentUserIsOnTeam, removeUserFromTeam, search, addUserToTeam, users,
  isVerified, verifiedTooltip, verifiedImage,
  uploadAvatar,
  ...props
}) => {
  
  const UserInformation = (
    <div className="users-information">
      <TeamUsers {...{users, currentUserIsOnTeam, removeUserFromTeam}}/>
      { currentUserIsOnTeam && <AddTeamUser {...{search, add: addUserToTeam, members: users.map(({id}) => id)}}/>}
    </div>
  );
  
  const UsernameTooltip = (
    <span data-tooltip={verifiedTooltip}>
      { isVerified && <img className="verified" src={verifiedImage} alt={verifiedTooltip}/> }
    </span>
  );
  
  const AvatarButtons = (
    <button className="button-small button-tertiary upload-avatar-button" onClick={uploadAvatar}>
      Upload Avatar
    </button>
  );
  
  return <Avatar {...props} isAuthorized={currentUserIsOnTeam} AvatarButtons={AvatarButtons} Fields={UserInformation} UsernameTooltip={UsernameTooltip}/>;
};
TeamAvatar.propTypes = {
  currentUserIsOnTeam: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  isVerified: PropTypes.bool.isRequired,
  verifiedImage: PropTypes.string.isRequired,
  verifiedTooltip: PropTypes.string.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

const UserAvatar = ({userLoginOrId, ...props}) => {
  const UserID = (
    <h2 className="login">@{userLoginOrId}</h2>
  );
  return <Avatar {...props} Fields={UserID}/>;
};
UserAvatar.propTypes = {
  userLoginOrId: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const Profile = ({isAuthorized, style, uploadCover, clearCover, hasCoverImage, Avatar}) => {
  return (
    <section className="profile">
      <div className="profile-container" style={style}>
        <div className="profile-info">
          {Avatar}
        </div>
      </div>
      {isAuthorized && (
        <div className="upload-cover-buttons">
          <button className="button-small button-tertiary" onClick={uploadCover}>
            Upload Cover  
          </button>
          { hasCoverImage && (
            <button className="button-small button-tertiary" onClick={clearCover}>
              Clear Cover  
            </button>
          )}
        </div>
      )}
    </section>
  );
};

Profile.propTypes = {
  style: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  uploadCover: PropTypes.func.isRequired,
  clearCover: PropTypes.func.isRequired,
  hasCoverImage: PropTypes.bool.isRequired,
  Avatar: PropTypes.element.isRequired,
};

export const TeamProfile = ({fetched, currentUserIsOnTeam, ...props}) => {
  const Avatar = fetched ? <TeamAvatar {...props} currentUserIsOnTeam={currentUserIsOnTeam} descriptionPlaceholder="Tell us about your team"/> : <Loader />;
  return <Profile {...props} isAuthorized={currentUserIsOnTeam} Avatar={Avatar}/>;
};

TeamProfile.propTypes = {
  fetched: PropTypes.bool.isRequired,
  currentUserIsOnTeam: PropTypes.bool.isRequired,
};

export const UserProfile = ({fetched, ...props}) => {
  const Avatar = fetched ? <UserAvatar {...props} descriptionPlaceholder="Tell us about yourself"/> : <Loader />;
  return <Profile {...props} Avatar={Avatar}/>;
};
                            
UserProfile.propTypes = {
  fetched: PropTypes.bool.isRequired,
};