"use strict";

// 🐈

export default function() {
  var self = {

    // equal to most newest update.id
    totalUpdates() { 
      return self.updates()[0].id;
    },
    
    /*  Example template:
    
     {
          id: 3,
          title: "Example Title",
          body: `
Your markdown body, here.

As long as you like.
`,
        },
        
        
    */

    // prepend new updates
    updates() {
      return [
        {
          id: 5,
          title: "What's in a @name?",
          body: `
*&nbsp;&nbsp;&nbsp;&nbsp;That which we call a @user  
&nbsp;&nbsp;&nbsp;&nbsp;Or any other w0rd if spelled in l33t;  
&nbsp;&nbsp;&nbsp;&nbsp;So @user would, were she not @user call'd,  
&nbsp;&nbsp;&nbsp;&nbsp;Retain that dear perfection which she owes  
&nbsp;&nbsp;&nbsp;&nbsp;Without that title. @User, doff thy name,  
&nbsp;&nbsp;&nbsp;&nbsp;And for that name which is no part of thee  
&nbsp;&nbsp;&nbsp;&nbsp;rename thyself.* 

![](https://cdn.glitch.com/41bc522e-d971-486e-b08e-7c12034743f9%2FSpeareShaker2000.PNG?1528404038461)
(You can now edit your @user and display names. 🎭)
`,
        },
        {
          id: 4,
          title: "Preview Project Apps and Code",
          body: `
Clicking on a project now shows you a preview of that project and its code. Find just the right [beautiful-cube](https://glitch.com/~beautiful-cubes) or [NASA logo](https://glitch.com/~nasa) for you.

![](https://cdn.glitch.com/ebc03e27-d75d-42a2-9741-66496be988d9%2Fgiphy%5B1%5D.gif?1528218891010)
`,
        },
        {
          id: 3,
          title: "A Quicker Way to a New Project",
          body: `
We added a <code>New Projects</code> button to the header. Because sometimes you have a new web-based dream to explore – right now.

![New Project button in the header](https://cdn.glitch.com/ecc11a20-0b0d-490f-85ac-edf82f8d1a53%2Fupdate-new-project.png?1526413635223)

It works just like the editor. Enjoy those hot new dreams.
`,
        },
        {
          id: 2,
          title: "Glitch for Teams",
          body: `
Soon, we’ll provide Glitch to teams at work, so developers, designers and anyone with an idea can create real, full-power apps incredibly easily.

But we’re counting on you to help us define what that offering will include. [Sign up](https://glitch.com/forteams) and let us know what you need from Glitch in the workplace, be the first to hear what’s coming to Glitch for Teams, and help inform its development.
`,
        },
        {
          id: 1,
          title: "Deleted, but not forgotten",
          body:
          `
You can now delete _and undelete_ projects. 🎉

Tidy up your profile page without fear of regret.
There's a new "Delete This" button on your project tiles that'll let you clean up 
your old experiments and help you present a healthier, more active looking profile page. 🥦

![Delete using the project's dropdown list](https://cdn.glitch.com/03736932-82dc-40e8-8dc7-93330c933143%2Fnew-stuff-delete.png?1518549490386)

All of your deleted projects are listed for you at the bottom of your profile page,
and you can restore them to life with just one click.

![Undelete projects using the new controls at the bottom of your profile page](https://cdn.glitch.com/03736932-82dc-40e8-8dc7-93330c933143%2Fnew-stuff-undelete.png?1518552423035)

No forever-💔 here, every project has a second chance.
`,
        },
      ];
    },
  };


  return self;
}
