# Research Bounties

A research bounty is an award of extra credit in return for solving a specialized task. The benefit to you is that you have the opportunity to work on an idea that extends beyond basic homework assignments and can add to your public portfolio. An added benefit is that code that you implement may contribute to a future research work for the betterment of humankind.

### Rules of the Road

The following conditions apply when attempting a research bounty.

1. You must [sign up](http://tiny.cc/researchbountysignup) before attempting a bounty.
2. After sign up, you have 3 weeks to submit your proposed solution.
3. You must do a research bounty completely own your own, do not ask me how to implement it!
3. If you have a question about an bounty that you are working on, you must ask by [creating an issue](https://github.com/CSC-510/ResearchBounties/issues/new).
4. Do not propose your own bounty.
5. Your code must use proper configuration management.
6. You may receive a maxium of 5 points from research bounties.
7. Abuse of any of these rules may result in canceling of research bounty at any time.

### Submitting

To be considered for credit, you must submit your proposed solution as a pull request.
For stand-alone bounties, put your code in `unityid/bountyname` and make a pull request to this repository. If the bounty is related to an issue in another repository, make a pull request for that repository.

### Bounties

* **Star-Index**: (0.5 points) Create a service that can compute a metric called the `star-index`, which is like [h-index](https://en.wikipedia.org/wiki/H-index), but for stars on a developers's github repos. You can use the github api. Desired language: node.js


##### Autogit

Autogit is a tool for Sublime and Visual Studio that will commit a copy of edited text to a local git repo everytime a save is made. This allows 

* **Upgrade autogit to VS 2015**: (0.5 point) Upgrade the source code to work with Visual Studio 2015. Must demonstrate still works in VS 2013 and VS 2015.

* **Automatic Commit summary**: (0.5 point) For a given git commit, analysis the words in a commit and and create a short sentance summary of commit. See [Issue #9](https://github.com/chrisparnin/autogit/issues/9).

* **autogit VS Window**: (1 point) View summary of autogit log in VS window. This requires working with Visual Studio Extensions. See [Issue](https://github.com/chrisparnin/autogit/issues/8)

* **Support Sublime Text 3**: (2 points) In order to work with Sublime Text 3, the code must be ported from python 2 to work in python 3.

##### PM

PM is an chrome extension for adding reminders to websites.

* **Investigate and fix adding issue**: (0.5 point) The remember the milk api token may need to be updated and retested: See [Issue #3](https://github.com/chrisparnin/pm/issues/5)
