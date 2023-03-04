// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

struct Loan {
    string loanType;
    uint256 loanAmount;
    uint256 loanTenure;
    string repaymentStatus;
}

struct EmploymentInformation {
    string employerName;
    string occupation;
    uint256 incomePerYear;
    string startTime;
    string endTime;
}

struct PersonalInformation {
    string name;
    string dateOfBirth;
    string gender;
    string panNumber;
}

interface CredibilityScore {
    function addLoanRepaymentHistory(
        string memory panNumber,
        Loan memory loanRepaymentHistory
    ) external;

    function calculateCreditScore(
        string memory pan
    ) external view returns (uint256);

    function addPersonalInformation(
        string memory panNumber,
        PersonalInformation memory personalInformation
    ) external;

    function addEmploymentInformation(
        string memory panNumber,
        EmploymentInformation memory employmentInformation
    ) external;
}

contract ApniBachat {
    mapping(string => PersonalInformation) users;

    mapping(string => uint256) public balance;
    mapping(string => bool) public enrolled;
    mapping(string => Loan) public loans;

    uint256 minCreditScore = 500;
    uint256 maxLoanLimitForNewCustomer = 2000;

    uint256 totalBalance = 0;
    CredibilityScore credibilityScore;

    constructor(address contractAddress) {
        credibilityScore = CredibilityScore(contractAddress);
    }

    modifier onlyEnrolled(string memory panNumber) {
        require(enrolled[panNumber], "User not enrolled");
        _;
    }

    function getBalance(
        string memory panNumber
    ) public view onlyEnrolled(panNumber) returns (uint256) {
        return balance[panNumber];
    }
}