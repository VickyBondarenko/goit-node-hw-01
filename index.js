const contactService = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const oneContact = await contactService.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contactService.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contactService.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);
