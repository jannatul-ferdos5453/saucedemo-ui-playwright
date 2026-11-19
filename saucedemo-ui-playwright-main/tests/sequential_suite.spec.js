const { test } = require('@playwright/test');

test.describe.serial('Sequential Execution Suite: Q1 -> Q2 -> Q3', () => {
  require('./q1_locked_user.spec');
  require('./q2_standard_user.spec');
  require('./q3_performance_glitch.spec');
});