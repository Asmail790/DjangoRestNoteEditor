import { Box, Button, Container, MantineProvider, PasswordInput, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { FormEventHandler } from "react";
import { Route, RouteProps } from "react-router-dom";
import { NoteGrid } from "../componets/notegrid-componet";


interface FormValues {
    email: string;
    password: string;
  }


const LoginPage:React.FC = (props) => {
  const form = useForm<FormValues>({
    initialValues:{
        email:'',
        password:''
    },
    validate: {
        email: isEmail(<p>Invalid email</p>),
        password:isNotEmpty(<p>Invalid password</p>)
    }
  })

  const onSubmit:FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log(form.values)
  }

  return (
  <MantineProvider>
    <Container>
        <form onSubmit={onSubmit}>
            <Box sx={{ maxWidth: 300 }} mx="md">
            <TextInput {... form.getInputProps("email") } label="email"/>
            <PasswordInput {... form.getInputProps("password") } label="password"/>
            <Button mt="md" type="submit">Login</Button>
            </Box>
        </form>

    </Container>
  </MantineProvider>
  )
};


const LoginRoute:React.FC<RouteProps> = (props) => <Route path="login"  element= {<LoginPage/>}/>

export  {LoginPage,LoginRoute}