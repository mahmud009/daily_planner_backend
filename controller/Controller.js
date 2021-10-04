export default class Controller {
  error(error, res, status) {
    console.log(error);
    res.send({ message: error.sqlMessage || error.message }).status(status);
  }
  success(res, message) {
    res.status(200).send({ message });
  }
}
