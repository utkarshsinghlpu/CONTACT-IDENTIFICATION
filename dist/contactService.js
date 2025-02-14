"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyContact = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const identifyContact = async ({ phoneNumber, email }) => {
    const existingContacts = await prisma.contact.findMany({
        where: {
            OR: [{ phoneNumber: phoneNumber || undefined }, { email: email || undefined }],
        },
    });
    let primaryContact;
    let secondaryContacts = [];
    if (existingContacts.length === 0) {
        primaryContact = await prisma.contact.create({
            data: { phoneNumber, email, linkPrecedence: "primary" },
        });
    }
    else {
        const primaryContacts = existingContacts.filter(c => c.linkPrecedence === "primary");
        if (primaryContacts.length === 1) {
            primaryContact = primaryContacts[0];
        }
        else {
            primaryContact = primaryContacts.reduce((earlier, current) => earlier.createdAt < current.createdAt ? earlier : current);
            await prisma.contact.updateMany({
                where: { id: { in: primaryContacts.map(c => c.id).filter(id => id !== primaryContact.id) } },
                data: { linkedId: primaryContact.id, linkPrecedence: "secondary" },
            });
        }
        const isNewSecondary = !existingContacts.some(c => c.email === email && c.phoneNumber === phoneNumber);
        if (isNewSecondary) {
            await prisma.contact.create({
                data: {
                    phoneNumber,
                    email,
                    linkedId: primaryContact.id,
                    linkPrecedence: "secondary",
                },
            });
        }
        secondaryContacts = await prisma.contact.findMany({ where: { linkedId: primaryContact.id } });
    }
    const emails = Array.from(new Set([primaryContact.email, ...secondaryContacts.map(c => c.email)].filter(Boolean)));
    const phoneNumbers = Array.from(new Set([primaryContact.phoneNumber, ...secondaryContacts.map(c => c.phoneNumber)].filter(Boolean)));
    const secondaryContactIds = secondaryContacts.map(c => c.id);
    return {
        contact: {
            primaryContactId: primaryContact.id,
            emails,
            phoneNumbers,
            secondaryContactIds,
        },
    };
};
exports.identifyContact = identifyContact;
