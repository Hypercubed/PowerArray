/*
 * PowerArray
 * 5x faster array performance with built-in binarySearch
 * @author joe minichino <joe.minichino@gmail.com>
 * License: BSD
 */
(function () {
  'use strict';

  var root = this;

  /**
   * PowerArray
   * @constructor
   * @param {array} optional plain array to populate a power array
   */
  function PowerArray(array) {
    var load = (arguments.length > 0) ? array.slice(0) : [];
    load.__proto__ = PowerArray.prototype;
    return load;
  }

  /*
   * inheritance
   */
  PowerArray.prototype = [];

  /**
   * addAndSort inserts a value and sorts the array after insertion to keep binary search working
   * @param {number} val
   */
  PowerArray.prototype.addAndSort = function (val) {
    this.push(val);
    this.numericSort();
  };

  /**
   * forEach: improved version of the Array.prototype.forEach method, utilises for loop
   *
   * @param {function} processing function
   */
  PowerArray.prototype.forEach = function (fun) {
    var i = 0,
      len = this.length;
    for (; i < len; i++) {
      fun(this[i], i);
    }
  };

  PowerArray.prototype.concat = function (arr) {
    var result = Array.prototype.concat.call(this, arr);
    result.__proto__ = PowerArray.prototype;
    return result;
  };

  /**
   * map: improved version of map
   * re-utilizing PowerArray.forEach did not make performance differences, so for-loop was used to maintain the 5x factor
   *
   * @param {function} mapping function
   * @returns {array} mapped array
   */
  PowerArray.prototype.map = function (fun) {
    var results = new PowerArray(),
      len = this.length,
      i;
    for (i = 0; i < len; i += 1) {
      results.push(fun(this[i], i));
    }
    return results;
  };

  /**
   * filter: improved version of map
   *
   * @param {function} filter function
   * @returns {array} filtered array
   */
  PowerArray.prototype.filter = function (filterFun) {
    var results = new PowerArray(),
      len = this.length,
      i;
    for (i = 0; i < len; i += 1) {
      if (filterFun(this[i], i)) {
        results.push(this[i]);
      }
    }
    return results;
  };

  /**
   * contains: returns whether the array contains an element or not
   *
   * @param element
   * @returns {boolean} is the element contained or not
   */
  PowerArray.prototype.contains = function (elem) {
    var i = 0,
      len = this.length,
      found = false;
    for (i; i < len; i += 1) {
      if (this[i] === elem) {
        found = true;
        break;
      }
    }
    return found;
  };

  /**
   * numericSort: sorts the array if the array is numerical
   *
   */
  PowerArray.prototype.numericSort = function (fun) {
    this.sort(fun || function (a, b) {
      return a < b ? -1 : 1;
    });
  };

  /**
   * binarySearch performs a binary search on the sorted array
   *
   * @param {number} element to be found
   * @returns {number} index of element
   */
  PowerArray.prototype.binarySearch = function (searchElement) {

    var minIndex = 0;
    var maxIndex = this.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = this[currentIndex];

      if (currentElement < searchElement) {
        minIndex = currentIndex + 1;
      } else if (currentElement > searchElement) {
        maxIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }

    return -1;
  };

  /**
   * slice: re-implementation of native which returns a PowerArray
   *
   * @param {number} begin
   * @param {number} [optional] end
   * @returns {object} a PowerArray
   */
  PowerArray.prototype.slice = function () {
    var args = Array.prototype.slice.call(arguments),
      results = Array.prototype.slice.apply(this, args);
    results.__proto__ = PowerArray.prototype;
    return results;
  };

  /**
   * splice: re-implementation of native which returns a PowerArray
   *
   * @param {number} begin
   * @param {number} end
   * @param {object} varargs, elements to add
   * @returns {object} a PowerArray
   */
  PowerArray.prototype.splice = function () {
    var args = Array.prototype.slice.call(arguments),
      results = Array.prototype.splice.apply(this, args);
    results.__proto__ = PowerArray.prototype;
    return results;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = PowerArray;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function () {
        return PowerArray;
      });
    } else {
      root.PowerArray = PowerArray;
    }
  }

}).call(this);
