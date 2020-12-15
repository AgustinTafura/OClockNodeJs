import { View, createPlugin } from './core/main.d.ts';


class CustomView extends View {

  initialize() {
    // called once when the view is instantiated, when the user switches to the view.
    // initialize member variables or do other setup tasks.
  }

  renderSkeleton() {
    // responsible for displaying the skeleton of the view within the already-defined
    // this.el, an HTML element
  }

  unrenderSkeleton() {
    // should undo what renderSkeleton did
  }

  renderDates(dateProfile) {
    // responsible for rendering the given dates
  }

  unrenderDates() {
    // should undo whatever renderDates does
  }

  renderEvents(eventStore, eventUiHash) {
    // responsible for rendering events
  }

  unrenderEvents() {
    // should undo whatever renderEvents does
  }

}

export default createPlugin({
  views: {
    custom: CustomView,

  }
});
