const oracledb = require('oracledb');
const express = require('express');

oracledb.initOracleClient({ libDir: 'instantclient_21_12' });

const app = express();
app.use(express.json()); 

app.post('/create-table', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "nberezyu",
            password: "10025893",
            connectionString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=oracle.scs.ryerson.ca)(PORT=1521))(CONNECT_DATA=(SID=orcl)))"
        });
        console.log("Successfully connected to Oracle Database");

        const createTableSql = `CREATE TABLE Account (
            AccountID INT PRIMARY KEY,
            AccountName VARCHAR(255) NOT NULL,
            FirstName VARCHAR(255) NOT NULL,
            LastName VARCHAR(255) NOT NULL,
            Email VARCHAR(255) NOT NULL,
            Password VARCHAR(255) NOT NULL,
            Rating INT CHECK (Rating >= 1 AND Rating <= 5)
        );
        
        CREATE TABLE Passenger (
            PassengerID INT PRIMARY KEY,
            AccountID INT,
            SubscriptionType VARCHAR(255),
            DiscountPercent INT CHECK (DiscountPercent >= 0 AND DiscountPercent <= 100),
            NumOfReferrals VARCHAR(255),
            FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
        );
        
        CREATE TABLE Car (
            CarID INT PRIMARY KEY,
            CarMake VARCHAR(255),
            CarModel VARCHAR(255),
            CarYear INT,
            CarInsurance VARCHAR(255),
            CarTier VARCHAR(255),
            VINNumber INT CHECK (VINNumber >= 00000000000000001 and VINNumber <= 999999999999999999)
        );
        
        CREATE TABLE Driver (
            DriverID INT PRIMARY KEY,
            AccountID INT,
            CarID INT,
            LicenseNumber VARCHAR(255) NOT NULL,
            Experience INT,
            FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
            FOREIGN KEY (CarID) REFERENCES Car(CarID)
        );
        
        CREATE TABLE Item (
            ItemID INT PRIMARY KEY,
            ItemName VARCHAR(255),
            ItemPrice DECIMAL(5, 2),
            ItemStore VARCHAR(255),
            ItemDescription VARCHAR(255)
        );
        
        CREATE TABLE ORDERS(
            OrderID INT PRIMARY KEY,
            OrderDate DATE DEFAULT SYSDATE,
            OrderCost DECIMAL(5, 2),
            DriverID INT,
            FOREIGN KEY (DriverID) REFERENCES Driver(DriverID)
        );
        
        CREATE TABLE PickupOrder (
            PickupOrderID INT PRIMARY KEY,
            OrderID INT,
            PassengerID INT,
            FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
            FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID)
        );
        
        CREATE TABLE PackageOrder (
            PackageOrderID INT PRIMARY KEY,
            OrderID INT,
            ItemID INT,
            FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
            FOREIGN KEY (ItemID) REFERENCES Item(ItemID)
        )`;
        await connection.execute(createTableSql);
        res.status(200).send("Tables created successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating table: " + err.message);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
