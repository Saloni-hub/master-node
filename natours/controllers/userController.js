const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);


exports.getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users: users,
    },
  });
};

exports.createUser = (req, res) => {
  const userId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: userId }, req.body);
  tours.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
      });
    },
  );
};

exports.getUser = (req,res) => {
  const { id: userId } = req.params;
  
  const user = users.find((user) => user.id == userId*1);
   if (!user) {
    return res.send(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status:"success",
    data:{
      user
    }
  })
}

exports.updateUser = (req, res) => {
  const { id: userId } = req.params; //convert string to numbers thats why multiply by 1
  const user = users.find((user) => user.id === userId * 1);
  if (!user) {
    return res.send(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated tour here",
    },
  });
};

exports.deleteUser = (req, res) => {
  const { id: userId } = req.params; //convert string to numbers thats why multiply by 1
  const user = users.find((user) => user.id === userId * 1);
  if (!user) {
    return res.send(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
}