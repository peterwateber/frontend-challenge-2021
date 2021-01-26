import React from "react"
import Container from "@material-ui/core/Container"
import CustomCard from "./components/Card"
import Divider from "@material-ui/core/Divider"
import CustomDialog from "./components/Dialog"
import { createStyles, makeStyles } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Form from "./components/form"

const Widgets: React.FC = () => {
    const classes = useStyles()
    return (
        <Container fixed>
            <h1>Overview</h1>
            <Divider />
            <Grid container spacing={3} className={classes.content}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CustomCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CustomDialog />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Form />
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            paddingTop: 20,
        },
    })
)

export default Widgets
