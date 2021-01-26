import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

const Buttons: React.FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Button variant="outlined">Default</Button>
            <Button variant="outlined" color="primary">
                Primary
            </Button>
            <Button variant="outlined" color="secondary">
                Secondary
            </Button>
            <Button variant="outlined" disabled>
                Disabled
            </Button>
            <Button variant="outlined" color="primary" href="#outlined-buttons">
                Link
            </Button>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
    })
)

export default Buttons
