/**
 * @class Stat
 * @constructor
 */
function Stat() {
    this.counter = 0;
    this.enabled  = false;
}

/**
 * @method enable
 */
Stat.prototype.enable = function () {
    this.enabled = true;
};

/**
 * @method disable
 */
Stat.prototype.disable = function () {
    this.enabled = false;
};

/**
 * @method isEnable
 * @return {boolean} enabled attribute value.
 */
Stat.prototype.isEnable = function () {
    return this.enabled;
};

/**
 * @method inc
 * @param {int} amount Amount to increase the counter. By default is 1.
 * @return {int} New counter value.
 */
Stat.prototype.inc = function (amount) {
    this.counter += typeof amount !== 'undefined' ? amount : 1;
    return this.counter;
};

/**
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
 * @method get_counter
 * @return {int} Counter value.
 */
Stat.prototype.get_counter = function () {
    return this.counter;
};

