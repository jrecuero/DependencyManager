/**
 * Atomic stat class.
 *
 * @class Stat
 * @constructor
 */
function Stat() {
    /**
     * It stores stat counter value.
     *
     * @property counter
     * @type Int
     */
    this.counter = 0;

    /**
     * It stores stat status.
     *
     * @property emable
     * @type Boolean
     */
    this.enabled = false;
}

/**
 * Enable the stat to be working.
 *
 * @method enable
 */
Stat.prototype.enable = function () {
    this.enabled = true;
};

/**
 * Disable the stat to be working.
 *
 * @method disable
 */
Stat.prototype.disable = function () {
    this.enabled = false;
};

/**
 * Check if the stat is enabled or not.
 *
 * @method isEnable
 * @return {boolean} enabled attribute value.
 */
Stat.prototype.isEnable = function () {
    return this.enabled;
};

/**
 * Increase the stat coutner a given amount.
 *
 * @method inc
 * @param {int} amount Amount to increase the counter. By default is 1.
 * @return {int} New counter value.
 */
Stat.prototype.inc = function (amount) {
    this.counter += typeof amount !== 'undefined' ? amount : 1;
    return this.counter;
};

/**
 * Decrease the stat counter a given amount.
 *
 * @method dec
 * @param {int} amount Amount to decrease the coutner. By default is 1.
 * @return {int} New counter value.
 */
Stat.prototype.dec = function (amount) {
    this.counter -= typeof amount !== 'undefined' ? amount : 1;
    if (this.counter < 0) {
        this.counter = 0;
    }
    return this.counter;
};

/**
 * Get the stat counter value.
 *
 * @method get_counter
 * @return {int} Counter value.
 */
Stat.prototype.get_counter = function () {
    return this.counter;
};

