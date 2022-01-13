const {Client} = require("page")

const client = new Client({
    "host": "localhost",
    "port": 5432,
    "user": "sqlite",
    "password": "123",
    "database": "Library"
})


client.connect();
const dbQuery = "select "'История Использования.Дата выдачи'", "'История Использования.Дата возврата'", "'Студенты.ФИО'" from "'История Использования'" join "'Студенты'" on "'История Использования.Номер читательского билета'" = "'Студенты.Номер читательского билета'"";
client.query(dbQuery, (err, res) => {
    if (err) throw err;
    else getEvilReader(res.rows);
    client.end;
    }
);


function getEvilReader(makedBooks) {
    let evilReader = [];
    makedBooks.map(maked => {
        if (maked['Дата возврата'] == null) maked['Дата возврата'] = new Date();
        let timeDifference = Math.abs(maked['Дата возврата'].getTime() - maked['Дата выдачи'].getTime());
        let diffDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        if (diffDays >= 120 & !(evilReader.includes(maked['ФИО']))) evilReader.push(maked['ФИО']);
    });
    evilReader.map(reader => console.log(reader));
  }