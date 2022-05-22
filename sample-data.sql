-- `vendor` table
-- passwords are '<username>123'. Ex: 'nimantha123'
INSERT INTO `vendor` VALUES ('nimantha', '$2b$10$nCkyBmnqmeTRDGpnY3LBI.Hh5PFp48EUy9cCpM7PEaTu4Qq1vm4Q6');
INSERT INTO `vendor` VALUES ('supun', '$2b$10$dNlVVW056oxBUbM7g8/qkO15UDFeRu5hZoFv31KkA3dx5eRiRl4oq');
INSERT INTO `vendor` VALUES ('achira', '$2b$10$DoR35CitVDURZ0izo1bh4er479UFd0G8OxWGj0qEouQBzT9Hl2gce');
INSERT INTO `vendor` VALUES ('poorna', '$2b$10$FJafYi7ZPaEf.IE9lw2vUOWoEpUXkvRuvTVpuWOlVliW/y19T2ys2');
INSERT INTO `vendor` VALUES ('ransika', '$2b$10$h1B2n7c58dqJg8DAA60o/eOWutfpPHHlYnMfBPEKVgRl7w5ovIR3a');

-- `item` talbe
INSERT INTO `item` VALUES (
    'bf2d2630-a453-4315-849d-b8badc63b6a7',
    'Item 01',
    'This is item 01. This is a sample description. This has these features.',
    '2000',
    NULL
    );
INSERT INTO `item` VALUES (
    '66e9aa26-7610-4ed8-a67b-0e816ebfc03c',
    'Item 02',
    'This is item 02. This is a sample description. This has these features.',
    '450.70',
    NULL
    );

INSERT INTO `item` VALUES (
    'e3b8e679-ef21-4ece-9d7b-b8fb749a253f',
    'Item 03',
    'This is item 03. This is a sample description. This has these features.',
    '3500.50',
    NULL
    );
INSERT INTO `item` VALUES (
    '076c6864-b574-4915-8d69-ec7e8e07a4cc',
    'Item 04',
    'This is item 04. This is a sample description. This has these features.',
    '250.70',
    NULL
    );
INSERT INTO `item` VALUES (
    '56bd110a-d93b-421e-a0d7-ef45f9a260eb',
    'Item 05',
    'This is item 05. This is a sample description. This has these features.',
    '8050.25',
    NULL
    );

-- `order` table
INSERT INTO `order` VALUES (
    '411653f5-2320-4f2d-a78a-09dc45f7d0e2',
    'Charith Fonseka',
    '150, Duplication Rd, Colombo',
    '0775848586',
    'charith@no.com',
    NOW(),
    'PAID'
);
INSERT INTO `order` VALUES (
    'e8024d61-2e65-45de-8296-72cde7c5435b',
    'Saman Perera',
    '225/A, Magama Rd, Dankotuwa',
    '0785858258',
    'saman@gmail.com',
    NOW(),
    'PROCESSING'
);
INSERT INTO `order` VALUES (
    '7f2e944e-ae4b-47be-b4f5-2336de88f460',
    'Dulith Fernando',
    '34, Chilaw Rd, Ja Ela',
    '0752345423',
    'dulith@yahoo.com',
    NOW(),
    'DISPATCHED'
);
INSERT INTO `order` VALUES (
    '6c151946-e4c0-476d-b736-7a9ae9dca68b',
    'Achana Pulle',
    '99, Kaktus Rd, Divulapitiya',
    '0727827489',
    'achana@my.com',
    NOW(),
    'DELIVERED'
);
INSERT INTO `order` VALUES (
    '609d4870-9bc8-469a-b920-d18a14767b8b',
    'Kamal Adhikari',
    '29, Dambulla Rd, Kadawatha',
    '0779289682',
    'kamal@gmail.com',
    NOW(),
    'PAID'
);

-- `order_item` table
INSERT INTO `order_item` VALUES (
    '411653f5-2320-4f2d-a78a-09dc45f7d0e2',
    'bf2d2630-a453-4315-849d-b8badc63b6a7',
    '2'
);
INSERT INTO `order_item` VALUES (
    '411653f5-2320-4f2d-a78a-09dc45f7d0e2',
    '66e9aa26-7610-4ed8-a67b-0e816ebfc03c',
    '3'
);
INSERT INTO `order_item` VALUES (
    'e8024d61-2e65-45de-8296-72cde7c5435b',
    'e3b8e679-ef21-4ece-9d7b-b8fb749a253f',
    '3'
);
INSERT INTO `order_item` VALUES (
    'e8024d61-2e65-45de-8296-72cde7c5435b',
    '076c6864-b574-4915-8d69-ec7e8e07a4cc',
    '3'
);
INSERT INTO `order_item` VALUES (
    '7f2e944e-ae4b-47be-b4f5-2336de88f460',
    '076c6864-b574-4915-8d69-ec7e8e07a4cc',
    '4'
);
INSERT INTO `order_item` VALUES (
    '7f2e944e-ae4b-47be-b4f5-2336de88f460',
    'e3b8e679-ef21-4ece-9d7b-b8fb749a253f',
    '5'
);
INSERT INTO `order_item` VALUES (
    '6c151946-e4c0-476d-b736-7a9ae9dca68b',
    '076c6864-b574-4915-8d69-ec7e8e07a4cc',
    '2'
);
INSERT INTO `order_item` VALUES (
    '6c151946-e4c0-476d-b736-7a9ae9dca68b',
    '66e9aa26-7610-4ed8-a67b-0e816ebfc03c',
    '5'
);
INSERT INTO `order_item` VALUES (
    '609d4870-9bc8-469a-b920-d18a14767b8b',
    '076c6864-b574-4915-8d69-ec7e8e07a4cc',
    '4'
);
INSERT INTO `order_item` VALUES (
    '609d4870-9bc8-469a-b920-d18a14767b8b',
    '66e9aa26-7610-4ed8-a67b-0e816ebfc03c',
    '2'
);
