// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

struct Loan {
    string loanType;
    uint256 loanAmount;
    uint256 loanTenure;
    uint256 interestRate;
    string repaymentStatus;
    uint256 startDate;
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
    // fixed deposit struct
    struct FixedDeposit {
        uint256 amount;
        uint256 interest;
        uint256 maturityAmount;
        uint256 maturityDate;
        bool isWithdrawn;
    }

    // fixed deposits mapping
    mapping(string => FixedDeposit) public fixedDeposits;


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

        credibilityScoreContract.addPersonalInformation(
            panNumber,
            personalInformation
        );
        credibilityScoreContract.addEmploymentInformation(
            panNumber,
            employmentInformation
        );
    }

    modifier onlyEnrolled(string memory panNumber) {
        require(enrolled[panNumber], "User not enrolled");
        _;
    }

    function deposit(
        string memory panNumber
    ) public payable onlyEnrolled(panNumber) {
        balance[panNumber] += msg.value;
        totalBalance += msg.value;
    }

    function withdraw(
        uint256 amount,
        string memory panNumber
    ) public onlyEnrolled(panNumber) {
        require(balance[panNumber] >= amount, "Insufficient Balance");
        balance[panNumber] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function requestLoan(
        string memory panNumber,
        Loan memory loanDeets
    ) public onlyEnrolled(panNumber) {
        balance[panNumber] += loanDeets.loanAmount;
        loans[panNumber] = loanDeets;
    }

    function approveLoan(
        string memory panNumber
    ) public view onlyEnrolled(panNumber) returns (string memory) {
        string memory result = "";

        if (
            minCreditScore >
            credibilityScoreContract.calculateCreditScore(panNumber)
        ) {
            result = "credit criteria not satified";
        } else {
            result = "approved";
        }

        return result;
    }

    function makeLoanPayment(
        string memory panNumber,
        uint256 amount
    ) public onlyEnrolled(panNumber) {
        require(balance[panNumber] >= amount, "You dont have that much money");
        require(amount > 0, "Payment should be positive");

        uint256 amountWithInterest = loans[panNumber].loanAmount +
            (loans[panNumber].loanAmount * loans[panNumber].interestRate) /
            100;

        if (amount >= amountWithInterest) {
            amount = amountWithInterest;
            loans[panNumber].loanAmount = 0;

            // Loan memory loanRepaymentHistory = loans[panNumber];

            // if (
            //     block.timestamp >
            //     loans[panNumber].startDate +
            //         (loans[panNumber].loanTenure * 30 days)
            // ) {
            //     loanRepaymentHistory.repaymentStatus = "delayed";
            // } else {
            //     loanRepaymentHistory.repaymentStatus = "on_time";
            // }

            // credibilityScoreContract.addLoanRepaymentHistory(
            //     panNumber,
            //     loanRepaymentHistory
            // );
        } else {
            loans[panNumber].loanAmount -= amount;
        }
        balance[panNumber] -= amount;
    }

    // function that adds loan repayment history to the contract
    function addLoanRepaymentHistory(
        string memory panNumber,
        Loan memory loanRepaymentHistory
    ) public {
        credibilityScoreContract.addLoanRepaymentHistory(
            panNumber,
            loanRepaymentHistory
        );
    }

    // funtion to start fixed deposit
    function startFixedDeposit(
        string memory panNumber,
        uint256 amount,
        uint256 tenure,
        uint256 interestPercent
    ) public onlyEnrolled(panNumber) {
        require(balance[panNumber] >= amount, "Insufficient Balance");
        require(amount > 0, "Amount should be positive");
        require(tenure > 0, "Tenure should be positive");

        balance[panNumber] -= amount;
        totalBalance -= amount;

        uint256 interest = (amount * interestPercent * tenure) / 100;
        uint256 maturityAmount = amount + interest;

        uint256 maturityDate = block.timestamp + (tenure * 30 days);

        FixedDeposit memory fd = FixedDeposit(
            amount,
            interest,
            maturityAmount,
            maturityDate,
            false
        );

        fixedDeposits[panNumber] = fd;
    }
}
