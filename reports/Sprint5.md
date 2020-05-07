# Sprint 5 - *t03* - *Hugh-Lit Pack-Herd*

## Goal: Finding more places to go!
### Sprint Leader: *Ethan Liem*


## Definition of Done

* The version in `server/pom.xml` is `<version>5.0</version>`.
* The Product Increment release for `v5.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and retrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).
* No more modals...

### Clean Code
* Code Climate maintainability of A (technical debt ratio <= 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 70%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.
* Commits are done incrementally to development standards and work is done on a weekly basis
* After a task has been completed, that person will check out another task to show what they will be working on.


## Planned Epics
#### 1. Finish Modify Itinerary and Bug Fixing
    * Finish Modify Itinerary:
        - Allow the user to reorder each place in the table itinerary.
    * Remove bugs that were hindering cVWour User Experience:
        - Fixing a dateline wrapping issue with long distances that should wrap the other direction.
        - Fixing a NaN problem when a place is added to the table.
        - Showing the final polyline from the final place back to the start.
    * Improve initial testing to 70% before we add any additional code.
#### 2. Finish Optimize
    * Complete "Some" and allow the server to compute optimal distances using multiple starting points:
        - This includes creating functions to find round trip distance and a way to find the shortest 
          destination out of a place.
    * Implement "Improvements":
        - We are opting to just add 2-OPT to our improvement optimization and are disregarded 3-OPT in
          order to work on other epics.
    * Putting it all together:
        - Once we have implemented 2-OPT and "some" we will make it so they work with our slider to allow
          the user to choose the between the fastest and the best option.
#### 3. Protocol Version 5
    * Updating our config schema so that it has the new request types
    * Find creation:
        - Creating RequestFind.java and adding the post to the restfulAPIs
        - Adding the additional schema for the Find request
    * Updating our UI config to show off new requests and optimizations
#### 4. Find
    * Server Side implementation
        - Our team will work to understand the database SQL and create the serverside functions necessary to
          allow for requests to be sent, validated, and returned.
    * Client Side implementation
        - We will be adding a new search bar UI above our map with added buttons to configure search queries
        - Adding a list of destinations to choose from that the user will be able to add to their trip
#### 5. Itinerary Search
    * Creating a search bar that appears only when the table exists
        - This will move the view to that table entry and highlight the information searched for.
## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *count* |
| Tasks |  *22*   | *count* | 
| Story Points |  *28*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *04/22/20* | *341* | *338,339,340,351* |  |
| *04/24/20* | *339, 342, 351, 340* | *343, 344, 346, 347* |  |
| *04/27/20* | *343* | *346, 352, 365, 366* |  |
| *04/29/20* | *346, 352, 365, 366, 335, 338, 347, 373* | *375, 344, 336, 337, 330* |  |
| *05/04/20* | *375, 379, 331, 336, 337* | *344, 330, 345, 381* | |
| *05/04/20* | *330, 344, 332, 382, 345* | *334, 344, 381* |  |


## Review

### Epics done  
* Finished old epics and bug-fixing : we finished our Modify Itinerary Epic and fixed many of the bugs that became apparent during and after the project.
* Protocol Version 5 : we implemented the new protocol for the find object and updated our config
* Optimize : we completed optimize while foregoing the ability to improve with 2opt or 3opt.
### Epics not done 
* Find : we were able to talk to the database from the server side and implemented the ability to filter by type, but we did not get much of that implementation onto the client side.
* Search : We did not get to itinerary search as that was the lowest priority epic.

### What went well
* We learned a lot about SQL and testing a mock database.
* We learned about spheres and how to get around dateline issues.

### Problems encountered and resolutions
* Our biggest problem seemed to be the desire to finish up work on the project, there was no final drive to get things done and as such development floundered as the weeks went by.
* We had to just keep moving along and developing things to the best of our ability, I think we divided tasks up too much and therefore had problems getting everything done.

## Retrospective

### What we changed this sprint
* We made sure that everyone would always have a task out during the sprint so that each person could be held accountable for what they were working on.

### What went well
* We met often even if they were not the most productive of meetings, it was good to be able to talk to over what everyone was doing.
* We held each other accountable as best we could.
* We did the best we could with only having a four man team.

### Potential improvements
* I feel that this sprint went the most poorly because we had so little direction with what we were doing and everyone's performance suffered.
* Better communication among teammates.
* Dividing tasks up still seemed to be the most difficult part as we got stuck waiting for others to finish things before we could continue on with our own tasks.

### What we will change next time
* Our biggest improvement would be making sure that tasks get done in the order of priority and making sure that we are all on the same page.
