import Validator from "validatorjs";
import httpError from "http-errors";

type RequestBody = { [key: string]: any };

const validateBody = (
  body: RequestBody,
  validation_schema: Validator.Rules
) => {
  let validation = new Validator(body, validation_schema);

  if (validation.fails()) {
    const errors = validation.errors.all();
    const aggregatedErrors: string[] = [];
    Object.keys(errors).forEach((key) => {
      aggregatedErrors.push(validation.errors.first(key) as string);
    });

    throw new httpError.BadRequest(aggregatedErrors.join(" , "));
  } else {
    return true;
  }
};

export const validateCreateShortURL = (body: RequestBody) =>
  validateBody(body, {
    url: "required|url",
    id: "string|min:5|max:10",
  });

export const validateUpdateShortURL = (body: RequestBody) =>
  validateBody(body, {
    url: "required|url",
  });
