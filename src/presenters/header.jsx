/* global analytics */

import UserOptionsPop from "./pop-overs/user-options-pop.jsx";
import SignInPop from "./pop-overs/sign-in-pop.jsx";
import NewProjectPop from "./pop-overs/new-project-pop.jsx";
import React from 'react';
import PropTypes from 'prop-types';
import {join as joinPath} from 'path';

const Logo = () => {
  const LOGO_DAY = "https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Flogo-day.svg";
  const LOGO_SUNSET = "https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Flogo-sunset.svg";
  const LOGO_NIGHT = "https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Flogo-night.svg";

  let logo = LOGO_DAY;
  const hour = (new Date()).getHours();
  if ((hour >= 16) && (hour <= 18)) {
    logo = LOGO_SUNSET;
  } else if ((hour > 18) || (hour <= 8)) {
    logo = LOGO_NIGHT;
  }

  return <img className="logo" src={logo} alt="Glitch" />;
}

const ResumeCoding = (
  <a class="" href="https://glitch.com/edit/" data-track="resume coding">
     <div class="button button-small button-cta">Resume Coding</div>
  </a>
);

const submitSearch = (event) => {
  if (event.target.children.q.value.trim().length === 0) {
    return event.preventDefault();
  }
};

const SearchForm = ({baseUrl, onSubmit, searchQuery}) =>(
  <form action={joinPath(baseUrl, "search")} method="get" role="search" onSubmit={onSubmit}>
    <label class="screen-reader-text" for="search-projects">Search Glitch projects</label>
    <input id="search-projects" class="search-input" name="q" placeholder="bots, apps, users" value={searchQuery}/>
  </form>
);

const UserOptionsPopInstance = ({user, overlayNewStuffVisible}) => {
  const props = {
    teams: user.teams,
    profileLink: `/@${user.login}`,
    avatarUrl: user.avatarUrl,
    showNewStuffOverlay() {
      return overlayNewStuffVisible(true);
    },
    signOut() {
      analytics.track("Logout");
      analytics.reset();
      localStorage.removeItem('cachedUser');
      return location.reload();
    },
  };

  return <UserOptionsPop {...props}/>;
};

const NewProjectPopInstance = ({ProjectModel, api}) => {
  const projectIds = [
    'a0fcd798-9ddf-42e5-8205-17158d4bf5bb', // 'hello-express'
    'cb519589-591c-474f-8986-a513f22dbf88', // 'hello-sqlite'
    '929980a8-32fc-4ae7-a66f-dddb3ae4912c', // 'hello-webpage'
  ];
  const projects = ProjectModel.getProjectsByIds(api, projectIds);
  const fetchedProjects = projects.filter(project => project.fetched());
  const newProjects = fetchedProjects.map((project) => {
  const props = project.asProps();

    //Deliberately hide the user list 
    props.users = [];
    return props;
  });

  return <NewProjectPop newProjects={newProjects}/>
}

const Header = (application, ProjectModel) => {
  
  const baseUrl = application.normalizedBaseUrl();
  const user = application.currentUser().asProps();
  const signedIn = !!user.login();
  const searchQuery = application.searchQuery
  const api = application.api();;
  const overlayNewStuffVisible = application.overlayNewStuffVisible;

  return (
    <header role="banner">
      <div class="header-info">
        <a href={baseUrl}>
          <Logo/>
        </a>
      </div>
     
     <nav role="navigation">
        <SearchForm baseUrl={baseUrl} onSubmit={submitSearch} searchQuery={searchQuery}/>
        <NewProjectPopInstance ProjectModel={ProjectModel} api={api}/>
        { !signedIn && <SignInPop/> }
        <ResumeCoding/>
        <UserOptionsPopInstance user={user} overlayNewStuffVisible={overlayNewStuffVisible} />
     </nav>
  </header>
    );
};

export default Header;
