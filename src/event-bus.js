import Vue from 'vue';
export const EventBus = new Vue();

/**
 * When two components may need to communicate with one another but they are not parent/child to each other, 
 * it can be used an empty Vue instance as a central event bus in very simple scenarios. 
 * In more complex cases, it should be considered employing a dedicated state-management pattern and using Vuex.
 */