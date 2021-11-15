import { validationSchema } from "../validators/user.validator";

export const Handler =
  (key: any) => (target: any, properties: any, descriptor: any) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any) {
      const [req, res] = args;
      const schema = validationSchema as any;
      const { error } = schema[key].validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });
      try {
        await method.apply(this, args);
      } catch (error: any) {
        res.send({ message: error.sqlMessage }).status(400);
      }
    };
  };
