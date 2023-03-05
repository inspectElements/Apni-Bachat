import React, { useEffect } from "react";

import {
  apniBachatConractAddress,
  credibilityScoreConractAddress,
} from "../../constants";
import ApniBachat from "../../artifacts/contracts/ApniBachat.sol/ApniBachat.json";
import CredibilityScore from "../../artifacts/contracts/CredibilityScore.sol/CredibilityScore.json";
import { arcanaProvider } from "../../index";
import { providers, Contract, utils } from "ethers";
import { Button } from "@mui/material";

const financialData = {
  personalInformation: {
    name: "Eshan Trivedi",
    dateOfBirth: "04/03/1970",
    panNumber: "ESHAN12345",
  },
  loanDeets: {
    loanType: "Personal Loan",
    loanAmount: 10000,
    loanTenure: 9,
    interestRate: 10,
    repaymentStatus: "delayed",
    startDate: 1610000000,
  },
  employmentInformation: {
    employerName: "Mera Employer",
    occupation: "SDE",
    incomePerYear: 10000,
  },
};

const CreditInstitute = () => {
  const provider = new providers.Web3Provider(arcanaProvider.provider);
  // get the end user
  const signer = provider.getSigner();
  // get the smart contract
  const credibilityScoreContract = new Contract(
    credibilityScoreConractAddress,
    CredibilityScore.abi,
    signer
  );

  const apniBachatContract = new Contract(
    apniBachatConractAddress,
    ApniBachat.abi,
    signer
  );

  const enrollUser = async () => {
    await apniBachatContract.enroll(
      financialData.personalInformation,
      financialData.personalInformation.panNumber,
      financialData.employmentInformation
    );
  };

  const calculateCreditScore = async () => {
    const cred1 = await credibilityScoreContract.calculateCreditScore(
      financialData.personalInformation.panNumber
    );
    // convert cred from hex to decimal
    console.log(utils.formatUnits(cred1, 0));

    console.log(cred1);
  };

  const addLoanRepaymentHistory = async () => {
    await apniBachatContract.addLoanRepaymentHistory(
      financialData.personalInformation.panNumber,
      financialData.loanDeets
    );
  };

  return (
    <>
      <Button variant="contained" onClick={enrollUser}>
        enroll user
      </Button>
      <Button variant="contained" onClick={calculateCreditScore}>
        calculate score
      </Button>
      <Button variant="contained" onClick={addLoanRepaymentHistory}>
        addLoanRepaymentHistory
      </Button>
    </>
  );
};

export default CreditInstitute;
