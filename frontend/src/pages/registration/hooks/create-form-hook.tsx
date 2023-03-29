import { hasLength, isEmail, useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { ILogOut, logIn } from "../../../shared/hooks/jwt-log-status-hook";

export interface FormValues {
  username: string;
  password: string;
  lastName: string;
  firstName: string;
  confirmPassword: string;
  email: string;
}

export const minName = 3;
export const maxName = 100;

export const minLengthPassword = 6;
export const maxLengthPassword = 100;

/*
A RegexValidator instance that ensures a value consists of only Unicode letters, numbers, underscores, or hyphens.
*/
export const validStr = /^(\p{L}|_|-|\d)+$/u;

export const validFirstName = validStr;
export const validLastName = validStr;
export const validUserName = validStr;
export const validPassword = validStr;

export function useCreateForm() {
  const form = useForm<FormValues>({
    initialValues: {
      username: "asmail",
      lastName: "asmail",
      firstName: "abdu",
      email: "asmail799z@gmail.com",
      password: "123456",
      confirmPassword: "123456",
    },

    validate: {
      username: (username) => {
        console.log(`'${username}'`);
        return username.trim() === ""
          ? "username is empty"
          : username.length < minName
          ? `Username is less than ${minName} character`
          : username.length > maxName
          ? `Username is more than  ${maxName} character`
          : !validUserName.test(username)
          ? "Username can only contain Unicode letters, numbers, underscores, or hyphens"
          : null;
      },
      email: isEmail("Not a valid email address"),

      firstName: (value) =>
        value.trim() === ""
          ? "First name is empty"
          : value.length < minName
          ? `First name is less than ${minName} character`
          : value.length > maxName
          ? `First name is more than  ${maxName} character`
          : !validFirstName.test(value)
          ? "First name can only contain Unicode letters, numbers, underscores, or hyphens"
          : null,

      lastName: (value) =>
        value.trim() === ""
          ? "Last name is empty"
          : value.length < minName
          ? `Last name is less than ${minName} character`
          : value.length > maxName
          ? `Last name is more than  ${maxName} character`
          : !validFirstName.test(value)
          ? "Last name can only contain Unicode letters, numbers, underscores, or hyphens"
          : null,

      password: (value) =>
        value.trim() === ""
          ? "Password is empty"
          : value.length < minLengthPassword
          ? `Password is less than ${minLengthPassword} character`
          : value.length > maxLengthPassword
          ? `Password is more than  ${maxLengthPassword} character`
          : !validPassword.test(value)
          ? "Password can only contain Unicode letters, numbers, underscores, or hyphens"
          : null,

      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords are not the same" : null,
    },
    validateInputOnChange: true,
  });

  return form;
}
