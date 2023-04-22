const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const rewriteContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const oneContact = contacts.find((item) => item.id === contactId);
  return oneContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => item.id === contactId);
  if (indexContact === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(indexContact, 1);

  await rewriteContacts(contacts);
  return removeContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await rewriteContacts(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
