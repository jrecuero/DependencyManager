/**
 * @class DM_Callback
 * @constructor
 */
function DM_Callback() {
    /**
     * @property created
     * @type {Function}
     */
    this.created   = null;

    /**
     * @property partial
     * @type {Function}
     */
    this.partial   = null;

    /**
     * @property active
     * @type {Function}
     */
    this.active    = null;

    /**
     * @property inactive
     * @type {Function}
     */
    this.inactive  = null;

    /**
     * @property deleted
     * @type {Function}
     */
    this.deleted   = null;

    /**
     * @property destroyed
     * @type {Function}
     */
    this.destroyed = null;
}

/**
 * @method create
 * @param {Function} create_cb
 * @param {Function} partial_cb
 * @param {Function} active_cb
 * @param {Function} inactive_cb
 * @param {Function} delete_cb
 * @param {Function} destroy_cb
 * @return {Boolean}
 */
DM_Callback.prototype.create = function (create_cb, partial_cb, active_cb, inactive_cb, delete_cb, destroy_cb) {
    this.created   = create_cb;
    this.partial   = partial_cb;
    this.active    = active_cb;
    this.inactive  = inactive_cb;
    this.deleted   = delete_cb;
    this.destroyed = destroy_cb;
    return this;
}

