const { ethers } = require("hardhat");
const { expect } = require("chai");

const financialData = {
  personalInformation: {
    name: "Hussain",
    dateOfBirth: "04/03/2001",
    panNumber: "HussainPan0",
  },
  loanDeets: {
    loanType: "Home Loan",
    loanAmount: ethers.utils.parseEther("200"),
    loanTenure: 60,
    interestRate: 10,
    repaymentStatus: "on_time",
  },
  employmentInformation: {
    employerName: "Mera Employer",
    occupation: "SDE",
    incomePerYear: 100000,
  },
};

describe("ApniBachat", () => {
  let apniBachat, credibilityScore;
  let owner, account1, account2;

  before(async function () {
    const CredibilityScore = await ethers.getContractFactory(
      "contracts/CredibilityScore.sol:CredibilityScore"
    );
    // and deploy it
    credibilityScore = await CredibilityScore.deploy();
    await credibilityScore.deployed();

    const ApniBachat = await ethers.getContractFactory(
      "contracts/ApniBachat.sol:ApniBachat"
    );
    console.log(credibilityScore.address);
    apniBachat = await ApniBachat.deploy(credibilityScore.address);
    await apniBachat.deployed();

    const [_owner, _account1, _account2, account3] = await ethers.getSigners();
    owner = _owner;
    account1 = _account1;
    account2 = _account2;

    await credibilityScore.connect(_owner).addAuthorized(apniBachat.address);
    await credibilityScore.connect(_owner).addAuthorized(account3.address);
  });

  it("Enroll user", async () => {
    await apniBachat
      .connect(account1)
      .enroll(
        financialData.personalInformation,
        financialData.personalInformation.panNumber,
        financialData.employmentInformation
      );

    const cred = await credibilityScore
      .connect(account1)
      .calculateCreditScore(financialData.personalInformation.panNumber);
    console.log(cred);
  });

  it("Deposit", async () => {
    await apniBachat
      .connect(account1)
      .deposit(financialData.personalInformation.panNumber, {
        value: ethers.utils.parseEther("1000"),
      });
  });

  it("Get balance", async () => {
    await apniBachat
      .connect(account1)
      .getBalance(financialData.personalInformation.panNumber);
  });

  it("Withdraw", async () => {
    await apniBachat
      .connect(account1)
      .withdraw(
        ethers.utils.parseEther("10"),
        financialData.personalInformation.panNumber
      );
  });

  it("Request Loan", async () => {
    await apniBachat
      .connect(account1)
      .requestLoan(
        financialData.personalInformation.panNumber,
        financialData.loanDeets
      );
  });

  it("Approve Loan", async () => {
    const approvalString = await apniBachat
      .connect(account1)
      .approveLoan(financialData.personalInformation.panNumber);

    expect(approvalString).to.equal("approved");
  });

  it("Make Loan Payment", async () => {
    await apniBachat
      .connect(account1)
      .makeLoanPayment(
        financialData.personalInformation.panNumber,
        ethers.utils.parseEther("150")
      );
  });
});
