import { Validators } from "../validators/Validators";

/** A wrapper around the controller, doing validation as per method name and wrapping
 * the method in a try catch block, so that we don't have to repeat try catch in
 * every method
 */
export const RequestHandler =
  () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any) {
      const [req, res, next] = args;
      const { error } = Validators[propertyKey].validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });
      try {
        await method.apply(this, args);
      } catch (error: any) {
        res.send({ message: error.sqlMessage }).status(400);
      }
    };
  };
