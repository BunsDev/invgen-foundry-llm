"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duration = void 0;
const seconds = (val) => val;
const minutes = (val) => val * seconds(60);
const hours = (val) => val * minutes(60);
const days = (val) => val * hours(24);
const weeks = (val) => val * days(7);
const years = (val) => val * days(365);
exports.duration = { seconds, minutes, hours, days, weeks, years };
//# sourceMappingURL=Time.js.map