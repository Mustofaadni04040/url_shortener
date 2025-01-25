import Validator from "validatorjs";
import httpError from "http-errors";

type RequestBody = { [key: string]: any };

const validateBody = (body: RequestBody, validationSchema: Validator.Rules) => {
  let validation = new Validator(body, validationSchema);

  if (validation.fails()) {
    const errors = validation.errors.all();
    const aggregatedErrors: string[] = [];
    Object.keys(errors).forEach((key) => {
      aggregatedErrors.push(validation.errors.first(key) as string);
    });

    throw new httpError.BadRequest(aggregatedErrors.join(", "));
  } else {
    return true;
  }
};

export const validateCreateShortURL = (body: RequestBody) =>
  validateBody(body, {
    url: "required|url",
    id: "string|min:5|max:10|not_in:auth,urls,visits",
  });

export const validateUpdateShortURL = (body: RequestBody) =>
  validateBody(body, {
    url: "required|url",
  });

export const validateRegister = (body: RequestBody) =>
  validateBody(body, {
    username: "required|string|min:4|max:10",
    password: "required|string|min:6",
  });

export const validateLogin = (body: RequestBody) =>
  validateBody(body, {
    username: "required|string",
    password: "required|string",
  });
