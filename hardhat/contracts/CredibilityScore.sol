// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract CredibilityScore {
    struct PersonalInformation {
        string name;
        string dateOfBirth;
        string panNumber;
    }

    struct EmploymentInformation {
        string employerName;
        string occupation;
        uint256 incomePerYear;
    }

    struct LoanRepaymentHistory {
        string loanType;
        uint256 loanAmount;
        uint256 loanTenure;
        string repaymentStatus;
    }

    struct CreditCardHistory {
        string cardIssuer;
        uint256 cardLimit;
        uint256 spending;
        string repaymentStatus;
    }

    struct CreditHistory {
        LoanRepaymentHistory[] loanRepaymentHistory;
    }

    struct FinancialData {
        PersonalInformation personalInformation;
        EmploymentInformation[] employmentInformation;
        CreditHistory creditHistory;
    }

    // keep track of owner
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can access this function."
        );
        _;
    }

    // authorization
    address[] public authorized;

    modifier onlyAuthorized() {
        require(isAuthorized(), "Caller is not an auhorized");
        _;
    }

    function isAuthorized() internal view returns (bool) {
        for (uint i = 0; i < authorized.length; i++) {
            if (authorized[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function addAuthorized(address _authorized) public onlyOwner {
        authorized.push(_authorized);
    }


    // remaining contract
    mapping(string => FinancialData) private financialDataMap;

    function addPersonalInformation(
        string memory panNumber,
        PersonalInformation memory personalInformation
    ) public {
        FinancialData storage financialData = financialDataMap[panNumber];
        financialData.personalInformation = personalInformation;
    }


    function getFinancialData(
        string memory panNumber
    )
        public
        view
        returns (
            PersonalInformation memory,
            EmploymentInformation[] memory,
            CreditHistory memory
        )
    {
        FinancialData memory financialData = financialDataMap[panNumber];
        return (
            financialData.personalInformation,
            financialData.employmentInformation,
            financialData.creditHistory
        );
    }

}