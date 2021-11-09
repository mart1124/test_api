module.exports = {
    // HOST: "en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    // USER: "iym0c7mdilz5l3v4",
    // PASSWORD: "yxr6ufp5f3z0kdnk",
    // DB: "c1ytgflnbbxbo1ue",
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "helmet_detection",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}