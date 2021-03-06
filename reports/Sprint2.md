# Sprint 2 - *T03* - *Hugh-Lit Pack-Herd*

## Goal

### What is the distance?
### Sprint Leader: *Brandon Vasquez*

## Definition of Done

* The version in `server/pom.xml` is `<version>2.0</version>`.
* The Product Increment release for `v2.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and restrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

Epics planned for this release.

### Where Is?
    The "Where Is?" epic implements the feature to allow users to drop a marker on the map
    by inputting a latitude and longitude. When a valid latitude and longitude is provided, 
    the marker displays at the location. The marker should display the latitude and
    longitude in the format the user provided. We are going to need to convert the
    latitude/longitude to another format for the map software, but this shouldn't be displayed
    to the user.
### Server Support
    The "Server Support" epic gives the user the option to view server capabilities. When the 
    team name is clicked in the footer we will need to use a collapsible or pop-up section to
    display a place for the server configuration. We also need to implement a close button that
    will return the user to the previous display.
### Support Protocol standard v2
    During the "Support Protocol standard v2" epic we need to ensure that we support the
    protocol standard and schemas provided to us.
### Distance
    The "Distance" epic adds a couple of different features to the project. The first
    feature that needs to be implemented is the ability to touch/click to add two markers
    on the map. We also need to add a "distance" button that allows the user to enter two destinations
    to calculate. If there are two destinations set on the map, and the user clicks the "distance" button
    the distance is then calculated based on Earth's rotation.
### Map
    In the "Map" epic we need to add some sort of visual queue to connect the two destinations
    that are on the map. In order to do so, we will need to scale the map accordingly to show
    the two points and draw a line between them.
### Standard Units
    For the "Standard Units" epic we need to be able to allow the user to select their
    choice of unit. In order to accomplish this we will need to be able to allow
    the user to select miles, kilometers and nautical miles for the units of distance.
    When calculating the distance we will need to alter our Earth's radius according
    to the unit chosen.
### Custom Units
    During the "Custom Units" epic we will be implementing the feature for users to
    create their own custom units. To do so, the user will need to provide a name 
    and the corresponding Earth radius. The user should be able to maintain a list
    of custom units, allowing them to add to, modify, or delete from the list.
    The lists should be saved across sessions so the user does not need to reenter
    them.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *7* | *5* |
| Tasks |  *29*   | *40* | 
| Story Points |  *29*  | *40* | 

### Planned Metrics Summary
    Based off of our previous sprint we plan on utitilizing our resources more
    efficiently. We will also plan on starting Sprint 2 sooner than we did in
    Sprint 1. In Sprint 1, we waited too long to start implementing our Epics to
    the application and this was a huge flaw for our planning process. In order
    to improve our timelines we have already started working on Sprint 2 and plan
    to have all of the Epics completed. 

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *02/12/20* | *109, 113, 112, 110, 33* | *39, 34, 35, 40* |  | 
| *02/14/20* | *32, 33, 34, 35, 38, 39, 40, 107* |  |  |
| *02/19/20* | *85, 87, 88, 131, 132, 136* | *90, 91, 92* |  | 
| *02/21/20* | *95, 142, 144, 147, 148* | *92, 143* |  |
| *02/24/20* | *100, 92, 99, 152* | *143, 96, 98* |  |
| *02/26/20* | *123, 143, 156, 157, 161, 151* | *96, 162, 163* |  |

## Review

### Epics done  
* **Where Is?**: "Where Is" did not go bad for us this sprint. We were able to figure out how to use ReactJS forms which allowed us to successfully
submit our input. Completing this epic helped us in the long run for solving the "Distance" epic.
* **Server Support**: "Server Support"
* **Support Protocol Standard v2**: Implementing this epic was not technically hard. Understanding what was actually being implemented was the 
challenging part for this epic. None of us understood what "requests" and "responses" were until were started messing around with the code.
* **Distance**: The "Distance" epic was the MOST challenging epic we had to solve this sprint. We spent more time than planned completing this epic.
Calculating the distance between two points using Vincenty's formula was challenging, but not nearly as challenging as getting the client side of our
application to communicate with the server. Understanding the "Support Protocol Standard v2" epic helped us under stand how HttpPOSTs work in ReactJS.
* **Standard Units**: This epic was the easiest epic to implement this sprint. We implemented the "Distance" epic to take an Earth radius as a parameter,
which helped us implement using different standard units towards the distance. Implementing a drop down to allow the user to choose a standard unit was
a little difficult because there was poor documentation about ReactStrap DropDowns, but we figured it out.
### Epics not done
* **Custom Units**: Our team decided that it was a safe idea to throw the "Custom Units" epic in the icebox because there was enough work to make 
the "Distance" epic run smoothly.
* **Map**: Our team couldn't figure out how to implement this epic correctly, so we threw it in the icebox.
### What went well
* Overall, we are satisfied with how our UI looks and how we implemented the "Distance" epic. The user is able to find distance between to points by
clicking around on the map, or by submitting coordinates. Also, our user interface still looks good on mobile devices, which is what we are aiming for.

### Problems encountered and resolutions
* Our number one problem this sprint was understanding the communication between the client and server side. This problem caused a roadblock in how
productive we can be and eventually resulted in us not completing two epics.

## Retrospective

### What we changed this sprint
* We spent more time in the lab this sprint. Doing this allowed us to work together as a team. We also spent less time not understanding what we are
doing and more time on asking questions.

### What went well
* We worked well as a team and there was improvement in our communication this sprint. We were able to meet more which helped us be more productive
and stay on the same page.

### Potential improvements
* We need to start on our epics in a more efficient manner during Sprint 3. Another component that needs work is our map UI, it needs touch ups 
as it does not fit the map to show all points. We can also put more detail and thought into our individual tasks that we assign to epics. We ended with 
almost double the amount of tasks and story points this Sprint.

### What we will change next time
* We will start on the sprint earlier and be more thorough during our planning process. If we would have planned Sprint 2 a little better, we could
have completed all of the epics.
