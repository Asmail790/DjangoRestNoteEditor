import { AppShell, MantineProvider } from "@mantine/core";
import React, { PropsWithChildren } from "react";



type DefaultLayoutProps = PropsWithChildren<{navbar:React.ReactElement}>

const DefaultLayout:React.FC<DefaultLayoutProps> =(props) => {
    return (
      <MantineProvider>
        <AppShell navbar={props.navbar}>
          {props.children}
        </AppShell>
      </MantineProvider>
    );
}

export {DefaultLayout}
