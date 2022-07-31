// Form
const InitialDeposit = document.getElementById("InitialDeposit");
const MaxProfitRate = document.getElementById("MaxProfitRate");
const MinProfitRate = document.getElementById("MinProfitRate");
const InvestmentPeriod = document.getElementById("InvestmentPeriod");
const YearlyDeposit = document.getElementById("YearlyDeposit");
const NumInvestments = document.getElementById("NumInvestments");
const TotalYears = document.getElementById("TotalYears");

// Table vars
var MaxProfit = 0;
var MinProft = 0;
var MaxTotal = 0;
var MinTotal = 0;
var ProfitDifference = 0;
var MonthlyProfit = 0;
var YearlyProfit = 0;
var TotalInvestment = 0;
var TotalGrowth = 0;
var InvestmentGrowth = 0;
var PercentageProfit = 0

const btnCalc = document.getElementById("calc");

const tblMain = document.getElementById("MainTableBody");
const tblBreakdown = document.getElementById("breakdown");
const tblBrakdownBody = document.getElementById("breakdownBody");

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ZAR',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

// Init
InitForm();

// Create
function Calc() {

    Reset();

    let p = parseFloat(InitialDeposit.value);
    let rMax = parseFloat(MaxProfitRate.value);
    let rMin = parseFloat(MinProfitRate.value);
    let t = parseInt(InvestmentPeriod.value);
    let numT = parseInt(NumInvestments.value);
    let deposit = parseFloat(YearlyDeposit.value);

    let years = t * numT;
    TotalYears.value = InvestmentPeriod.value * NumInvestments.value;

    TotalInvestment = p;
    MaxTotal = p;
    MinTotal = p;

    for (let i = 0; i < years; i++) {

        if(i !== 0)
        {
            //Add the deposit
            TotalInvestment += deposit;
            MaxTotal += deposit;
            //MinTotal += deposit;
        }

        // Calc yearly profit
        MaxTotal +=  (MaxTotal / 100) * rMax;
    }

    MaxProfit = MaxTotal - TotalInvestment;
    TotalGrowth = Math.round((MaxTotal/p)*100);
    InvestmentGrowth = Math.round((MaxProfit/TotalInvestment)*100);
    PercentageProfit =  Math.round((MaxProfit/MaxTotal)*100);

    YearlyProfit = ((MinTotal / 100) * rMin);
    MinTotal += (((MinTotal / 100) * rMin) * years);

    ProfitDifference = MaxTotal - MinTotal;
    MonthlyProfit = YearlyProfit/12;
    
    ClearTable(tblMain);

    tblMain.innerHTML += `
    <tr>
        <td>Future Value (Profit Re-Invested):</td>
        <td>${formatter.format(MaxTotal)}</td>
    </tr>
    <tr>
        <td>Total Invested:</td>
        <td>${formatter.format(TotalInvestment)}</td>
    </tr>
    <tr>
        <td>Total Profit:</td>
        <td>${formatter.format(MaxProfit)}</td>
    </tr>
    <tr>
        <td>Total Growth:</td>
        <td>${TotalGrowth}%</td>
    </tr>
    <tr>
        <td>Investment Growth:</td>
        <td>${InvestmentGrowth}%</td>
    </tr>
    <tr>
        <td>% Profits:</td>
        <td>${PercentageProfit}%</td>
    </tr>

    <tr>
        <td>.</td>
    </tr>

    <tr>
        <td>Total Value (Profit Withdrawn):</td>
        <td>${formatter.format(MinTotal)}</td>
    </tr>
    <tr>
        <td>Future Value (Profit Withdrawn):</td>
        <td>${formatter.format(p)}</td>
    </tr>
    <tr>
        <td>Yearly Profit Share:</td>
        <td>${formatter.format(YearlyProfit)}</td>
    </tr>
    <tr>
        <td>Monthly Profit Share:</td>
        <td>${formatter.format(MonthlyProfit)}</td>
    </tr>

    <tr>
        <td>.</td>
    </tr>
    
    <tr>
        <td>Profit Difference (Max - Min):</td>
        <td>${formatter.format(ProfitDifference)}</td>
    </tr>
    `;
}

function ClearTable(TableBody)
{
	TableBody.innerHTML = "";
}

function InitForm() {

    InitialDeposit.value = 0;
    MaxProfitRate.value = 0;
    MinProfitRate.value = 0;
    InvestmentPeriod.value = 5;
    YearlyDeposit.value = 0;
    NumInvestments.value = 1;
    TotalYears.value = "";
}

function Reset()
{
    MaxProfit = 0;
    MinProft = 0;
    MaxTotal = 0;
    MinTotal = 0;
    ProfitDifference = 0;
    MonthlyProfit = 0;
    YearlyProfit = 0;
    MonthlyProfit = 0;
    YearlyProfit = 0;
    TotalInvestment = 0;
    TotalGrowth = 0;
    InvestmentGrowth = 0;
    PercentageProfit = 0
}
