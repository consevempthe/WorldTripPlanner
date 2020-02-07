# Sprint #1 - T03 - Hugh-Lit Pack-Herd

## Goal

### Where Am I?
### Sprint Leader: *Ethan Liem*

## Definition of Done

* Web application deployed on the production server (black-bottle.cs.colostate.edu).
* Version in server/pom.xml should be `<version>1.0</version>`.
* Product Increment release `v1.0` created on GitHub.
* Sprint Review and Restrospectives completed (team/sprint1.md).
* Design updated (team/design.md).

## Policies

* GitHub etiquette


## Plan

Epics planned for this release.

* *Set Team Name*
* *Where Am I?*
* *About*
* *Where Is?*
* *Server Support*


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | 3 |
| Tasks |  18   | 13 | 
| Story Points |  26  | 25 |


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *1-31-20* | *21,37,42,41,43,44* | *18,36,19,20* | *none* |
| *02-03-20* | *36* | *16,18,19,22,25,47* | *none* |
| *02-05-20* | *47,48,36,22,18,30,56,19,20,28,31,25,29,27,62* | *24,26* | *none* | 




## Review

#### Completed epics in Sprint Backlog 
* **Where Am I #17**: Where Am I was the most technically challenging Epic for our team to complete, but we successfully implemented all of the tasks. The Mozilla Geolocation API proved useful in obtaining geolocation information and for binding the Navigator object to our Atlas. The user is zoomed into their location upon launch, and can then freely move the cursor to obtain coordinates for any location they click. Our "Where Am I?" button was designed with mobile users in mind. It spans the entire bottom of our map making it more ergonomic for smaller screens with more vertical aspect ratios. The button scales with larger screen sizes in order to maintain functionality with today's variety of mobile screen sizes. Implementing this Epic gave our team a lot of experience with Javascript, Reactstrap, and Leaflet. The use of GitHub taught us to work together and understand the importance of proper etiquette.
* **Set Team Name #16**: Our team name is Hugh-Lit Pack-Herd. We decided our team name would be a tongue-and-cheek pun of HP by phonetically spelling out Hewlett-Packard with different words, because of the irony. Our instructor Dave Matthews had worked for them and we are now working for him, So we thought it would be a clever tribute. Our team logo is an upside down version of the new HP logo making it look like 'dq'.
* **About #23**: Our "About" page allowed us to continue to poke fun at HP. We modified HP's About page to fit the CS314 curriculum with some self-deprecating humor to make fun of our teams coding skills. Our page was mainly designed to encourage learning how to develop with responsive web design in mind and dip our toes into reactstrap. Our bios were created to look good in both mobile, tablet, and desktop browser environments.

#### Incomplete epics in Sprint Backlog 
* **Where Is? #32**: Our team decided that enough work was needed to make our "Where Am I?" look and feel good for the user experience that we decided it would be more advantageous to fine tune the necessary Epic then work on, and potentially not finish this epic. When we implement this Epic we will follow the design philosophy we used for "Where Am I?" to ensure it works well on mobile devices and implements the necessary tasks.
* **Server Support #38**: Server support was on the bottom of our backlog. During the development of the "Where Am I?" Epic, we realized that we would not be able to get to this Epic, and learned a lot about estimating future workloads. 

#### What went well
* All of our team members worked well with each other and fit into the Forming stage of group development. We have gotten to know each other better and have started regularly communicating in order to keep up with each other's work.
* The overall process of checking out branches and working on the project individually was difficult at first, but eventually each group member accomplished tasks and improved upon understanding the project as a whole.
* The "About" epic went smoothly; we were able to complete all of the tasks and enjoyed adding some personalization to the project.
* We were able to reach our goal by implementing the "Where am I?" feature.
* Our team was able to meet in the CSB 120 lab frequently and it helped us to assist each other and stay on the same page. We were able to work out our strengths and weaknesses and fill in the gaps of our various programming knowledge. Project logistics and planning were consistently communicated so that nobody felt out of the loop.

#### Problems encountered and resolutions
* We couldn't figure out how to post a form with valid coordinates.
* We couldn't figure out how to keep the marker centered at all times.
* We couldn't figure out how to apply the "geolocation" API to our application, until we read some documentation about Leaflet.
* We couldn't get our bio images to appear on the deployed site until we realized we were using absolute paths rather than relative paths

## Retrospective

#### What went well
* We know our team dynamic is strong. No one in the team was more experienced than the others, but we definitely had individual strengths and weaknesses, which we learned to accept and work with by delegating tasks appropriately. We learned to work on equal footing and everyone carried their own weight.
* This was our first sprint working together, which was definitely intimidating at first, but our team work skills never became a problem. As a team, we have communicated effectively and thoroughly to ensure that everyone is one the same page.
* We managed to not break master.
#### Potential improvements
* Our team started working on the sprint about half way into it and didn't complete all of the Epics we thought we could. Starting earlier would either have let us complete more work, or at least come out with a more polished product. Efforts towards learning to use the tools required for this project took up a significant portion of our time, so we believe this should not be as much of a problem in the future.
* We didn't use the design.md file to its fullest ability. Better use of this tool could have helped us understand how we would implement our design before we started working. Creating a meeting early on to develop a framework for this sprint would be beneficial, and we plan on doing so next sprint.
* Our Map UI could use some improvements. Right now it is not as smooth as we would like it to be when clicking on different locations.
#### What we will change next time
* We will start designing our sprint earlier, especially now that our team has a better understanding for the workflow and load necessary. Starting earlier could allow for more time before final deployment, allowing
for more revising and polishing if needed.
* We will try to meet more formally to discuss the design of the project, or just talk overall about Epics that we are working on. Understanding the work our fellow team members are completing will help us to understand the design and structure of our code and make future improvements smoother.
* We will definitely simplify tasks by breaking them apart into smaller segments when possible, because we found that strategy to work well when we were able to.
* Utilize TA office hours more, as the time we have spent talking with a TA has been incredibly insightful.
