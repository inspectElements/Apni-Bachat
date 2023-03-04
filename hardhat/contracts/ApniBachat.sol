// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

struct Loan {
    string loanType;
    uint256 loanAmount;
    uint256 loanTenure;
    uint256 interestRate;
    string repaymentStatus;
}

struct EmploymentInformation {
    string employerName;
    string occupation;
    uint256 incomePerYear;
}

struct PersonalInformation {
    string name;
    string dateOfBirth;
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
    CredibilityScore credibilityScoreContract;

    constructor(address contractAddress) {
        credibilityScoreContract = CredibilityScore(contractAddress);
    }

    function getBalance(
        string memory panNumber
    ) public view onlyEnrolled(panNumber) returns (uint256) {
        return balance[panNumber];
    }

    function enroll(
        PersonalInformation memory personalInformation,
        string memory panNumber,
        EmploymentInformation memory employmentInformation
    ) public {
        enrolled[panNumber] = true;
        users[panNumber] = personalInformation;

        credibilityScoreContract.addPersonalInformation(panNumber, personalInformation);
        credibilityScoreContract.addEmploymentInformation(panNumber, employmentInformation);
    }

    modifier onlyEnrolled(string memory panNumber) {
        require(enrolled[panNumber], "User not enrolled");
        _;
    }

}
