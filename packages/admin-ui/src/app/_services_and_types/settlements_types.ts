/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list (alphabetical ordering) of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Crosslake
 - Pedro Sousa Barreto <pedrob@crosslaketech.com>

 --------------
 ******/

"use strict";

//TODO use settlements-public-lib instead

export interface ISettlementConfig {
	id: string;
    /**
     * Settlement model name, should be unique.
     * @todo rename to modelName
     */
    settlementModel: string;
    /**
     * Batch duration interval in seconds
     * @todo rename to batchCreateIntervalSecs
     */
    batchCreateInterval: number;
    // isAutoClose: boolean;
    // settlementTime: string | null;
    isActive: boolean;
    // remove custom customSettlementField
    //customSettlementField: ICustomSettlementField[] | null;

    // // will put fixed matching field temporary and will replace with flexibility later
    // matchingPayeeFspId: string | null;
    // matchingPayerFspId: string | null;
    // matchingCurrency: string | null;
    // matchingAmount: number | null;
    // // matchingTransactionType: string | null;
    // // matchingExtensionList: [];

    createdBy: string;
    createdDate: number;
    changeLog: ISettlementModelActivityLogEntry[];
}

export declare interface ISettlementModelActivityLogEntry {
    changeType: "CREATE" | "APPROVE" | "ACTIVATE" | "DEACTIVATE" | "UPDATE";
    user: string;
    timestamp: number;
    notes: string | null;
}


export interface ISettlementBatch {
	id: string; // FX.XOF:RWF.2021.08.23.00.00.001
	timestamp: number;
	settlementModel: string;
	currencyCode: string;
	batchName: string; // FX.XOF:RWF.2021.08.23.00.00 (minus seq)
	batchSequence: number; // 1 (seq only)
	state: "OPEN" | "DISPUTED" | "SETTLED" | "CLOSED";

	accounts: ISettlementBatchAccount[];
}

// for use inside a ISettlementBatch
export interface ISettlementBatchAccount {
	accountExtId: string;
	participantId: string;
	currencyCode: string;
	creditBalance: string;
	debitBalance: string;
}

export interface ISettlementBatchTransfer {
	transferId: string;
	transferTimestamp: number;
	payerFspId: string;
	payeeFspId: string;
	currencyCode: string;
	amount: string;
	batchId: string;
	batchName: string;
	journalEntryId: string;
	settled: boolean;
	matrixId: string | null;
}



export interface ISettlementMatrix {
	id: string;
	createdAt: number;
	updatedAt: number;

	// criteria
	dateFrom: number;
	dateTo: number;
	currencyCode: string;
	settlementModel: string;

	batches: ISettlementMatrixBatch[];
	participantBalances: ISettlementMatrixParticipantBalance[];

	state: "IDLE" | "BUSY" | "DISPUTED" | "CLOSED" | "SETTLED";
	type: "STATIC" | "DYNAMIC";

	generationDurationSecs: number | null;
	totalDebitBalance: string;
	totalCreditBalance: string;
}

export interface ISettlementMatrixParticipantBalance {
	participantId: string;
	debitBalance: string;
	creditBalance: string;
}

export interface ISettlementMatrixBatch {
	id: string;
	name: string;

	batchDebitBalance: string;
	batchCreditBalance: string;
	batchTransferCount: number;

	state: "OPEN" | "DISPUTED" | "SETTLED" | "CLOSED";
	//batchWasClosedBeforeExec: boolean;

	// not persisted - only populated on output - for api responses
	batchAccounts?: ISettlementMatrixBatchAccount[];
}

export interface ISettlementMatrixBatchAccount {
	id: string;
	participantId: string;
	accountExtId: string;
	debitBalance: string;
	creditBalance: string;
}

