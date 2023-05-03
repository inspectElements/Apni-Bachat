const { expect } = require("chai");
const { ethers } = require("hardhat");

let financialData = {
  personalInformation: {
    name: "Hussain Pettiwala",
    dateOfBirth: "04/03/2001",
    panNumber: "1234",
  },
  employmentInformation: [
    {
      employerName: "Mera Employer",
      occupation: "SDE",
      incomePerYear: 100000,
    },
  ],
  creditHistory: {
    loanRepaymentHistory: [
      {
        loanType: "Personal Loan",
        loanAmount: 200000,
        loanTenure: 36,
        interestRate: 10,
        repaymentStatus: "on_time",
        startDate: 1610000000,
      },
    ],
  },
};

describe("CredibilityScore", function () {
  let credibilityScore, pan;
  let owner, authorized, unauthorized;

  before(async function () {
    // use ethers to get our contract
    const CredibilityScore = await ethers.getContractFactory(
      "contracts/CredibilityScore.sol:CredibilityScore"
    );
    // and deploy it
    credibilityScore = await CredibilityScore.deploy();
    await credibilityScore.deployed();

    pan = "1234";

    const [_owner, _authorized, _unauthorized] = await ethers.getSigners();
    owner = _owner;
    authorized = _authorized;
    unauthorized = _unauthorized;

    // verify address
    await credibilityScore.connect(_owner).addAuthorized(authorized.address);
  });

  it("should add personal information", async () => {
    const personalInformationJson = financialData.personalInformation;

    // Add personal information
    await credibilityScore
      .connect(authorized)
      .addPersonalInformation(pan, personalInformationJson);

    // Retrieve the personal information from the contract
    const financialDataFromContract = await credibilityScore
      .connect(authorized)
      .getFinancialData(pan);

    // Verify that the information is correct
    expect(financialDataFromContract[0][0]).to.equal(
      personalInformationJson.name
    );
    expect(financialDataFromContract[0][1]).to.equal(
      personalInformationJson.dateOfBirth
    );
    expect(financialDataFromContract[0][2]).to.equal(
      personalInformationJson.panNumber
    );
  });

  it("should add employment information", async () => {
    const employmentInformationJson = financialData.employmentInformation[0];

    // Add employment information
    await credibilityScore
      .connect(authorized)
      .addEmploymentInformation(pan, employmentInformationJson);

    // Retrieve the employment information from the contract
    const financialDataFromContract = await credibilityScore
      .connect(authorized)
      .getFinancialData(pan);

    // Verify that the information is correct
    expect(financialDataFromContract[1][0][0]).to.equal(
      employmentInformationJson.employerName
    );
    expect(financialDataFromContract[1][0][1]).to.equal(
      employmentInformationJson.occupation
    );
    expect(financialDataFromContract[1][0][2]).to.equal(
      employmentInformationJson.incomePerYear
    );
    expect(financialDataFromContract[1][0][3]).to.equal(
      employmentInformationJson.startTime
    );
    expect(financialDataFromContract[1][0][4]).to.equal(
      employmentInformationJson.endTime
    );
  });

  it("should add loan repayment history", async () => {
    const loanRepaymentHistoryJson =
      financialData.creditHistory.loanRepaymentHistory[0];

    // Add loan repayment information
    await credibilityScore
      .connect(authorized)
      .addLoanRepaymentHistory(pan, loanRepaymentHistoryJson);

    // Retrieve the loan repayment information from the contract
    const financialDataFromContract = await credibilityScore
      .connect(authorized)
      .getFinancialData(pan);

    const loanRepaymentHistoryFromContract = financialDataFromContract[2][0][0];

    // Verify that the information is correct
    expect(loanRepaymentHistoryFromContract[0]).to.equal(
      loanRepaymentHistoryJson.loanType
    );
    expect(loanRepaymentHistoryFromContract[1]).to.equal(
      loanRepaymentHistoryJson.loanAmount
    );
    expect(loanRepaymentHistoryFromContract[2]).to.equal(
      loanRepaymentHistoryJson.loanTenure
    );
    expect(loanRepaymentHistoryFromContract[3]).to.equal(
      loanRepaymentHistoryJson.interestRate
    );
    expect(loanRepaymentHistoryFromContract[4]).to.equal(
      loanRepaymentHistoryJson.repaymentStatus
    );
  });

  it("should calculate credit score", async () => {
    const creditScore = await credibilityScore
      .connect(authorized)
      .calculateCreditScore(pan);

    // console.log(creditScore);
  });
});
