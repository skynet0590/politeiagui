/*
This lib is designed to handle persisting data for the text editors using session storage
*/
import qs from "query-string";
import { getCurrentMonth, getCurrentYear } from "../helpers";
import { generateBlankLineItem } from "../components/InvoiceDatasheet/helpers";

export const NEW_PROPOSAL_PATH = "/proposals/new";

export const getProposalPath = (location) => {
  const { pathname, search } = location;
  const { draftid } = qs.parse(search);
  const path = draftid ? `${pathname}-${draftid}` : pathname;
  return path;
};

export const PROPOSAL_FORM_NAME = "name";
export const PROPOSAL_FORM_DESC = "description";

export const getProposalBackupKey = (key, path) => `proposal-${key}::${path}`;

const updateProposalFormData = (state) => {
  const proposalFormState = state.form["form/record"];
  const newProposalData = (proposalFormState && proposalFormState.values) || {};
  const name = newProposalData[PROPOSAL_FORM_NAME];
  const description = newProposalData[PROPOSAL_FORM_DESC];
  if (!name && !description) {
    return;
  }

  const path = getProposalPath(window.location);
  sessionStorage.setItem(
    getProposalBackupKey(PROPOSAL_FORM_NAME, path),
    newProposalData[PROPOSAL_FORM_NAME]
  );
  sessionStorage.setItem(
    getProposalBackupKey(PROPOSAL_FORM_DESC, path),
    newProposalData[PROPOSAL_FORM_DESC]
  );
};

export const resetNewProposalData = () => {
  sessionStorage.setItem(
    getProposalBackupKey(PROPOSAL_FORM_NAME, NEW_PROPOSAL_PATH),
    ""
  );
  sessionStorage.setItem(
    getProposalBackupKey(PROPOSAL_FORM_DESC, NEW_PROPOSAL_PATH),
    ""
  );
};

export const getNewProposalData = () => {
  return {
    name:
      sessionStorage.getItem(
        getProposalBackupKey(PROPOSAL_FORM_NAME, NEW_PROPOSAL_PATH)
      ) || "",
    description:
      sessionStorage.getItem(
        getProposalBackupKey(PROPOSAL_FORM_DESC, NEW_PROPOSAL_PATH)
      ) || ""
  };
};

export const handleSaveTextEditorsContent = (state) => {
  updateProposalFormData(state);
};

//CMS
export const NEW_INVOICE_PATH = "/invoices/new";

export const getInvoicePath = (location) => {
  const { pathname, search } = location;
  const { draftid } = qs.parse(search);
  const path = draftid ? `${pathname}-${draftid}` : pathname;
  return path;
};

export const INVOICE_FORM_ADDRESS = "address";
export const INVOICE_FORM_CONTACT = "contact";
export const INVOICE_FORM_LINE_ITEMS = "lineitems";
export const INVOICE_FORM_LOCATION = "location";
export const INVOICE_FORM_MONTH = "month";
export const INVOICE_FORM_YEAR = "year";
export const INVOICE_FORM_NAME = "name";
export const INVOICE_FORM_RATE = "rate";

export const getInvoiceBackupKey = (key, path) => `invoice-${key}::${path}`;

const updateInvoiceFormData = (state) => {
  const invoiceFormState = state.form["form/record"];
  const newInvoiceData = (invoiceFormState && invoiceFormState.values) || {};

  const address = newInvoiceData[INVOICE_FORM_ADDRESS];
  const contact = newInvoiceData[INVOICE_FORM_CONTACT];
  const lineitems = newInvoiceData[INVOICE_FORM_LINE_ITEMS];
  const location = newInvoiceData[INVOICE_FORM_LOCATION];
  const month = newInvoiceData[INVOICE_FORM_MONTH];
  const year = newInvoiceData[INVOICE_FORM_YEAR];
  const name = newInvoiceData[INVOICE_FORM_NAME];
  const rate = newInvoiceData[INVOICE_FORM_RATE];

  if (
    !address &&
    !contact &&
    !lineitems &&
    !location &&
    !month &&
    !year &&
    !name &&
    !rate
  ) {
    return;
  }

  const path = getInvoicePath(window.location);
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_ADDRESS, path),
    newInvoiceData[INVOICE_FORM_ADDRESS]
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_CONTACT, path),
    newInvoiceData[INVOICE_FORM_CONTACT]
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_LINE_ITEMS, path),
    JSON.stringify(newInvoiceData[INVOICE_FORM_LINE_ITEMS])
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_LOCATION, path),
    newInvoiceData[INVOICE_FORM_LOCATION]
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_MONTH, path),
    newInvoiceData[INVOICE_FORM_MONTH]
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_YEAR, path),
    newInvoiceData[INVOICE_FORM_YEAR]
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_NAME, path),
    newInvoiceData[INVOICE_FORM_NAME]
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_RATE, path),
    newInvoiceData[INVOICE_FORM_RATE]
  );
};

export const resetNewInvoiceData = () => {
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_ADDRESS, NEW_INVOICE_PATH),
    ""
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_CONTACT, NEW_INVOICE_PATH),
    ""
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_LINE_ITEMS, NEW_INVOICE_PATH),
    JSON.stringify([generateBlankLineItem()])
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_LOCATION, NEW_INVOICE_PATH),
    ""
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_MONTH, NEW_INVOICE_PATH),
    getCurrentMonth() - 1
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_YEAR, NEW_INVOICE_PATH),
    getCurrentYear()
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_NAME, NEW_INVOICE_PATH),
    ""
  );
  sessionStorage.setItem(
    getInvoiceBackupKey(INVOICE_FORM_RATE, NEW_INVOICE_PATH),
    ""
  );
};

export const getNewInvoiceData = () => {
  return {
    address:
      sessionStorage.getItem(
        getInvoiceBackupKey(INVOICE_FORM_ADDRESS, NEW_INVOICE_PATH)
      ) || "",
    contact:
      sessionStorage.getItem(
        getInvoiceBackupKey(INVOICE_FORM_CONTACT, NEW_INVOICE_PATH)
      ) || "",
    lineitems: JSON.parse(
      sessionStorage.getItem(
        getInvoiceBackupKey(INVOICE_FORM_LINE_ITEMS, NEW_INVOICE_PATH)
      )
    ) || [generateBlankLineItem()],
    location:
      sessionStorage.getItem(
        getInvoiceBackupKey(INVOICE_FORM_LOCATION, NEW_INVOICE_PATH)
      ) || "",
    month:
      sessionStorage.getItem(
        getInvoiceBackupKey(INVOICE_FORM_MONTH, NEW_INVOICE_PATH)
      ) || getCurrentMonth() - 1,
    year:
      sessionStorage.getItem(
        getInvoiceBackupKey(INVOICE_FORM_YEAR, NEW_INVOICE_PATH)
      ) || getCurrentYear(),
    name:
      sessionStorage.getItem(
        getInvoiceBackupKey(INVOICE_FORM_NAME, NEW_INVOICE_PATH)
      ) || "",
    rate:
      sessionStorage.getItem(
        getInvoiceBackupKey(INVOICE_FORM_RATE, NEW_INVOICE_PATH)
      ) || ""
  };
};

export const handleSaveCSVEditorsContent = (state) => {
  updateInvoiceFormData(state);
};
