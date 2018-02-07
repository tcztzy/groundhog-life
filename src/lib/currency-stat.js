import { Stat } from './stat';
import { dailyWorkIncomeStat } from './daily-work-income-stat';
import { foodCostsPerDayStat } from "./food";
import { StatEffectiveAddModifier, StatEffectiveMultModifier } from "./modifiers";

let dailyExpensesStat = new Stat('dailyExpensesStat', 'Expenses', 0, 2, '$', '', !1);
let u = new StatEffectiveAddModifier(dailyExpensesStat.id + '_foodCostsPerDayMod', 'Food', 1, foodCostsPerDayStat);
dailyExpensesStat.addModifier(u);
dailyExpensesStat.update();

let dailyIncomeStat = new Stat('dailyIncomeStat', 'Income/day', 0, 2, '$');
let c = new StatEffectiveAddModifier(dailyIncomeStat.id + '_workIncomePerDayMod', 'Work', 1, dailyWorkIncomeStat);
dailyIncomeStat.addModifier(c);
dailyIncomeStat.update();

let dailyNetIncomeStat = new Stat('dailyNetIncome', 'Net Income/day', 0, 2, '$', '');
let f = new StatEffectiveAddModifier(dailyNetIncomeStat.id + '_incomePerDayMod', 'Income', 1, dailyIncomeStat);
let v = new StatEffectiveAddModifier(dailyNetIncomeStat.id + '_expensesPerDayMod', 'Expenses', 2, dailyExpensesStat, function (module) {
    return -module;
});
dailyNetIncomeStat.addModifier(f);
dailyNetIncomeStat.addModifier(v);
dailyNetIncomeStat.update();

let expenseRatioStat = new Stat('expenseRatioStat', 'Expense Ratio', 1, 2);
let p = new StatEffectiveMultModifier(expenseRatioStat.id + '_incomePerDayMod', 'Income', 1, dailyIncomeStat, function (module) {
    return 1 / (module + 1);
});
let m = new StatEffectiveMultModifier(expenseRatioStat.id + '_expensesPerDayMod', 'Expenses', 2, dailyExpensesStat);
expenseRatioStat.addModifier(p);
expenseRatioStat.addModifier(m);
expenseRatioStat.update();

let investmentReturnStat = new Stat('investmentReturnStat', 'Investment Annual Returns', 0, 3, '', '%');

export { dailyExpensesStat, dailyIncomeStat, dailyNetIncomeStat, expenseRatioStat, investmentReturnStat };
