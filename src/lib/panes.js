import {Pane, PaneGroup} from "./pane";

export let topLevelPanes = new PaneGroup();
export let jobPane = new Pane('job-pane', 'Job', 'job-display', topLevelPanes, false);
export let readingPane = new Pane('reading-pane', 'Reading', 'study-fields', topLevelPanes);

export let labPanes = new PaneGroup();
export let researchPane = new Pane('research-pane', 'Research', 'research-display', labPanes);
export let queuePane = new Pane('queue-pane', 'Queue', 'queue-display', labPanes);
export let labPane = new Pane('lab-pane', 'Lab', 'lab-display', topLevelPanes, false, labPanes.panes);

export let lambdaPanes = new PaneGroup();
export let warPane = new Pane('war-pane', 'War', 'war-display', lambdaPanes);
export let loopTrapPane = new Pane('looptrap-pane', 'Loop Trap', 'looptrap-display', lambdaPanes);
export let lambdaPane = new Pane('lambda-pane', 'Lambda', 'lambda-display', topLevelPanes, false, lambdaPanes.panes);

let lifestylePanes = new PaneGroup();
export let happinessPane = new Pane('happiness-pane', 'You', 'happiness-explain', lifestylePanes);
export let healthPane = new Pane('health-pane', 'Health', 'health-display', lifestylePanes);
export let housingPane = new Pane('housing-pane', 'Home', 'housing-display', lifestylePanes);
export let boostsPane = new Pane('boosts-pane', 'Boosts', 'boosts-display', lifestylePanes);
export let lifestylePane = new Pane('lifestyle-pane', 'Lifestyle', 'lifestyle-display', topLevelPanes, false, lifestylePanes.panes);

export let eventPane = new Pane('event-pane', 'Events', 'events-display', topLevelPanes);

let otherPanes = new PaneGroup();
export let settingsPane = new Pane('settings-pane', 'Settings', 'settings-display', otherPanes, false);
export let keyBindingsPane = new Pane('keybindings-pane', 'Keyboard Shortcuts', 'keybindings-display', otherPanes, false);
export let aboutPane = new Pane('about-pane', 'About', 'about-display', otherPanes, false);
export let privacyPane = new Pane('privacy-pane', 'Privacy', 'privacy-display', otherPanes, false);
export let otherPane = new Pane('other-pane', 'Other', 'other-display', topLevelPanes, true, otherPanes.panes);

export let groundhogMarketPane = new Pane('groundhogmarket-pane', 'Market', 'groundhog-market', topLevelPanes, false);

let journalPanes = new PaneGroup();
export let achievementPane = new Pane('achievement-pane', 'Achievements', 'achievements-display', journalPanes);
export let logPane = new Pane('log-pane', 'Log', 'log-display', journalPanes);
export let lifeSummaryPane = new Pane('life-summary-pane', 'History', 'life-summary', journalPanes);
export let journalPane = new Pane('journal-pane', 'Journal', 'journal-display', topLevelPanes, false, journalPanes.panes);

export let panes = [
    lifestylePane,
    jobPane,
    labPane,
    eventPane,
    journalPane,
    lambdaPane,
    groundhogMarketPane,
    otherPane
];

export function selectPane(module) {
    if (module.unlocked()) {
        if (module.paneGroup.allowMultiple)
            module.toggle();
        else {
            for (let pane of module.paneGroup.panes) {
                pane.deselect();
            }
            module.select();
        }
        if (module.subpanes.length > 0) {
            let u = false;
            for (let subpane of module.subpanes) {
                u = u || subpane.state.selected;
            }
            if (!u)
                module.subpanes[0].select();
        }
    }
}
