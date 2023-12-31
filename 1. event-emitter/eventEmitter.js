/*
 * The class representing an event emitter
 *
 * @class EventEmitter
 * */

class EventEmitter {
  #listeners = {};

  /*
   * This method returns an array of listeners registered for the given event name.
   * */
  #getRegisteredListeners(eventName) {
    return this.#listeners[eventName] || [];
  }

  /*
   * This method registers a new listener for the given event name.
   * */
  on(eventName, fun) {
    let registeredListeners = this.#getRegisteredListeners(eventName);
    registeredListeners.push(fun);
    this.#listeners[eventName] = registeredListeners;
  }

  /*
   * This method emits an event by calling all registered listeners for the given event name.
   * */
  emit(eventName, ...args) {
    let registeredListeners = this.#getRegisteredListeners(eventName);
    if (!registeredListeners) {
      console.log('No event found with name : ', eventName);
      return;
    }
    registeredListeners.forEach((f) => {
      f(...args);
    });
  }

  /*
   * This method registers a listener for the given event name that will be called only once.
   * */
  once(eventName, fun) {
    let registeredListeners = this.#getRegisteredListeners(eventName);

    // This wrapper function calls the original function and then removes itself as a listener.
    const onceWrapper = () => {
      fun();
      this.off(eventName, onceWrapper);
    };
    registeredListeners.push(onceWrapper);
    this.#listeners[eventName] = registeredListeners;
  }

  /*
   * This method returns the number of listeners registered for the given event name.
   * */
  listenersCount(eventName) {
    let registeredListeners = this.#getRegisteredListeners(eventName);
    return registeredListeners.length;
  }

  /*
   * This method returns an array of all listeners registered for the given event name.
   * */
  rawListeners(eventName) {
    let registeredListeners = this.#getRegisteredListeners(eventName);
    return registeredListeners;
  }

  /*
   * This method removes the given listener from the list of listeners for the given event name.
   * */
  off(eventName, fun) {
    let registeredListeners = this.#getRegisteredListeners(eventName);
    if (!registeredListeners) {
      console.log(`No lister is attached to event : `, eventName);
      return;
    }

    // This filters out the given listener function from the list of registered listeners.
    registeredListeners = registeredListeners.filter((func) => func !== fun);
    this.#listeners[eventName] = registeredListeners;
  }
}

module.exports = EventEmitter;
