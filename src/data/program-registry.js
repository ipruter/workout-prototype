import { WEEKLY_SEQUENCE as DEFAULT_SEQ } from "./weekly-sequence.js";
import { WEEKLY_SEQUENCE as FULL_COVERAGE_SEQ } from "./weekly-sequence.full-coverage.js";
import { WEEKLY_SEQUENCE as V_TAPER_MALE_SEQ } from "./weekly-sequence.v-taper-male.js";
import { WEEKLY_SEQUENCE as HOURGLASS_FEMALE_SEQ } from "./weekly-sequence.hourglass-female.js";

export const PROGRAMS = {
  default:          { label: "My Default",       list: DEFAULT_SEQ },
  full_coverage:    { label: "Full Coverage",    list: FULL_COVERAGE_SEQ },
  v_taper_male:     { label: "Male V-Taper",     list: V_TAPER_MALE_SEQ },
  hourglass_female: { label: "Female Hourglass", list: HOURGLASS_FEMALE_SEQ },
};

export const PROGRAM_KEYS = Object.keys(PROGRAMS);
